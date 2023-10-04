import { useEffect, useRef, useState } from 'react';
import {
    Button,
    Input,
} from '@chakra-ui/react'

export function UploadFileButon() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        console.log('file name', fileName)
    }, [fileName]);

    const handleButtonClick = () => {
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

    const uploadSubmitButtons = fileName ? <Button onClick={handleButtonClick} colorScheme={'blue'} variant={'solid'}>Submit</Button> : <Button onClick={handleButtonClick}  colorScheme={'gray'} variant={'solid'}>Upload Rent Roll</Button>

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
                {uploadSubmitButtons}
                <p>{fileName}</p>
            </div>
        </>
    )

}