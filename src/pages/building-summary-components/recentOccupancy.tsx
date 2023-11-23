import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';


export function RecentOccupancyChart() {
    const textColor = useColorModeValue("gray.800", 'white');
    return (
        <>
        Finish building a recent occupancy chart similar to recent lease per sqft. Use 30, 60, 90 day intervals. 
        </>
    )   
}