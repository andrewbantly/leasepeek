export interface PropertyProfileComponentProps {
    propertyData: PropertyDataItem[];
}

export interface PropertyResponseObject {
    asOf: string;
    date: ISODateString;
    location: string;
    user_id: number;
    vacancy: Vacancy;
    floorplans: FloorPlans;
    totalUnits: number;
    data: PropertyDataItem[];
}

export interface Vacancy {
    [key: string]: number;
}

type FloorPlanName = string;

interface FloorPlanDetails {
    market: FloorPlanMetrics;
    rent: FloorPlanMetrics;
}

interface FloorPlanMetrics {
    sum: number;
    count: number;
    average: number;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

type ISODateString = string;


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