import Chart from 'react-apexcharts';
import { useColorMode } from '@chakra-ui/react';

interface VacancyProps {
    vacants: {[key: string]: number;};
}

export function Vacancy({ vacants }: VacancyProps) {
    const { colorMode } = useColorMode();
    
    const isDarkMode = colorMode === 'dark';
    
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

    return <Chart options={options} series={series} type="donut" width="375" />;
}
