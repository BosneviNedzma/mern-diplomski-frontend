import { Store } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
    store: Store,
}

const StoreInfo = ({ store }: Props) => {
    return (
        <Card className="border-sla max-w-full overflow-hidden">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {store.storeName}
                </CardTitle>
                <CardDescription>
                    {store.city}, {store.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {store.offers.map((item, index) => (
                    <span className="flex items-center" key={index}>
                        <span>{item}</span>
                        {
                            index < store.offers.length - 1 && <Dot className="mx-1" />
                        }
                    </span>
                ))}
            </CardContent>
        </Card>
    )
}

export default StoreInfo;