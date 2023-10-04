import { rentRollData } from '../../data/test_data'
import ApexChart from 'react-apexcharts';
import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';
import { useEffect, useState } from 'react';
import axios from 'axios'

export function Profile({ currentUser, setCurrentUser }: UserProps) {

    interface Property {
        location: string;
        date: string;
        objectId: string;
    }
    
    interface ResponseObject {
        data?: Property[];
        message?: string;
    }
    
    const [responseObject, setResponseObject] = useState<ResponseObject>({});

    useEffect(() => {
        dataRequest()
    }, [])

    useEffect(() => {
        console.log(responseObject);
    }, [responseObject]);

    const dataRequest = async () => {
        console.log('looking for user upload B&L data')
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
        return responseObject.data?.map((property, index) => (
            <p key={index}>{property.location}</p>
        ));
    }

    const uploadFileButton = (
        <UploadFileButon dataRequest={dataRequest}/>
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
