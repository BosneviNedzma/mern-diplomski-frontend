import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number;
}

export const ORDER_STATUS: OrderStatusInfo[] = [
    { label: "Postavljena", value: "postavljena", progressValue: 0 },
    { label: "Čekanje potvrde eProdavnice", value: "plaćena", progressValue: 25 },
    { label: "U obradi", value: "uObradi", progressValue: 50 },
    { label: "Na dostavi", value: "naDostavi", progressValue: 75 },
    { label: "Dostavljena", value: "dostavljena", progressValue: 100 },
];