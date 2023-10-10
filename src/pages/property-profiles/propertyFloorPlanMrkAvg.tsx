import { PropertyProfileComponentProps } from "../../interfaces/propertyProfileProps";
import Chart from 'react-apexcharts';
import { useColorModeValue, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaSearchDollar } from 'react-icons/fa';

interface FloorPlanDetails {
    totalMarket: number;
    count: number;
}

export function PropertyFloorPlanMrkAvg({ propertyData }: PropertyProfileComponentProps) {
    const textColor = useColorModeValue("gray.800", 'white');
    let floorplans: { [key: string]: FloorPlanDetails } = {};

    propertyData.forEach(element => {
        let numericValue = typeof element.market === "string" ? parseFloat(element.market) : element.market;
        if (!Number.isNaN(numericValue)) {
            if (!floorplans[element.floorplan]) {
                floorplans[element.floorplan] = {
                    totalMarket: numericValue,
                    count: 0
                };
            }

            floorplans[element.floorplan].totalMarket += numericValue;
            floorplans[element.floorplan].count += 1;
        }
    });

    const floorplanAvgValues: Record<string, number> = {};

    for (let key in floorplans) {
        const plan = floorplans[key];
        floorplanAvgValues[key] = Math.round(plan.totalMarket / plan.count);

    }

    console.log("### Floor plan breakdown:")
    console.log(floorplanAvgValues)
    const floorPlanNames = Object.keys(floorplanAvgValues);
    const avgValues = floorPlanNames.map(name => floorplanAvgValues[name]);

    const options = {
        chart: {
            id: 'floorplan-avg-chart',
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
                text: 'Average Market Value ($)'
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: '',
            align: 'center'
        },
        tooltip: {
            theme: useColorModeValue('light', 'dark')
        }
    } as any;

    const series = [
        {
            name: 'Average Market Value ($)',
            data: avgValues
        }
    ];

    return (
        <Box p={6} width={"33%"}>
            <Flex alignItems="center" mb={4}>
                <Icon as={FaSearchDollar} boxSize={8} mr={2} />
                <Text fontWeight="bold" fontSize="xl" color={textColor}>Average Market Value of Each Floor Plan</Text>
            </Flex>
            <Chart options={options} series={series} type="bar" height="300px" />
        </Box>
    );
}