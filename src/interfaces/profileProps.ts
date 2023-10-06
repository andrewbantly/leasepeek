export interface ResponseObject {
    data?: Property[];
    message?: string;
}
type ISODateString = string;

interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans: FloorPlans;
}

type FloorPlanName = string;

interface FloorPlanDetails {
    avg: number;
    count: number;
}
type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
