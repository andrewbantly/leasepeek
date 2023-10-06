export interface ResponseObject {
    data?: Property[];
    message?: string;
}
export type ISODateString = string;

export interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans: FloorPlans;
}

export type FloorPlanName = string;

export interface FloorPlanDetails {
    avg: number;
    count: number;
}
export type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
