import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const { logout } = useAuth0();
    return (
        <>
            <Link to="order-status" className="flex bg-white items-center font-bold hover:text-green-500">
                Stanje narudžbe
            </Link>
            <Link to="manage-store" className="flex bg-white items-center font-bold hover:text-green-500">
                Moja eProdavnica
            </Link>
            <Link to="user-profile" className="flex bg-white items-center font-bold hover:text-green-500">
                Korisnički nalog
            </Link>
            <Button onClick={() => logout()} className="flex items-center px-3 font-bold hover:bg-gry-500">
                Odjavi se
            </Button>
        </>
    )
}

export default MobileNavLinks;