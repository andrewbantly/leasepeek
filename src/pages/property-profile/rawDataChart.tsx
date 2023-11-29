import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Badge, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function RawBuildingDataComponent(propertyDataObject: PropertyResponseObject) {
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredPropertyData, setFilteredPropertyData] = useState(propertyDataObject.data);
  const statusAcronymColor = useColorModeValue("yellow.600", 'yellow.500');

  const statusOptions = [''];

  propertyDataObject.data.map(unit => {
    if (!statusOptions.includes(unit.status)) {
      statusOptions.push(unit.status)
    }
  })

  console.log('status options', statusOptions)

  useEffect(() => {
    const newFilteredData = statusFilter
      ? propertyDataObject.data.filter(unit => unit.status === statusFilter)
      : propertyDataObject.data;

    setFilteredPropertyData(newFilteredData);
  }, [statusFilter, propertyDataObject.data]);


  const handleStatusFilterChange = () => {
    const currentIndex = statusOptions.indexOf(statusFilter);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    setStatusFilter(statusOptions[nextIndex]);
  }

  const getStatusFilterAcronym = (statusFilter: string) => {
    switch (statusFilter) {
      case 'occupied':
        return 'Occ';
      case 'vacant':
        return 'Vac';
      case 'applicant':
        return 'App';
      case 'upcoming':
        return 'Up';
      case 'model':
        return 'Mod';
      case 'down':
        return 'Down';
      default:
        return 'All';
    }
  }

  const statusFilterAcronym = getStatusFilterAcronym(statusFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const buildingData = filteredPropertyData.map(unit => {

    return (
      <Tr key={`${unit.unit}-${unit.status}`}>
        <Td px={2}>{unit.unit}</Td>
        <Td px={2}>{unit.floorplan}</Td>
        <Td px={2}>{unit.sqft}</Td>
        <Td px={2}>{unit.status ? `${unit.status.charAt(0).toUpperCase()}${unit.status.substr(1).toLowerCase()}` : ''}</Td>
        <Td px={2}>{unit.rent ? formatCurrency(unit.rent) : ''}</Td>
        <Td px={2}>{unit.total ? formatCurrency(unit.total) : ''}</Td>
        <Td px={2}>{unit.market ? formatCurrency(unit.market) : ''}</Td>
        <Td px={2}>{unit.moveIn ? formatDate(unit.moveIn) : ''}</Td>
        <Td px={2}>{unit.leaseExpire ? formatDate(unit.leaseExpire) : ''}</Td>
        <Td px={2}>{unit.moveOut ? formatDate(unit.moveOut) : ''}</Td>
        <Td px={2}>{unit.balance ? formatCurrency(unit.balance) : ''}</Td>
      </Tr>
    )
  })


  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Raw Building Data</TableCaption>
          <Thead>
            <Tr>
              <Th px={2}>Unit</Th>
              <Th px={2}>Floor plan</Th>
              <Th px={2}>SqFt</Th>
              <Th px={2} _hover={{ cursor: 'pointer' }} onClick={handleStatusFilterChange}>
                <Tooltip label={`Click to filter by status`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Status</span>
                    <Badge color={statusAcronymColor} size='sm' ml={2}>{statusFilterAcronym}</Badge>
                  </div>
                </Tooltip>
              </Th>
              <Th px={2}>Rent</Th>
              <Th px={2}>Total Charges</Th>
              <Th px={2}>Market</Th>
              <Th px={2}>Move In</Th>
              <Th px={2}>Lease Expire</Th>
              <Th px={2}>Move Out</Th>
              <Th px={2}>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buildingData}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}