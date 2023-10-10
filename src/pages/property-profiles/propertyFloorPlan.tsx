import { PropertyProfileComponentProps } from "../../interfaces/propertyProfileProps";
import { useColorModeValue, Box } from '@chakra-ui/react';
import { FaBuilding, FaChartBar, FaDollarSign, FaDraftingCompass, FaBalanceScale, FaSearchDollar, FaCalculator, FaChartLine } from 'react-icons/fa';
import { MdPieChart } from 'react-icons/md';

export function PropertyFloorPlan({propertyData} : PropertyProfileComponentProps) {

    let floorplans: { [key: string]: number } = {};

    propertyData.forEach(element => {
        floorplans[element.floorplan] = (floorplans[element.floorplan] || 0) +1;
    })

    console.log("### Floor plan breakdown:")
    console.log(floorplans)

    return(
        <Box style={{ width: '33%' }}>
            <p>Property Floor plans</p>
    </Box>
    )
}