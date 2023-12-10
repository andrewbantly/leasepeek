import { Box, Text, Flex, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

interface FormCompletionProp {
    unSavedChanges: boolean;
}

export function FormCompletion({ unSavedChanges }: FormCompletionProp) {
    const buttonHoverBg = useColorModeValue("gray.800", "blue.400");
    const buttonHoverColor = useColorModeValue("#90CDF4", "gray.900");

    const buttonColorUnSaved = useColorModeValue("#000000", "white");
    const bgColorUnSaved = useColorModeValue("red", "red.500");
    const variant = useColorModeValue("solid", "outline");
    const navigate = useNavigate();
    const { objectId } = useParams();

    // Function to navigate to the Analysis page
    const navigateToAnalysis = () => {
        navigate(`/${objectId}`);
    };

    return (
        <>
            {unSavedChanges ?
                (<Button
                    size='lg'
                    bg={bgColorUnSaved}
                    color={buttonColorUnSaved}
                    variant={variant}
                    isDisabled
                    mb={4}
                >
                    There are unsaved changes
                </Button>) :
                (<Button
                    rightIcon={<FaArrowRight />}
                    size='lg'
                    colorScheme='blue'
                    color="white"
                    _hover={{ bg: buttonHoverBg, color: buttonHoverColor }}
                    variant={variant}
                    onClick={navigateToAnalysis}
                    mb={4}
                >
                    Go to Analysis
                </Button>)
            }
        </>
    );
}
