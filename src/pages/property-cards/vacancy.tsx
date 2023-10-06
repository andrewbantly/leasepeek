import Chart from 'react-apexcharts';
import { useColorMode } from '@chakra-ui/react';

interface VacancyProps {
    vacants: {};
    totalUnits: number;
}

export function Vacancy({ vacants, totalUnits }: VacancyProps) {
    const { colorMode } = useColorMode();
    
    const isDarkMode = colorMode === 'dark';
    
    // Extract series data and labels from the 'vacants' object
    const series: number[] = [];
    const labels: string[] = [];

    for (const [status, count] of Object.entries(vacants)) {
        series.push(count as number);
        labels.push(status);
    }
    

    const options = {
        labels: labels,
        chart: {
            type: 'donut'
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: isDarkMode ? 'white' : 'black'
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    } as any;

    return (
        <div>
            <Chart options={options} series={series} type="donut" width="375" />
        </div>
    );
}