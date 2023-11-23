import Chart from 'react-apexcharts';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import { useRef } from 'react';

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
    
    const rentIncomeRef = useRef(0);
    const totalMarketValueRef = useRef(0);
    
    rentIncomeRef.current = rentIncome;
    totalMarketValueRef.current = totalMarketValue;
    
    const trackBg = useColorModeValue("#2D3748", "#A0AEC0");
    const labelColor = useColorModeValue("#1A202C", "#A0AEC0");

    const greenLightMode = "#38A169";
    const greenDarkMode = "#2F855A"; 
    const redLightMode = "#ed3d3d"; 
    const redDarkMode = "#ff4444"; 

    const { colorMode } = useColorMode();

    const rentIncomePercentage = totalMarketValue > 0 ? (rentIncome / totalMarketValue) * 100 : 0;

    const percentColor = rentIncomePercentage > 50
        ? colorMode === "light" ? greenLightMode : greenDarkMode
        : colorMode === "light" ? redLightMode : redDarkMode;


    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    const options = {
        chart: {
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 270,
                hollow: {
                    size: '70%'
                },
                track: {
                    background: trackBg,
                    strokeWidth: '67%',
                    margin: 0
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        show: true,
                        color: labelColor,
                        fontSize: '17px'
                    },
                    value: {
                        formatter: () => {
                            let percentage = (rentIncomeRef.current / totalMarketValueRef.current) * 100;
                            if (!isFinite(percentage)) {
                                return '0.00%';
                            }
                            return `${percentage.toFixed(2)}%`;
                        },                        
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: percentColor
                    }
                }
            }
        },
        colors: ['#ABE5A1'],
        stroke: {
            lineCap: 'round'
        },
        labels: ['Captured Value']
    } as any;

    return (
        <>
            <Chart options={options} series={[rentIncomePercentage]} type="radialBar" height={300} />
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