import { rentRollData } from '../../data/test_data'
import ApexChart from 'react-apexcharts';
import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';

export function Profile({ currentUser, setCurrentUser }: UserProps) {

    const uploadFileButton = (
        <UploadFileButon/>
    )
    return (
        <>
        <div className='flex space-between'>
            <h2>Welcome, {currentUser?.username}</h2>
            {uploadFileButton}
        </div>
        </>
    )
}
