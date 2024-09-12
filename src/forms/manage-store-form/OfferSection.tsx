import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { offerList } from "@/config/store-options-config";
import { useFormContext } from "react-hook-form";

import OfferCheckbox from "./OfferCheckbox";

const OfferSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div className="">
                <h2 className="text-2xl font-bold">Ponuda</h2>
                <FormDescription>
                    Označite šta u trgovini nudite
                </FormDescription>
            </div>
            <FormField control={control} name="offers" render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {offerList.map((offerItem) =>
                            <OfferCheckbox key={offerItem} offer={offerItem} field={field} />
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )
            } />
        </div>
    )
};

export default OfferSection;