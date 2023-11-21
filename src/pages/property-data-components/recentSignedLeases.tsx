import { RecentLeases } from "../../interfaces/propertyProfile/propertyProfileProps";

interface RecentLeaseProps {
    recentLeases: RecentLeases;
}

export function RecentSignedLeases({ recentLeases }: RecentLeaseProps) {
    let rent_recent_two_value = 0;
    let rent_90_days_value = 0;
    let rent_60_days_value = 0;
    let rent_30_days_value = 0;
    
    console.log("Recent leases", recentLeases)


    return (
        <>
            Recent Signed Leases
        </>
    )
}