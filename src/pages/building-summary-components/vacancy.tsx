import Chart from 'react-apexcharts';
import { Box, useColorMode, Text, useColorModeValue } from '@chakra-ui/react';

interface VacancyProps {
    [key: string]: {
        count: number;
        type: string;
    }
}

export function Vacancy({ vacants }: VacancyProps) {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const additionalInformationColor = useColorModeValue("#1A202C", "#A0AEC0");

    const series: number[] = [];
    const labels: string[] = [];

    const vacancyNotes: { [key: string]: number } = {};
    let vacancyNotesExists: boolean = false;

    // for (const [status, props] of Object.entries(vacants)) {
    //     console.log(`status: ${status}, props ${props}`)
    //     if (status === 'Vacant' || status === 'Occupied' || status === 'Model' || status === 'Down') {
    //         series.push(props.count); // Accessing count property
    //         labels.push(status);
    //     }
    //     else {
    //         vacancyNotesExists = true;
    //         vacancyNotes[status] = props.count; // Accessing count property
    //     }
    // }

    // const options = {
    //     labels: labels,
    //     chart: {
    //         type: 'donut'
    //     },
    //     legend: {
    //         position: 'bottom',
    //         labels: {
    //             colors: isDarkMode ? 'white' : 'black'
    //         }
    //     },
    //     responsive: [{
    //         breakpoint: 480,
    //         options: {
    //             chart: {
    //                 width: 200
    //             },
    //             legend: {
    //                 position: 'bottom'
    //             }
    //         }
    //     }]
    // } as any;

    const vacancyNotesInformation =
        <>
            <Text size='sm' mt={5} color={additionalInformationColor}>Additional information:</Text>
            {Object.entries(vacancyNotes).map(([status, count], index) => (
                <Text color={additionalInformationColor} fontWeight='bold' size="sm">{status}s: {count}</Text>
            ))}
        </>

    return (
        <Box>
            {/* <Chart options={options} series={series} type="donut" width="375" /> */}

            {vacancyNotesExists ? vacancyNotesInformation : ''}

        </Box>
    )
}
