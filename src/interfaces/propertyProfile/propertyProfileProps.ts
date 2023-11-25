export interface PropertyResponseObject {
    user_id: number;
    location: string;
    asOf: string;
    date: ISODateString;
    vacancy: Vacancy;
    floorplans: FloorPlans;
    totalUnits: number;
    lossToLease: LossToLease;
    recentLeases: RecentLeases;
    expiringLeases: ExpiringLeases;
    leaseTrends: LeaseTrends;
    data: PropertyDataItem[];
}

type ISODateString = string;

interface Vacancy {
    [key: string]: number;
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
    balance: number;
    charges: Charge[];
    floorplan: string;
    leaseExpire: string;
    leaseStart: string | null;
    market: number;
    moveIn: string;
    moveOut: string;
    otherDeposit: number;
    rent: number;
    residentDeposit: number;
    sqft: number;
    status: string | null;
    total: number;
    unit: string;
}

interface Charge {
    code: string;
    value: number;
}