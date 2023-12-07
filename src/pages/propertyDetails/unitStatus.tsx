import React, { useState } from 'react';
import { Box, Text, Select, Input, useColorModeValue, FormLabel, InputGroup, Grid, Button, propNames, } from '@chakra-ui/react';
import { PropertyResponseObject } from '../../interfaces/propertyProfile/propertyProfileProps';

interface UnitStatusProps {
    propertyDataObject: PropertyResponseObject;
}

interface UnitStatusFormProps {
    status: string;
    count: number;
    type: string;
    defaultStatus: Record<string, string>;
    setChangesMade: (value: boolean) => void;
}

const UnitStatusForm: React.FC<UnitStatusFormProps> = ({
    status,
    count,
    defaultStatus,
    setChangesMade,
}) => {
    const [selectedStatus, setSelectedStatus] = useState<string>(
        Object.keys(defaultStatus).includes(status) ? defaultStatus[status] : 'Other'
    );
    const [customStatus, setCustomStatus] = useState<string>('');

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
                setChangesMade(true);
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
                    if (e.target.value === 'Other') {
                        setCustomStatus('');
                    }
                }}
            >
                <option value="Occupied">Occupied</option>
                <option value="Vacant">Vacant</option>
                <option value="NonRev">Non-Revenue</option>
                <option value="Applicant">Future Resident</option>
                <option value="Other">Other</option>
            </Select>
            {selectedStatus === 'Other' ? textInput : null}
        </InputGroup>
    );
};

export function UnitStatus({ propertyDataObject }: UnitStatusProps) {
    const floorPlanTableBgColor = useColorModeValue('white', 'gray.700');
    const [changesMade, setChangesMade] = useState(false)

    const defaultStatus = { 'Occupied': 'Occupied', 'Vacant': 'Vacant', 'Model': 'NonRev', 'Down': 'NonRev', 'Applicant': 'Applicant' };

    const noChanges = (
        <Button isDisabled alignSelf="flex-end" mr={3}>Save Changes</Button>
    )

    const changes = (
        <Button alignSelf="flex-end" mr={3}>Save Changes</Button>
    )

    const saveButton = changesMade ? changes : noChanges;

    return (
        <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="xl"
            bg={floorPlanTableBgColor}
            display="flex"
            flexDirection="column"
            mb={4}
        >
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                Unit Status Types
            </Text>
            <Text fontSize="sm" mb={3}>
                Please enter updated unit status types, which have been automatically
                pulled from the rent roll.
            </Text>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                gap={4}
            >
                {Object.entries(propertyDataObject.vacancy).map(([status, count]) => (
                    <UnitStatusForm
                        key={status}
                        status={status}
                        count={count.count}
                        type={count.type}
                        defaultStatus={defaultStatus}
                        setChangesMade={setChangesMade}
                    />
                ))}
            </Grid>
            {saveButton}
        </Box>
    );
}
