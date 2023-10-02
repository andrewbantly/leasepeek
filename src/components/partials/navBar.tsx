import { ColorModeSwitcher } from "../ui/ColorModeSwitcher"

export default function NavBar() {
    console.log("nav bar")
    return (
        <>
            <ColorModeSwitcher justifySelf="flex-end" />

            <p>nav bar</p>
        </>
    )
}