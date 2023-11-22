import { RecentLeases } from "../../interfaces/propertyProfile/propertyProfileProps";
import Chart from 'react-apexcharts';
import { Heading, Text, useColorModeValue } from '@chakra-ui/react';


interface RecentLeaseProps {
    recentLeases: RecentLeases;
    floorplans: LocalFloorPlans;
}

interface FloorPlanDetails {
    avgRent: number;
    sumRent: number;
    avgMarket: number;
    sumMarket: number;
    unitCount: number;
    avgSqft: number;
}
type FloorPlanCategory = string;
type LocalFloorPlans = Record<FloorPlanCategory, FloorPlanDetails>;

export function RecentSignedLeases({ recentLeases, floorplans }: RecentLeaseProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    const additionalInformationColor = useColorModeValue("#1A202C", "#A0AEC0");

    let sqFt90Days: number = 0;
    let avgRent90Days: number = 0;
    let leaseCount90Days: number = 0;
    let sqFt60Days: number = 0;
    let avgRent60Days: number = 0;
    let leaseCount60Days: number = 0;
    let sqFt30Days: number = 0;
    let avgRent30Days: number = 0;
    let leaseCount30Days: number = 0;
    
    let sqFtDataExists = false

    for (const key in recentLeases) {
        const rentData = recentLeases[key];
        const sqFtData = floorplans[key].avgSqft
        
        if (sqFtData > 0) {
            sqFtDataExists = true
        }
        
        leaseCount90Days += rentData.recent_leases.last_90_days.count
        avgRent90Days += rentData.recent_leases.last_90_days.average_rent
        // Only add sqFt if the average rent is greater than 0
        if (rentData.recent_leases.last_90_days.average_rent > 0) {
            sqFt90Days += sqFtData
        }
        
        leaseCount60Days += rentData.recent_leases.last_60_days.count
        avgRent60Days += rentData.recent_leases.last_60_days.average_rent
        if (rentData.recent_leases.last_60_days.average_rent) {
            sqFt60Days += sqFtData
        }
        
        leaseCount30Days += rentData.recent_leases.last_30_days.count
        avgRent30Days += rentData.recent_leases.last_30_days.average_rent
        if (rentData.recent_leases.last_30_days.average_rent) {
            sqFt30Days += sqFtData
        }
    }

    const rent30DaysAvg: number = parseFloat((avgRent90Days / sqFt90Days).toFixed(2))
    const rent60DaysAvg: number = parseFloat((avgRent60Days / sqFt60Days).toFixed(2))
    const rent90DaysAvg: number = parseFloat((avgRent30Days / sqFt30Days).toFixed(2))

    const labels: string[] = ['Previous 90 Days', 'Previous 60 Days', 'Previous 30 Days']
    const series = [{
        name: "Avg Lease per SqFt ($)",
        data: [rent90DaysAvg, rent60DaysAvg, rent30DaysAvg]
    }];

    const options = {
        series: series,
        chart: {
            id: 'recent-signed-leases-avg',
            type: 'line',
            zoom: {
                enabled: false
            },
            foreColor: textColor,
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            title: {
                text: 'Avg Lease per SqFt ($)'
            }
        },
        title: {
            text: 'Avg Lease per SqFt of Recent Leases',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const leaseCount90DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 90 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount90Days}</Text></Text>
    </>
    const leaseCount60DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 60 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount60Days}</Text></Text>
    </>
    const leaseCount30DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 30 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount30Days}</Text></Text>
    </>

    const chart = <Chart options={options} series={series} type="line" height="300px" />

    const noSqFtDataResponse = <Text fontWeight="bold" fontSize='md' color={textColor} mb={5}><Text  fontWeight="bold" fontSize='md' color='red' display='inline'>Error: </Text>Cannot create chart. SqFt data not included in rent roll.</Text>



    return (
        <>
        {sqFtDataExists ? chart : noSqFtDataResponse}
        {leaseCount90Days > 0 ? leaseCount90DayNote : ''}
        {leaseCount60Days > 0 ? leaseCount60DayNote : ''}
        {leaseCount30Days > 0 ? leaseCount30DayNote : ''}
        </>
    )
}