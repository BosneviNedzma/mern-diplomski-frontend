import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    index: number,
    removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
    const { control } = useFormContext();

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField control={control} name={`menuItems.${index}.name`} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Naziv <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Med livada" className="bg-white" />
                    </FormControl>
                </FormItem>
            )} />
            <FormField control={control} name={`menuItems.${index}.price`} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Cijena (KM) <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="8.00" className="bg-white" />
                    </FormControl>
                </FormItem>
            )} />
            <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">
                Izbaci
            </Button>
        </div>
    )
};

export default MenuItemInput;