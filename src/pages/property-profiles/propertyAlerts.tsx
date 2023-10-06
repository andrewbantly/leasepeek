import { Box, Heading, Text } from "@chakra-ui/react";
import { PropertyProfileComponentProps } from "../../interfaces/propertyProfileProps";

export function PropertyAlerts({propertyData} : PropertyProfileComponentProps) {
    let totalBalance = 0
    
    const today = new Date()
    const ninetyDaysFromNow = new Date()
    ninetyDaysFromNow.setDate(today.getDate() + 90)
    let expiringLeases = 0
    
    propertyData.forEach(element => {
        totalBalance += element.balance

        const leaseExpireDate = new Date(element.leaseExpire)
        if (leaseExpireDate >= today && leaseExpireDate <= ninetyDaysFromNow) {
            expiringLeases += 1
        }
    });

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    return(
        <Box padding="4" borderWidth="1px" borderRadius="lg" boxShadow="lg">
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
