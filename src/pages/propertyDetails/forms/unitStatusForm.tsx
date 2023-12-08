import { Text, Select, Input, FormLabel, InputGroup, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface UnitStatusFormProps {
    status: string;
    count: number;
    type: string;
    handleInputChange: (status: string, value: string) => void;
}

export function UnitStatusForm({ status, type, count, handleInputChange }: UnitStatusFormProps) {

    const defaultStatus = ['occupied', 'vacant', 'nonRevenue', 'futureResident'];
    
    const [selectedStatus, setSelectedStatus] = useState<string>(
        defaultStatus.includes(type) ? type : 'other'
    );

    const [customStatus, setCustomStatus] = useState<string>('');

    useEffect(() => {
        if (customStatus) {
            handleInputChange(status, customStatus);
        } else {
            handleInputChange(status, selectedStatus);
        }
    }, [selectedStatus, customStatus])

    const textInput = (
        <Input
            size="sm"
            width={'200px'}
            ml={2}
            mt={{ base: '2', md: '0' }}
            gridColumn={{ base: '1', md: '2' }}
            placeholder="Custom Status"
            value={customStatus}
            onChange={(e) => {
                setCustomStatus(e.target.value);
            }}
            required={selectedStatus === 'Other'}
        />
    );


    return (
        <InputGroup>
                <FormLabel width={'100px'}>
                    {status}
                    <Text size={'sm'} color={'gray.500'}>
                        {count} units
                    </Text>
                </FormLabel>
                <Select
                    size="sm"
                    width="200px"
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setCustomStatus('');
                    }}
                >
                    <option value="occupied">Occupied</option>
                    <option value="vacant">Vacant</option>
                    <option value="nonRevenue">Non-Revenue</option>
                    <option value="futureResident">Future Resident</option>
                    <option value="other">Other</option>
                </Select>
                {selectedStatus === 'other' ? textInput : null}
        </InputGroup>
    );
};