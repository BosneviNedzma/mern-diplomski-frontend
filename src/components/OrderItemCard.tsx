import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyStoreOrder } from "@/api/MyStoreApi";
import { Order, OrderStatus } from "@/types";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useState } from "react";

type Props = {
    order: Order;
}

const OrderItemCard = ({ order }: Props) => {

    const { updateStoreStatus, isLoading } = useUpdateMyStoreOrder();

    const [status, setStatus] = useState<OrderStatus>(order.status);
    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateStoreStatus({
            orderId: order._id as string,
            status: newStatus,
        });
        setStatus(newStatus);
    };

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);

        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}: ${paddedMinutes}`;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Ime kupca:
                        <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
                    </div>
                    <div>
                        Adresa za dostavu:
                        <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {
                            order.deliveryDetails.city}, </span>
                    </div>
                    <div>
                        Vrijeme:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Ukupno za platiti:
                        <span className="ml-2 font-normal">
                            KM {(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6 ">
                <div className="flex flex-col gap-2 ">
                    {order.cartItems.map((cartItem, index) => (
                        <span key={index}>
                            <Badge variant="outline" className="mr-2">{cartItem.quantity}</Badge>
                            {cartItem.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">Koji je status narudžbe?</Label>
                    <Select
                        value={status}
                        disabled={isLoading}
                        onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (<SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
};

export default OrderItemCard;