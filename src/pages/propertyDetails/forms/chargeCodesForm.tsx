import { Text, Select, FormLabel, InputGroup, } from '@chakra-ui/react';

interface ChargeCodesFormProps {
    charge: string;
    chargeValue: number;
    chargeType: string;
    handleInputChange: (charge: string, chargeType: string) => void;
}

export function ChargeCodesForm({ charge, chargeValue, chargeType, handleInputChange }: ChargeCodesFormProps) {

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };


    return (
        <InputGroup>
            <FormLabel width={'100px'}>
                {charge}
                <Text size={'sm'} color={'gray.500'}>
                    {formatCurrency(chargeValue)}
                </Text>
            </FormLabel>
            <Select
                size="sm"
                width="200px"
                value={chargeType}
                onChange={(e) => handleInputChange(charge, e.target.value)}
            >
                <option value="" disabled hidden>Select an option</option>
                <option value="contractualRent">Contractual Rent</option>
                <option value="supplementalRent">Supplemental Rent</option>
                <option value="recurringConcessions">Recurring Concessions</option>
                <option value="upfrontConcessions">Upfront Concessions</option>
                <option value="discount">Empl./Other discount</option>
                <option value="otherIncome">Other Income</option>
            </Select>
        </InputGroup>
    )
}