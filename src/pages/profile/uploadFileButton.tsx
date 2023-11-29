import { useRef, useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios'

interface UploadFileButtonProps {
    dataRequest: () => Promise<void>;
}

export function UploadFileButon({ dataRequest }: UploadFileButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('No file selected.');
    const [errorMessage, setErrorMessage] = useState('');

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
            setFileName('No file selected')
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
            console.log('Response', response)
            setFileName('No file selected.')
            dataRequest()
        } catch (error) {
            console.error("Error uploading file", error)
            setFileName('')
            setErrorMessage('Error uploading file.')
        }
    }

    const handleCancelUpoad = () => {
        setFileName('No file selected.')
        setErrorMessage('')
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


    const uploadButtons = fileName !== 'No file selected.' ? submitButtons :
        <Button onClick={handleUpload} colorScheme={'gray'} variant={'solid'}>Upload Rent Roll</Button>;

    const errorMessageResposne = (
        <Text mt={2} fontSize="sm" color="red.500">
            {errorMessage}
        </Text>
    )

    const fileMessageResponse = (
        <Text mt={2} fontSize="sm" color="gray.600">
            {fileName}
        </Text>
    )

    const responseMessage = errorMessage ? errorMessageResposne : fileMessageResponse;

    return (
        <>
            <div>
                <Input
                    type="file"
                    ref={fileInputRef}
                    accept=".xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <Flex direction="column" align="start" gap={2}>
                    {uploadButtons}
                    {responseMessage}
                </Flex>

            </div>
        </>
    );

}