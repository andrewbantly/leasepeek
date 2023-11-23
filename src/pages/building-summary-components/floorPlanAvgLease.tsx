import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

interface FloorPlanAvgProps {
    floorplans: FloorPlans;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
type FloorPlanName = string;

interface FloorPlanDetails {
    avgRent: number;
    sumRent: number;
    avgMarket: number;
    sumMarket: number;
    unitCount: number;
    avgSqft: number;
}

export function FloorPlanAvgLease({ floorplans }: FloorPlanAvgProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);
    const avgLease = floorPlanNames.map(name => floorplans[name].avgRent);
    const avgMarket = floorPlanNames.map(name => floorplans[name].avgMarket)

    const options = {
        chart: {
            id: 'floorplan-avg-chart',
            type: 'bar',
            foreColor: textColor 
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                }
            }
        },
        xaxis: {
            categories: floorPlanNames
        },
        yaxis: {
            title: {
                text: 'Average Lease ($)'
            }
        },
        dataLabels: {
            enabled: false,
            fontSize: '12px'
        },
        title: {
            text: 'Average Lease of Each Floor Plan',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark'),
            shared: true,
            intersect: false
        }
    } as any;

    const series = [
        {   
            name: 'Average Lease ($)',
            data: avgLease
        },
        {
            name: 'Average Market ($)',
            data: avgMarket,
            color: '#FFA500'
        }
    ];

    return <Chart options={options} series={series} type="bar" height="300px"/>;
}
