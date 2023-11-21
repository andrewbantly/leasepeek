import Chart from 'react-apexcharts';
import { Box, Heading, useColorMode, Text } from '@chakra-ui/react';
import { stat } from 'fs';

interface VacancyProps {
    vacants: { [key: string]: number; };
}

export function Vacancy({ vacants }: VacancyProps) {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

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

    console.log("Vacancy Notes", vacancyNotes)

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
        <Heading as='h4' size='sm' mt={5}>Additional information:</Heading>
        {Object.entries(vacancyNotes).map(([status, count], index) => (
        <Text size="sm">{status}s: {count}</Text>
        ))}
        </>

    return (
        <Box>
            <Chart options={options} series={series} type="donut" width="375" />

             {vacancyNotesExists ? vacancyNotesInformation : ''} 

        </Box>
    )
}
