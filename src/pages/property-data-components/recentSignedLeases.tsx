import { RecentLeases } from "../../interfaces/propertyProfile/propertyProfileProps";
import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

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

    let sqFt_90_days: number = 0;
    let avgRent_90_days: number = 0;
    let sqFt_rent_60_days: number = 0;
    let avgRent_60_days: number = 0;
    let sqFt_rent_30_days: number = 0;
    let avgRent_30_days: number = 0;


    for (const key in recentLeases) {
        const rentData = recentLeases[key];
        const sqFtData = floorplans[key].avgSqft
        
        avgRent_90_days += rentData.recent_leases.last_90_days.average_rent
        // Only add sqFt if the average rent is greater than 0
        if (rentData.recent_leases.last_90_days.average_rent > 0) {
            sqFt_90_days += sqFtData
        }

        avgRent_60_days += rentData.recent_leases.last_60_days.average_rent
        if (rentData.recent_leases.last_60_days.average_rent) {
            sqFt_rent_60_days += sqFtData
        }

        avgRent_30_days += rentData.recent_leases.last_30_days.average_rent
        if (rentData.recent_leases.last_30_days.average_rent) {
            sqFt_rent_30_days += sqFtData
        }
    }

    const rent_30_days_avg: number = parseFloat((avgRent_90_days / sqFt_90_days).toFixed(2))
    const rent_60_days_avg: number = parseFloat((avgRent_60_days / sqFt_rent_60_days).toFixed(2))
    const rent_90_days_avg: number = parseFloat((avgRent_30_days / sqFt_rent_30_days).toFixed(2))

    const labels: string[] = ['Previous 90 Days', 'Previous 60 Days', 'Previous 30 Days']
    const series = [{
        name: "Avg Rent per SqFt ($)",
        data: [rent_90_days_avg, rent_60_days_avg, rent_30_days_avg]
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
                text: 'Avg Rent per SqFt ($)'
            }
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;



    return (
        <Chart options={options} series={series} type="line" height="300px" />
    )
}