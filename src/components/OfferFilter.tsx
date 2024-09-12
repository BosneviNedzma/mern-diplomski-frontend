import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { offerList } from "@/config/store-options-config";
import { Button } from "./ui/button";
import { ChangeEvent } from "react";
import { Label } from "./ui/label";

type Props = {
    onChange: (offers: string[]) => void;
    selectedOffers: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
};

const OfferFilter = ({ onChange, selectedOffers, isExpanded, onExpandedClick }: Props) => {
    const handleOffersChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedOffer = event.target.value;
        const isChecked = event.target.checked;

        const newOffersList = isChecked ? [...selectedOffers, clickedOffer] : selectedOffers.filter((offer) => offer !== clickedOffer);

        onChange(newOffersList);
    }
    const handleOffersReset = () => onChange([])

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Pretraži prema ponudi</div>
                <div onClick={handleOffersReset} className="text-sm font-semibold mb-2 
                underline cursor-pointer text-blue-500">Očisti</div>
            </div>

            <div className="space-y-2 flex flex-col">
                {offerList.slice(0, isExpanded ? offerList.length : 7)
                    .map((offer) => {
                        const isSelected = selectedOffers.includes(offer);
                        return (<div className="flex" key={offer}>
                            <input id={`offer_${offer}`} type="checkbox" className="hidden" value={offer} checked={isSelected}
                                onChange={handleOffersChange} />
                            <Label htmlFor={`offer_${offer}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4
                            py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {offer}
                            </Label>
                        </div>)
                    })}

                <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
                    {isExpanded ? (<span className="flex flex-row items-center">
                        Pogledaj manje <ChevronUp />
                    </span>) : (<span className="flex flex-row items-center">Pogledaj više <ChevronDown /></span>)}
                </Button>

            </div>
        </>
    )
};

export default OfferFilter;