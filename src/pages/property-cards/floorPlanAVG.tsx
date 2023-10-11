import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

interface FloorPlanAvgProps {
    floorplans: FloorPlans;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
type FloorPlanName = string;

interface FloorPlanDetails {
    average: number;
    count: number;
    sum: number;
}

export function FloorPlanAvg({ floorplans }: FloorPlanAvgProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);
    const avgValues = floorPlanNames.map(name => floorplans[name].average);

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

    return (
    <>
    <Chart options={options} series={series} type="bar" height="300px"/>
    </>
    );
}
