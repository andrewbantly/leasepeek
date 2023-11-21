export interface ResponseObject {
    data?: Property[];
    message?: string;
}

interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacancy: Vacancy;
    floorplans: FloorPlans;
}

type ISODateString = string;

interface Vacancy {
    [key: string]: number;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

type FloorPlanName = string;

interface FloorPlanDetails {
    avgRent: number;
    sumRent: number;
    avgMarket: number;
    sumMarket: number;
    unitCount: number;
    avgSqft: number;
}
