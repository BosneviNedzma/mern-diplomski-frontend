import { useGetStore } from "@/api/StoreApi";
import MenuItem from "@/components/MenuItem";
import StoreInfo from "@/components/StoreInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const { storeId } = useParams();
    const {store, isLoading} = useGetStore(storeId);

    if(isLoading || !store){
        return "Loading...";
    }

    return(
        <div className="flex flex-col gap-10 ">
            <AspectRatio ratio={16/5}>
            <img src={store.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[3fr_2fr] gap-4 max-w-full mx-auto">
                <div className="flex flex-col gap-3 ">
                    <StoreInfo store={store} />
                    <span className="text-2xl font-bold tracking-tight">Ponuda</span>
                    {store.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailPage;