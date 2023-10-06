export interface PropertyProfileComponentProps {
    propertyData: PropertyResponseObject;
}

export interface PropertyResponseObject {
    asOf: string;
    data: PropertyDataItem[];
    date: string;
    location: string;
    user_id: number;
}

export interface PropertyDataItem {
    address: string | null;
    balance: number;
    charges: Charge[];
    floorplan: string;
    leaseExpire: string;
    leaseStart: string | null;
    market: number;
    moveIn: string;
    moveOut: string;
    nsf: string | null;
    otherDeposit: number;
    rent: number;
    resh: string | null;
    residentDeposit: number;
    residentId: string;
    sqft: number;
    status: string | null;
    tenant: string;
    total: number;
    unclassified: any;
    unit: string;
}

export interface Charge {
    code: string;
    value: number;
}