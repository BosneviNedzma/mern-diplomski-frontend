import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/order-status" className="font-bold hover:text-green-500">
                        Stanje narudžbe
                    </Link>
                    <UsernameMenu />
                </>
            ) :
                <Button variant="ghost" className="font-bold hover:text-green-500 hover:bg-white"
                    onClick={async () => await loginWithRedirect()}
                >
                    Prijavi se
                </Button>
            }
        </span>
    )
};

export default MainNav;