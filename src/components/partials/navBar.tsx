import { Link } from "react-router-dom"
import { ColorModeSwitcher } from "../ui/ColorModeSwitcher"
import './navBar.css'

export default function NavBar() {
    return (
        <>
            <div className="flex space-between">
                <h1>LeasePeek</h1>
                <div className="flex test">
                    <Link className="navIcons" to='/'><p>Home</p></Link>
                    <Link className="navIcons" to='/login'><p>Login</p></Link>
                    <Link className="navIcons" to='/register'><p>Register</p></Link>
                    <ColorModeSwitcher />
                </div>
            </div>
        </>
    )
}