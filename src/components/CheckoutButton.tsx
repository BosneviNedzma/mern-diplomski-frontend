import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useGetMyUser } from "@/api/MyUserApi";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    const { pathname } = useLocation();
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }

    if (!isAuthenticated) {
        return (<Button onClick={onLogin} className="bg-green-500 flex-1">Prijavi se za završetak kupovine</Button>)
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-green-500 flex-1">
                    Plati
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading}
                    title="Potvrdi detalje isporuke" buttonText="Prijeđi na plaćanje" />
            </DialogContent>
        </Dialog>
    )
};

export default CheckoutButton;