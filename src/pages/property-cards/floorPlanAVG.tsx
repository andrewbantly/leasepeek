import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

interface FloorPlanAvgProps {
    floorplans: FloorPlans;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
type FloorPlanName = string;

interface FloorPlanDetails {
    avg: number;
    count: number;
}

export function FloorPlanAvg({ floorplans }: FloorPlanAvgProps) {
    const textColor = useColorModeValue('black', 'white');
    const floorPlanNames = Object.keys(floorplans);
    const avgValues = floorPlanNames.map(name => floorplans[name].avg);

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
                text: 'Average Price ($)'
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Average Price of Each Floor Plan',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const series = [
        {
            name: 'Average Price ($)',
            data: avgValues
        }
    ];

    return <Chart options={options} series={series} type="bar" height="300px"/>;
}
