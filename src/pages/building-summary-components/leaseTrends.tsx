import { LeaseTrends } from "../../interfaces/propertyProfile/propertyProfileProps";
import { useColorModeValue } from '@chakra-ui/react';
import Chart from 'react-apexcharts';

export function LeaseTrendsChart({ leaseTrendsData }: { leaseTrendsData: LeaseTrends }) {
    const textColor = useColorModeValue("gray.800", 'white');
    const months = Object.keys(leaseTrendsData);
    const floorPlanNames = new Set<string>();
    const avgLeasePerSqFtSeries: { name: string; data: number[] }[] = [];
    const numOfLeasesSeries: { name: string; data: number[] }[] = [];

    // Identify all unique floorplans
    months.forEach(month => {
        Object.keys(leaseTrendsData[month]).forEach(floorPlan => floorPlanNames.add(floorPlan));
    });

    floorPlanNames.forEach(floorPlan => {
        const avgLeaseData = { name: floorPlan, data: [] as number[] };
        const leaseCountData = { name: floorPlan, data: [] as number[] };

        months.forEach(month => {
            if (leaseTrendsData[month][floorPlan]) {
                avgLeaseData.data.push(leaseTrendsData[month][floorPlan].AvgLeasePerSqFt);
                leaseCountData.data.push(leaseTrendsData[month][floorPlan].NumOfLeases);
            } else {
                avgLeaseData.data.push(0);
                leaseCountData.data.push(0);
            }
        });

        avgLeasePerSqFtSeries.push(avgLeaseData);
        numOfLeasesSeries.push(leaseCountData);
    });


    console.log("Floor plan names")
    console.log(floorPlanNames)
    console.log("Avg SqFt")
    console.log(avgLeasePerSqFtSeries)
    console.log("Num of leases")
    console.log(numOfLeasesSeries)

    const lineChartOptions = {
        series: avgLeasePerSqFtSeries,
        chart: {
            id: 'last-12-months-avg-leases-per-sqft',
            type: 'line',
            zoom: {
                enabled: false
            },
            foreColor: textColor,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            categories: months,
        },
        yaxis: {
            title: {
                text: 'Avg Lease per SqFt ($)'
            }
        },
        title: {
            text: 'Average Lease per SqFt of Leases Starting Over the Last 12 Months',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const barChartOptions = {
        series: numOfLeasesSeries,
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
            categories: months
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
            text: 'Number of New Leases per Floor Plan Over the Last 12 Months',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;


    return (
        <>
            <Chart options={lineChartOptions} series={avgLeasePerSqFtSeries} type="line" height="300px" />
            <Chart options={barChartOptions} series={numOfLeasesSeries} type="bar" height="300px" />
        </>
    );
}
