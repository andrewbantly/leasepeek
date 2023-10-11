export interface ResponseObject {
    data?: Property[];
    message?: string;
}
type ISODateString = string;

export interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacancy: Vacancy;
    floorplans: FloorPlans;
}

interface Vacancy {
    [key: string]: number;
}

type FloorPlanName = string;

interface FloorPlanDetails {
    average: number;
    count: number;
    sum: number;
}
type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
