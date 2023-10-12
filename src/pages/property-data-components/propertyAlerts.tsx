import { Box, Heading, Text } from "@chakra-ui/react";
import { PropertyDataItem } from "../../interfaces/propertyProfileProps";

export interface PropertyAlertProps {
    propertyData: PropertyDataItem[];
    asOf: string;
}

export function PropertyAlerts({propertyData, asOf} : PropertyAlertProps) {
    let totalBalance = 0

    const startDate = new Date(asOf)
    const ninetyDaysFromStart = new Date(startDate)
    ninetyDaysFromStart.setDate(startDate.getDate() + 90)
    let expiringLeases = 0
    
    propertyData.forEach(element => {
        totalBalance += element.balance

        const leaseExpireDate = new Date(element.leaseExpire)
        if (leaseExpireDate >= startDate && leaseExpireDate <= ninetyDaysFromStart) {
            expiringLeases += 1
        }
    });

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    return(
        <Box>
            <Heading as="h3" size="md" marginBottom="2">
                Outstanding balances: 
                <Text 
                    display="inline" 
                    color={totalBalance < 0 ? "red.500" : "teal.500"}
                    ml={"5px"}
                >
                    {formatCurrency(totalBalance)}
                </Text>
            </Heading>
            <Heading as="h3" size="md">
                Expiring leases (90 days):  
                <Text 
                    display="inline" 
                    color={expiringLeases > 0 ? "red.500" : "teal.500"}
                    ml={"5px"}
                >
                     {expiringLeases}
                </Text>
            </Heading>
        </Box>
    )
}
