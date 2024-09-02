import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import OfferSection from "./OfferSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    storeName: z.string({
        required_error: "Naziv prodavnice je obavezan.",
    }),
    city: z.string({
        required_error: "Naziv grada je obavezan.",
    }),
    country: z.string({
        required_error: "Naziv države je obavezan.",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Cijena dostave je obavezna.",
        invalid_type_error: "Mora biti validan broj."
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Očekivano vrijeme dostave je obavezno.",
        invalid_type_error: "Mora biti validan broj."
    }),
    offers: z.array(z.string()).nonempty({
        message: "Molimo označite barem jedan proizvod.",
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Ime je obavezno."),
        price: z.coerce.number().min(1, "Cijena je obavezna,"),
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {
        message: "Slika je obavezna."
    }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Mora biti priložena ili slika ili dokument slike.",
    path: ["imageFile"],
} )

type StoreFormData = z.infer<typeof formSchema>

type Props = {
    store?: Store;
    onSave: (storeFormData: FormData) => void;
    isLoading: boolean;
}

const ManageStoreForm = ({ onSave, isLoading, store }: Props) => {
    const form = useForm<StoreFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            offers: [],
            menuItems: [{ name: "", price: 0 }],

        }
    });

    useEffect(() => {
        if (!store) {
            return;
        }
        const deliveryPriceFormatted = parseInt((store.deliveryPrice / 100).toFixed(2));
        const menuItemsFormatted = store.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2))
        }));

        const updatedStore = {
            ...store,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        };

        form.reset(updatedStore);
    }, [form, store]);

    const onSubmit = (formDataJson: StoreFormData) => {
        const formData = new FormData();

        formData.append("storeName", formDataJson.storeName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", (formDataJson.estimatedDeliveryTime * 100).toString());
        formDataJson.offers.forEach((offer, index) => {
            formData.append(`offers[${index}]`, offer);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        });

        if(formDataJson.imageFile){
            formData.append(`imageFile`, formDataJson.imageFile);
        }
    
        console.log("Form Data:", formData);
        onSave(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <OfferSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Pošalji podatke</Button>}
            </form>
        </Form>
    )
}

export default ManageStoreForm;