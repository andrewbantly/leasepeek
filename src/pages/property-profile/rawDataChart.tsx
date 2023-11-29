import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useState } from "react";

interface PropertyDataItem {
  unit: string;
  sqft: number;
  floorplan: string;
  status: string | null;
  rent: number;
  market: number;
  leaseStart: string | null;
  moveIn: string;
  leaseExpire: string;
  moveOut: string;
  balance: number;
  // charges: Charge[];
  otherDeposit: number;
  residentDeposit: number;
  total: number;
}

export function RawBuildingDataComponent(propertyDataObject: PropertyResponseObject) {

  const buildingData = propertyDataObject.data.map(unit => {
    return (
      <Tr key={unit.unit}>
        <Td >{unit.unit}</Td>
        <Td>{unit.floorplan}</Td>
        <Td isNumeric>{unit.sqft}</Td>
        <Td>{unit.status}</Td>
        <Td isNumeric>${unit.rent}</Td>
        <Td isNumeric>${unit.total}</Td>
        <Td isNumeric>${unit.market}</Td>
        <Td>{unit.moveIn}</Td>
        <Td>{unit.leaseExpire}</Td>
        <Td>{unit.moveOut}</Td>
        <Td isNumeric>${unit.balance}</Td>
      </Tr>
    )
  })


  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Raw Building Data Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Unit</Th>
              <Th>Floor plan</Th>
              <Th isNumeric>SqFt</Th>
              <Th>Status</Th>
              <Th isNumeric>Rent</Th>
              <Th isNumeric>Total Charges</Th>
              <Th isNumeric>Market</Th>
              <Th>Move In</Th>
              <Th>Lease Expire</Th>
              <Th>Move Out</Th>
              <Th isNumeric>Balance</Th>
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