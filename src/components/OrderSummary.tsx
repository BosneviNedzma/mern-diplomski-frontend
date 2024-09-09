import { CartItem } from "@/pages/DetailPage";
import { Store } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Props = {
    store: Store;
    cartItems: CartItem[];
}

const OrderSummary = ({ store, cartItems }: Props) => {

    const getTotalCost = () => {
        const totalInKM = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

        const totalWithDelivery = totalInKM + store.deliveryPrice

        return (totalWithDelivery / 100).toFixed(2);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Tvoja narudžba</span>
                    <span>KM {getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            KM {((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Isporuka</span>
                    <span>KM {(store.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary;