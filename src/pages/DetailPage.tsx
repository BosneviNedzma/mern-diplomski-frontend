import { useGetStore } from "@/api/StoreApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import StoreInfo from "@/components/StoreInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {
    const { storeId } = useParams();
    const { store, isLoading } = useGetStore(storeId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${storeId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {
                    ...cartItem, quantity: cartItem.quantity + 1
                } : cartItem);
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ];
            }

            sessionStorage.setItem(`cartItems-${storeId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        })
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);

            sessionStorage.setItem(`cartItems-${storeId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        })
    }

    const onCheckout = (userFormData: UserFormData) => {
        console.log("userFormData", userFormData);
    }

    if (isLoading || !store) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10 overflow-hidden">
            <AspectRatio ratio={16 / 5}>
                <img src={store.imageUrl} className="rounded-md object-cover h-full w-full max-w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 overflow-hidden">
                <div className="flex flex-col gap-4 overflow-hidden ">
                    <StoreInfo store={store} />
                    <span className="text-2xl font-bold tracking-tight">Ponuda</span>
                    {store.menuItems.map((menuItem) => (
                        <MenuItem
                            key={menuItem._id}
                            menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>
                <div className="overflow-hidden">
                    <Card>
                        <OrderSummary store={store} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;