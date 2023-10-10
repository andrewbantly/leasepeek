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
    const textColor = useColorModeValue("gray.800", "gray.200");
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
            data: avgValues
        }
    ];

    return <Chart options={options} series={series} type="bar" height="300px"/>;
}
