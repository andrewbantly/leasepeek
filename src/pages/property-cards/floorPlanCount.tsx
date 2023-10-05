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

export function FloorPlanCount({ floorplans }: FloorPlanAvgProps) {
    const textColor = useColorModeValue('black', 'white');
    const floorPlanNames = Object.keys(floorplans);
    const countValue = floorPlanNames.map(name => floorplans[name].count)

    const options ={
        chart: {
            id: 'floorplan-count-chart',
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
                text: 'Amount of Units'
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Quantity of Units of Each Floor Plan',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const series = [
        {
            name: 'Amount of Units',
            data: countValue
        }
    ];

    return <Chart options={options} series={series} type="bar" height="300px"/>
}