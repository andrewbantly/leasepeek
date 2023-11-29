import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";

import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import type { EventName } from '@lit-labs/react';
import {
  ApexFilteringEvent,
  ApexFilteredEvent,
  ApexGrid,
  ColumnConfiguration,
  FilterExpression,
  SortExpression,
} from 'apex-grid';

ApexGrid.register();

function createApexGridWrapper<T extends object>() {
  return createComponent({
    tagName: 'apex-grid',
    elementClass: ApexGrid<T>,
    react: React,
    events: {
      onSorting: 'sorting' as EventName<CustomEvent<SortExpression<T>>>,
      onSorted: 'sorted' as EventName<CustomEvent<SortExpression<T>>>,
      onFiltering: 'filtering' as EventName<CustomEvent<ApexFilteringEvent<T>>>,
      onFiltered: 'filtered' as EventName<CustomEvent<ApexFilteredEvent<T>>>,
    },
  });
}

interface PropertyDataItem {
    market: number;
    rent: number;
    sqft: number;
    status: string | null;
    unit: string;
}

export function RawBuildingDataComponent(propertyDataObject: PropertyResponseObject) {

    const columns: ColumnConfiguration<PropertyDataItem>[] = [
        { key: 'unit', headerText: "Unit"},
        { key: 'status', headerText: "Status"},
        { key: 'sqft', headerText: "SqFt" },
        { key: 'rent', headerText: "Rent" },
        { key: 'market', headerText: "Market" },
    ];

    const data = propertyDataObject.data;

    const PropertyGrid = createApexGridWrapper<PropertyDataItem>();

    return (
        <>
            <h2>Raw Building Data</h2>
            <PropertyGrid 
                columns={columns} 
                data={data}
                className="custom-grid-style"
            />
        </>
    )
}