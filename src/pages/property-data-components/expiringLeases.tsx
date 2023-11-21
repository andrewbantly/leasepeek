import { Box, Heading, Spacer, Text } from "@chakra-ui/react";
import { ExpiringLeases, LossToLease } from "../../interfaces/propertyProfile/propertyProfileProps";
import { useColorMode, useTheme, useColorModeValue } from '@chakra-ui/react';
import Chart from 'react-apexcharts';


interface PropertyAlertProps {
    expiringLeases: ExpiringLeases;
    lossToLease: LossToLease;
}

export function ExpiringLeaseAnalysis({ expiringLeases, lossToLease }: PropertyAlertProps) {
    const { colorMode } = useColorMode();
    const notesColor = useColorModeValue("#1A202C", "#A0AEC0");
    const theme = useTheme();
    const isDarkMode = colorMode === 'dark';
    const red = '#FF6B6B';
    const green = theme.colors.green[500];

    let totalInPlaceRent = lossToLease.rentIncome
    let expiringIn90daysCount = 0
    let rentLossFromExpiringLeases = 0

    for (const key in expiringLeases) {
        const floorplan = expiringLeases[key];
        expiringIn90daysCount += floorplan.expiring_in_90_days.count;
        rentLossFromExpiringLeases += floorplan.expiring_in_90_days.total_rent
    }

    let inPlaceRentValue = totalInPlaceRent - rentLossFromExpiringLeases

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    const series: number[] = [rentLossFromExpiringLeases, inPlaceRentValue];
    const labels: string[] = ['Expiring', 'In-Place'];

    const options = {
        labels: labels,
        chart: {
            type: 'pie'
        },
        colors: [red, green],
        legend: {
            position: 'bottom',
            labels: {
                colors: isDarkMode ? 'white' : 'black'
            }
        },
        tooltip: {
            y: {
                formatter: (value: number) => {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(value);
                }
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
        <Box>
            <Chart options={options} series={series} type='pie' width='375'/>
            <Heading as="h3" size="sm" mt={5} color={notesColor}>
                Leases expiring within 90 days:
                <Text
                    display="inline"
                    color={expiringIn90daysCount > 0 ? "red.400" : "teal.500"}
                    ml={"5px"}
                >
                    {expiringIn90daysCount}
                </Text>
            </Heading>
            <Heading as="h3" size="sm" marginBottom="2" color={notesColor}>
                Rent value of expiring leases:
                <Text
                    display="inline"
                    color={rentLossFromExpiringLeases > 0 ? "red.400" : "teal.500"}
                    ml={"5px"}
                >
                    {formatCurrency(rentLossFromExpiringLeases)}
                </Text>
            </Heading>
        </Box>
    )
}
