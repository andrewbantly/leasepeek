import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { PropertyCards } from '../property-cards/propertyCards';

interface ResponseObject {
    data?: Property[];
    message?: string;
}

interface Property {
    location: string;
    date: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans:Floorplans
}

interface Floorplans {
    avg: number;
    count: number;
}

export function Profile({ currentUser, setCurrentUser }: UserProps) {
    const [responseObject, setResponseObject] = useState<ResponseObject>({});

    useEffect(() => {
        dataRequest()
    }, [])

    const dataRequest = async () => {
        try {
            const token = localStorage.getItem('jwt')
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setResponseObject(response.data)
        } catch (error) {
            console.error("Error loading data", error)
        }
    }

    const location = () => {
        return (
            <div>
                {responseObject.data?.map((property, index) => (
                    <div className="card">
                        <PropertyCards key={index} property={property} />
                    </div>
                ))}
            </div>
        );
    };


    const uploadFileButton = (
        <UploadFileButon dataRequest={dataRequest} />
    )

    return (
        <>
            <div className='flex space-between'>
                <h2>Welcome, {currentUser?.username}</h2>
                {uploadFileButton}
            </div>
            {location()}
        </>
    )
}
