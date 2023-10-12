import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

interface FloorPlanAvgProps {
    floorplans: LocalFloorPlans;
}

type LocalFloorPlans = Record<FloorPlanCategory, FloorPlanDetails>;
type FloorPlanCategory = string;

interface MarketRentDetails {
    average: number;
    count: number;
    sum: number;
}

interface FloorPlanDetails {
    market: MarketRentDetails;
    rent: MarketRentDetails;
}

export function FloorPlanAvgRent({ floorplans }: FloorPlanAvgProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);
    const avgValues = floorPlanNames.map(name => floorplans[name].rent.average);

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
                text: 'Average Rent ($)'
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Average Rent of Each Floor Plan',
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
