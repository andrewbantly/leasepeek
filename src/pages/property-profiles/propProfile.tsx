import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

interface PropertyResponseObject {
    asOf: string;
    data: PropertyDataItem[];
    date: string;
    location: string;
    user_id: number;
}

interface PropertyDataItem {
    address: string | null;
    balance: number;
    charges: Charge[];
    floorplan: string;
    leaseExpire: string;
    leaseStart: string | null;
    market: number;
    moveIn: string;
    moveOut: string;
    nsf: string | null;
    otherDeposit: number;
    rent: number;
    resh: string | null;
    residentDeposit: number;
    residentId: string;
    sqft: number;
    status: string | null;
    tenant: string;
    total: number;
    unclassified: any;
    unit: string;
}

interface Charge {
    code: string;
    value: number;
}

const defaultPropertyData: PropertyResponseObject = {
    asOf: "",
    data: [],
    date: "",
    location: "",
    user_id: 0
};

export function PropertyProfile() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData)

    useEffect(() => {
        propertyDataRequest()
    }, [])

    useEffect(() => {
        console.log("### Property Data")
        console.log(propertyDataObject)
    }, [propertyDataObject])

   const propertyDataRequest = async () => {
        console.log(`fetching data for property: ${objectId}`)
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/read`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    objectId: objectId
                }
            });
            setPropertyDataObject(response.data[0]);
        } catch (error) {
            console.error("Error loading data", error);
            navigate('/')
        }
    }
    return(
        <>
        <h2>{propertyDataObject ? propertyDataObject.location : "Loading..."}</h2>
        </>
        )
}