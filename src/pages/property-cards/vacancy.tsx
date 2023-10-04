import React from 'react';
import Chart from 'react-apexcharts';
import { useColorMode } from '@chakra-ui/react';

interface VacancyProps {
    vacants: number;
    totalUnits: number;
}

export function Vacancy({ vacants, totalUnits }: VacancyProps) {
    const { colorMode } = useColorMode();
    
    const isDarkMode = colorMode === 'dark';

    const occupied = totalUnits - vacants;
    const series = [occupied, vacants];
    const options = {
        labels: ['Occupied', 'Vacant'],
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
            <Chart options={options} series={series} type="donut" width="380" />
        </div>
    );
}
