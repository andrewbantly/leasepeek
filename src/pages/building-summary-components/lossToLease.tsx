import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

interface LossToLeaseData {
    marketSum: number;
    rentIncome: number;
}

interface IncomePotentialProps {
    lossToLease: LossToLeaseData;
}

export function LossToLease({ lossToLease }: IncomePotentialProps) {
    const totalMarketValue: number = lossToLease.marketSum;
    const rentIncome: number = lossToLease.rentIncome;
    const labelColor = useColorModeValue("#1A202C", "#A0AEC0");

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
    
    const labels: string[] = ['Lease Charges', 'Loss to Lease'];
    const series = [rentIncome, totalMarketValue - rentIncome];

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

    return (
        <>
            <Chart options={options} series={series} type="donut" height={300} />
            <Flex justifyContent="center" mt={2}>
                <Text color={labelColor} width={'33%'}>
                    Market Value <Text as="span" color={'#808080'} fontWeight="bold">{formatCurrency(totalMarketValue)}</Text>
                </Text>
                <Text color={labelColor} width={'33%'}>
                    Lease Charges <Text as="span" color={'#85BB65'} fontWeight="bold">{formatCurrency(rentIncome)}</Text>
                </Text>
                <Text color={labelColor} width={'33%'}>
                    Loss to Lease <Text as="span" color={'#FF6B6B'} fontWeight="bold">{formatCurrency(totalMarketValue - rentIncome)}</Text>
                </Text>
            </Flex>
        </>
    );
}
