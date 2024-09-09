import { Store } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
    store: Store,
}

const StoreInfo = ({ store }: Props) => {
    return (
        <Card className="border-sla">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {store.storeName}
                </CardTitle>
                <CardDescription>
                    {store.city}, {store.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex">
                {store.offers.map((item, index) => (
                    <span className="flex">
                        <span>{item}</span>
                        {
                            index < store.offers.length - 1 && <Dot />
                        }
                    </span>
                ))}
            </CardContent>
        </Card>
    )
}

export default StoreInfo;