import Chart from 'react-apexcharts';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

interface LossToLease {
    marketSum: number;
    rentIncome: number;
}

interface IncomePotentialProps {
    lossToLease: LossToLease;
}

export function LossToLease({ lossToLease }: IncomePotentialProps) {
    const totalMarketValue: number = lossToLease.marketSum;
    const rentIncome: number = lossToLease.rentIncome;

    const trackBg = useColorModeValue("#2D3748", "#A0AEC0");
    const labelColor = useColorModeValue("#1A202C", "#A0AEC0");

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    // Labels for the donut chart
    const labels: string[] = ['Lease Charges', 'Loss to Lease'];

    const options = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        colors: ['#85BB65', '#808080'],
        legend: {
            position: 'bottom'
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
        }],
        tooltip: {
            y: {
                formatter: (value: number) => {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(value);
                }
            }
        }
    } as any;

    // Series data for the donut chart
    const series = [rentIncome, totalMarketValue - rentIncome];

    return (
        <>
            <Chart options={options} series={series} type="donut" height={300} />
            <Flex justifyContent="center" mt={2}>
                <Text color={labelColor}>
                    Market Value <Text as="span" fontWeight="bold"  color={'#808080'}>{formatCurrency(totalMarketValue)}</Text>
                </Text>
                <Text color={labelColor} mr={2}>
                    Lease Charges <Text as="span" color={'#85BB65'} fontWeight="bold">{formatCurrency(rentIncome)}</Text>
                </Text>
                <Text color={labelColor}>
                    Loss to Lease <Text as="span" color={'#FF6B6B'} fontWeight="bold">{formatCurrency(totalMarketValue - rentIncome)}</Text>
                </Text>
            </Flex>
        </>
    );
}
