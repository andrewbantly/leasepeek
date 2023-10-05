import { useRef, useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios'

interface UploadFileButtonProps {
    dataRequest: () => Promise<void>;
}

export function UploadFileButon({ dataRequest }: UploadFileButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    const handleUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
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
        <Flex align="center" justify="space-between" width="full" gap={4}>
            <Button 
                width="48%" 
                colorScheme={'blue'} 
                variant={'solid'} 
                onClick={handleSubmitFile}
            >
                Submit
            </Button>
            <Button 
                width="48%" 
                variant="outline"
                colorScheme="red"
                onClick={handleCancelUpoad}
            >
                Cancel
            </Button>
        </Flex>
    );
    

    const uploadButtons = fileName ? submitButtons :
        <Button onClick={handleUpload} colorScheme={'gray'} variant={'solid'}>Upload Rent Roll</Button>;

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
                <Flex direction="column" align="start" gap={2}>
                    {uploadButtons}
                    <Text mt={2} fontSize="sm" color="gray.600">
                        {fileName || "No file selected."}
                    </Text>
                </Flex>

            </div>
        </>
    );

}