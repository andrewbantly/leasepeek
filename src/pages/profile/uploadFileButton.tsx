import { useEffect, useRef, useState } from 'react';
import {
    Button,
    Input,
} from '@chakra-ui/react'
import axios from 'axios'

interface UploadFileButtonProps {
    dataRequest: () => Promise<void>;
}

export function UploadFileButon({dataRequest}:UploadFileButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        console.log('file name', fileName)
    }, [fileName]);

    const handleUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            console.log('file added', file.name);
            setFileName(file.name);
        }
    };

    const handleSubmitFile = async () => {
        if (!fileInputRef.current?.files?.length) {
            console.log('No file selected')
            return;
        }
        const file = fileInputRef.current.files[0]
        const formData = new FormData();
        formData.append("file", file);
        try {
            console.log('sending data to server')
            const token = localStorage.getItem('jwt')
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/data/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dataRequest()
            setFileName('')
        } catch (error) {
            console.error("Error uploading file", error)
        }
    }

    const handleCancelUpoad = () => {
        setFileName('')
    }

    const submitButtons = (
        <>
            <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmitFile}>Submit</Button>
            <Button onClick={handleCancelUpoad}>Cancel</Button>
        </>
    )

    const uploadButtons = fileName ? submitButtons : <Button onClick={handleUpload} colorScheme={'gray'} variant={'solid'}>Upload Rent Roll</Button>

    return (
        <>
            <div>
                <Input
                    type="file"
                    ref={fileInputRef}
                    accept=".xls,.xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                {uploadButtons}
                <p>{fileName}</p>
            </div>
        </>
    )

}