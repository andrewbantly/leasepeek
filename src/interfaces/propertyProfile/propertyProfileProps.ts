export interface PropertyResponseObject {
    user_id: number;
    location: LocationDetails;
    asOf: string;
    date: ISODateString;
    vacancy: Vacancy;
    floorplans: FloorPlans;
    totalUnits: number;
    totalBalance: number;
    lossToLease: LossToLease;
    recentLeases: RecentLeases;
    expiringLeases: ExpiringLeases;
    leaseTrends: LeaseTrends;
    data: PropertyDataItem[];
}

interface LocationDetails {
    market: string;
    address: AddressDetails;
    building: string;
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
export type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

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

export interface LossToLease {
    marketSum: number;
    rentIncome: number;
}

export interface RecentLeases {
    [floorPlanName: string]: {
        recent_two: LeaseInfo;
        recent_leases: {
            last_180_days: LeaseInfo;
            last_150_days: LeaseInfo;
            last_120_days: LeaseInfo;
            last_90_days: LeaseInfo;
            last_60_days: LeaseInfo;
            last_30_days: LeaseInfo;
        };
    };
}
interface LeaseInfo {
    count: number;
    total_rent: number;
    average_rent: number;
}

export interface ExpiringLeases {
    [floorPlanName: string]: {
        expiring_in_90_days: LeaseCountInfo;
        expired: LeaseCountInfo;
    };
}

interface LeaseCountInfo {
    count: number;
    total_rent: number;
}

export interface LeaseTrends {
    [month: string]: {
        [floorPlanName: string]: {
            NumOfLeases: number;
            AvgLeasePerSqFt: number;
        }
    }
}

export interface PropertyDataItem {
    unit: string;
    floorplan: string;
    sqft: number;
    market: number;
    rent: number;
    status: string;
    moveIn: string;
    moveOut: string;
    leaseStart: string | null;
    leaseExpire: string;
    residentDeposit: number;
    otherDeposit: number;
    balance: number;
    total: number;
    renovated: boolean;
    charges: Charge[];

}

interface Charge {
    code: string;
    value: number;
    type: string;
}