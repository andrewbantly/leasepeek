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
    avgRent: number;
    sumRent: number;
    avgMarket: number;
    sumMarket: number;
    unitCount: number;
    avgSqft: number;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;
