import { RecentLeases } from "../../interfaces/propertyProfile/propertyProfileProps";
import Chart from 'react-apexcharts';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { FloorPlans } from '../../interfaces/propertyProfile/propertyProfileProps';

interface RecentLeaseProps {
    recentLeases: RecentLeases;
    floorplans: FloorPlans;
}

export function RecentSignedLeases({ recentLeases, floorplans }: RecentLeaseProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    const additionalInformationColor = useColorModeValue("#1A202C", "#A0AEC0");

    let sqFt180Days: number = 0;
    let avgRent180Days: number = 0;
    let leaseCount180Days: number = 0;

    let sqFt150Days: number = 0;
    let avgRent150Days: number = 0;
    let leaseCount150Days: number = 0;

    let sqFt120Days: number = 0;
    let avgRent120Days: number = 0;
    let leaseCount120Days: number = 0;

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

        // Only add sqFt if the average rent is greater than 0
        leaseCount180Days += rentData.recent_leases.last_180_days.count
        avgRent180Days += rentData.recent_leases.last_180_days.average_rent
        if (rentData.recent_leases.last_180_days.average_rent) {
            sqFt180Days += sqFtData
        }

        leaseCount150Days += rentData.recent_leases.last_150_days.count
        avgRent150Days += rentData.recent_leases.last_150_days.average_rent
        if (rentData.recent_leases.last_150_days.average_rent) {
            sqFt150Days += sqFtData
        }

        leaseCount120Days += rentData.recent_leases.last_120_days.count
        avgRent120Days += rentData.recent_leases.last_120_days.average_rent
        if (rentData.recent_leases.last_120_days.average_rent) {
            sqFt120Days += sqFtData
        }
        
        leaseCount90Days += rentData.recent_leases.last_90_days.count
        avgRent90Days += rentData.recent_leases.last_90_days.average_rent
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

    const rent180DaysAvg: number = parseFloat((avgRent180Days / sqFt180Days).toFixed(2))
    const rent150DaysAvg: number = parseFloat((avgRent150Days / sqFt150Days).toFixed(2))
    const rent120DaysAvg: number = parseFloat((avgRent120Days / sqFt120Days).toFixed(2))
    const rent90DaysAvg: number = parseFloat((avgRent90Days / sqFt90Days).toFixed(2))
    const rent60DaysAvg: number = parseFloat((avgRent60Days / sqFt60Days).toFixed(2))
    const rent30DaysAvg: number = parseFloat((avgRent30Days / sqFt30Days).toFixed(2))

    const labels: string[] = ['Previous 180 Days', 'Previous 150 Days', 'Previous 120 Days', 'Previous 90 Days', 'Previous 60 Days', 'Previous 30 Days']
    const series = [{
        name: "Avg Lease per SqFt ($)",
        data: [rent180DaysAvg,rent150DaysAvg, rent120DaysAvg, rent90DaysAvg, rent60DaysAvg, rent30DaysAvg]
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

    const leaseCount180DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 180 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount180Days}</Text></Text>
    </>

    const leaseCount150DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 150 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount150Days}</Text></Text>
    </>

    const leaseCount120DayNote = 
    <>
    <Text color={additionalInformationColor} size="sm">Leases signed in the last 120 days:<Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>{leaseCount120Days}</Text></Text>
    </>

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
        {leaseCount180Days > 0 ? leaseCount180DayNote : ''}
        {leaseCount150Days > 0 ? leaseCount150DayNote : ''}
        {leaseCount120Days > 0 ? leaseCount120DayNote : ''}
        {leaseCount90Days > 0 ? leaseCount90DayNote : ''}
        {leaseCount60Days > 0 ? leaseCount60DayNote : ''}
        {leaseCount30Days > 0 ? leaseCount30DayNote : ''}
        </>
    )
}