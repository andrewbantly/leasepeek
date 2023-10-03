import { Link } from "react-router-dom"
import { ColorModeSwitcher } from "../ui/ColorModeSwitcher"
import './navBar.css'
import { NavBarProps } from "../../interfaces/navBarProps";

export default function NavBar({ currentUser, setCurrentUser, handleLogout }: NavBarProps) {

const loginLogoutLink = currentUser 
  ? <Link className="navIcons" to="/" onClick={handleLogout}>Logout</Link> 
  : <Link className="navIcons" to="/login">Login</Link>;

    return (
        <>
            <div className="flex space-between navBar">
                <h1>LeasePeek</h1>
                <div className="flex test">
                    <Link className="navIcons" to='/'><p>Home</p></Link>
                    {loginLogoutLink}
                    <ColorModeSwitcher />
                </div>
            </div>
        </>
    )
}