import { PropertyProfileComponentProps } from "../../interfaces/propertyProfileProps";
import { useColorModeValue, Box, Flex, Icon, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { MdPieChart } from 'react-icons/md';

export function PropertyFloorPlan({propertyData} : PropertyProfileComponentProps) {
    const textColor = useColorModeValue("gray.800", 'white');

    let floorplans: { [key: string]: number } = {};

    propertyData.forEach(element => {
        floorplans[element.floorplan] = (floorplans[element.floorplan] || 0) +1;
    })

    const floorPlanNames = Object.keys(floorplans);
    const countValue = floorPlanNames.map(name => floorplans[name]);

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


    return(
        <Box style={{ width: '33%' }}>
                       <Flex alignItems="center" mb={4}>
                <Icon as={MdPieChart} boxSize={8} mr={2} />
                <Text fontWeight="bold" fontSize="xl" color={textColor}>Average Market Value of Each Floor Plan</Text>
            </Flex>
            <Chart options={options} series={series} type="bar" height="300px"/>
    </Box>
    )
}