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
    buildingName: string;
}

interface AddressDetails {
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    city: string;
    state: string;
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
    renovated: boolean;
}

interface UnitStatusDetails {
    [key: string]: number;
}

interface LossToLease {
    marketSum: number;
    rentIncome: number;
}