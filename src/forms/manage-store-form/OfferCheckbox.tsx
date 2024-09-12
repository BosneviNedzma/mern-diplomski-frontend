import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  offer: string;
  field: ControllerRenderProps<FieldValues, "offers">;
};

const OfferCheckbox = ({ offer, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(offer)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, offer]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== offer)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{offer}</FormLabel>
    </FormItem>
  );
};

export default OfferCheckbox;
