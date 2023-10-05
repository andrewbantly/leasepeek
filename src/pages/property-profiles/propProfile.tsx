import { useParams, useNavigate } from 'react-router-dom';

export function PropertyProfile() {
    const { objectId } = useParams();
    const navigate = useNavigate();

    // fetch data from backend server, if there is an error, navigate to the not found page

    return(
        <p>Property profile</p>
    )
}