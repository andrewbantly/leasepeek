import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

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

export function FloorPlanAvg({ floorplans }: { floorplans: LocalFloorPlans }) {
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);
    const avgMarket = floorPlanNames.map(name => floorplans[name].avgMarket);

    const options = {
        chart: {
            id: 'floorplan-avg-chart',
            type: 'bar',
            foreColor: textColor 
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        xaxis: {
            categories: floorPlanNames
        },
        yaxis: {
            title: {
                text: 'Average Market Value ($)'
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Market Value of Each Floor Plan',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const series = [
        {
            name: 'Average Market Value ($)',
            data: avgMarket
        }
    ];

    return <Chart options={options} series={series} type="bar" height="300px"/>;
}
