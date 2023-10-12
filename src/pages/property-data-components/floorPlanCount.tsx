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

export function FloorPlanCount({ floorplans }: FloorPlanAvgProps) {
    console.log("### FLOOR PLAN COUNT")
    console.log(floorplans)
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);
    const countValue = floorPlanNames.map(name => floorplans[name].market.count)

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