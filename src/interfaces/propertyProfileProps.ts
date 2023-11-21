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
}

interface Vacancy {
    [key: string]: number;
}

interface FloorPlanDetails {
    avgRent: number;
    sumRent: number;
    avgMarket: number;
    sumMarket: number;
    unitCount: number;
    avgSqft: number;
}

type FloorPlanName = string;

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

interface LossToLease {
    marketSum: number;
    rentIncome: number;
}

interface RecentLeases {
    [floorPlanName: string]: {
        recent_two: LeaseInfo;
        recent_leases: {
            last_90_days: LeaseInfo;
            last_60_days: LeaseInfo;
            last_30_days: LeaseInfo;
        };
    };
}

interface ExpiringLeases {
    [floorPlanName: string]: {
        expiring_in_90_days: LeaseCountInfo;
        expired: LeaseCountInfo;
    };
}

interface LeaseInfo {
    count: number;
    total_rent: number;
    average_rent: number;
}

interface LeaseCountInfo {
    count: number;
    total_rent: number;
}

type ISODateString = string;
