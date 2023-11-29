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
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Market Value',
                            formatter: function (w: any) {
                                return formatCurrency(totalMarketValue);
                            }
                        }
                    }
                }
            }
        },
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
        }]
    } as any;

    // Series data for the donut chart
    const series = [rentIncome, totalMarketValue - rentIncome];

    return (
        <>
            <Chart options={options} series={series} type="donut" height={300} />
            <Flex justifyContent="center">
                <Text color={labelColor} mr={6}>
                    Lease Charges: <Text as="span" fontWeight="bold">{formatCurrency(rentIncome)}</Text>
                </Text>
                <Text color={labelColor}>
                    Market Value: <Text as="span" fontWeight="bold">{formatCurrency(totalMarketValue)}</Text>
                </Text>
            </Flex>
        </>
    );
}
