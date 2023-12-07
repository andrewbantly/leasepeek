export interface Property {
    location: LocationDetails;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    totalBalance: number;
    lossToLease: LossToLease;
    vacancy: Vacancy;
    floorplans: FloorPlans;
}

interface LocationDetails {
    market: string;
    address: AddressDetails;
    building: string;
}

interface AddressDetails {
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
}

type ISODateString = string;

interface Vacancy {
    [key: string]: {
        count: number;
        type: string;
    }
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
    unitStatuses: UnitStatusDetails;
    planName: string;
    planType: string;
    beds: number;
    baths: number;
}

interface UnitStatusDetails {
    [key: string]: number;
}

interface LossToLease {
    marketSum: number;
    rentIncome: number;
}