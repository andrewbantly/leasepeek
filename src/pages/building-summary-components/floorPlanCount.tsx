import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';
import { FloorPlans } from '../../interfaces/propertyProfile/propertyProfileProps';

export function FloorPlanCount({ floorplans }: { floorplans: FloorPlans }) {
    const textColor = useColorModeValue("gray.800", 'white');
    const floorPlanNames = Object.keys(floorplans);

    // Aggregate counts for each status type
    const aggregatedStatusCounts: Record<string, number[]> = {};

    floorPlanNames.forEach(name => {
        const statuses = floorplans[name].unitStatuses;
        Object.keys(statuses).forEach(statusType => {
            if (!aggregatedStatusCounts[statusType]) {
                aggregatedStatusCounts[statusType] = new Array(floorPlanNames.length).fill(0);
            }
            aggregatedStatusCounts[statusType][floorPlanNames.indexOf(name)] = statuses[statusType];
        });
    });

    const series = Object.keys(aggregatedStatusCounts).map(statusType => ({
        name: `${statusType.charAt(0).toUpperCase() + statusType.slice(1)}`,
        data: aggregatedStatusCounts[statusType]
    }));

    const options = {
        chart: {
            id: 'floorplan-count-chart',
            type: 'bar',
            foreColor: textColor,
            stacked: true,
            toolbar: {
                show: true,
              },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            color: textColor,
                        }
                    }
                }
            }
        },
        xaxis: {
            categories: floorPlanNames
        },
        yaxis: {
            title: {
                text: 'Units'
            }
        },
        dataLabels: {
            enabled: true,
        },
        title: {
            text: 'Quantity of Units of Each Floor Plan',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark'),
            shared: true,
            intersect: false
        }
    } as any;

    return <Chart options={options} series={series} type="bar" height="300px"/>
}