import { UserProps } from '../../interfaces/currentUser';
import { Profile } from '../profile/profile';
import Landing from './landing';

export function Home({ currentUser, setCurrentUser }: UserProps) {

    const profile = (
        <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
    )
    const heading = (
        <Landing/>
    )
    return (
        <>
            {currentUser ? profile : heading}
        </>
    );
}