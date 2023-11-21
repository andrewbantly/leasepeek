import Chart from 'react-apexcharts';
import { Box, Heading, useColorMode, Text, useColorModeValue } from '@chakra-ui/react';
import { stat } from 'fs';

interface VacancyProps {
    vacants: { [key: string]: number; };
}

export function Vacancy({ vacants }: VacancyProps) {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const additionalInformationColor = useColorModeValue("#1A202C", "#A0AEC0");

    const series: number[] = [];
    const labels: string[] = [];

    const vacancyNotes: { [key: string]: number } = {};
    let vacancyNotesExists: boolean = false;

    for (const [status, count] of Object.entries(vacants)) {
        if (status === 'Vacant' || status === 'Occupied' || status === 'Model' ||  status === 'Down') {
            series.push(count as number);
            labels.push(status);
        }
        else {
            vacancyNotesExists = true;
            vacancyNotes[status] = count;
        }
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

    const vacancyNotesInformation = 
        <>
        <Text size='sm' mt={5} color={additionalInformationColor}>Additional information:</Text>
        {Object.entries(vacancyNotes).map(([status, count], index) => (
        <Text color={additionalInformationColor} fontWeight='bold' size="sm">{status}s: {count}</Text>
        ))}
        </>

    return (
        <Box>
            <Chart options={options} series={series} type="donut" width="375" />

             {vacancyNotesExists ? vacancyNotesInformation : ''} 

        </Box>
    )
}
