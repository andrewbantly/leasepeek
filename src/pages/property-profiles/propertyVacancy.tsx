import { PropertyProfileComponentProps } from "../../interfaces/propertyProfileProps";
import Chart from 'react-apexcharts';
import { Box, Flex, Text, useColorMode, useColorModeValue, Icon } from '@chakra-ui/react';
import { BiBuilding } from 'react-icons/bi';


export function PropertyVacancy({ propertyData }: PropertyProfileComponentProps) {

    const { colorMode } = useColorMode();
    const textColor = useColorModeValue("gray.800", "gray.200");
    const isDarkMode = colorMode === 'dark';

    let vacancyData: { [key: string]: number } = {};

    propertyData.forEach(element => {
        if (element.status) {
            vacancyData[element.status] = (vacancyData[element.status] || 0) + 1;
        }
        else {
            if (element.tenant.toLowerCase().includes('vacant')) {
                vacancyData['Vacant'] = (vacancyData['Vacant'] || 0) + 1;
            }
            else {
                vacancyData['Occupied'] = (vacancyData['Occupied'] || 0) + 1
            }
        }
    });

    const series: number[] = [];
    const labels: string[] = [];

    for (const [status, count] of Object.entries(vacancyData)) {
        series.push(count as number);
        labels.push(status);
    }

    // Options for the Apex chart component.
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
        <Box p={6}>
            <Flex alignItems="center" mb={4}>
                <Icon as={BiBuilding} boxSize={8} mr={2} />
                <Text fontWeight="bold" fontSize="xl" color={textColor}>Vacancy</Text>
            </Flex>
            <Chart options={options} series={series} type="donut" width="375" />
        </Box>
    )
}
