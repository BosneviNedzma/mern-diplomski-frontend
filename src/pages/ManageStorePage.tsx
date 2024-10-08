import { useCreateMyStore, useGetMyStore, useGetMyStoreOrders, useUpdateMyStore } from "@/api/MyStoreApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ManageStoreForm from "@/forms/manage-store-form/ManageStoreForm";
import OrderItemCard from "@/components/OrderItemCard";

const ManageStorePage = () => {
    const { createStore, isLoading: isCreateLoading } = useCreateMyStore();
    const { store } = useGetMyStore();
    const { updateStore, isLoading: isUpdateLoading } = useUpdateMyStore();
    const { orders } = useGetMyStoreOrders();

    const isEditing = !!store;

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders" >Narudžbe</TabsTrigger>
                <TabsTrigger value="manage-store" >Upravljaj eProdavnicom</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length}: aktivnih narudžbi </h2>
                {orders?.map((order) => (
                    <OrderItemCard key={order._id} order={order} />
                ))}
            </TabsContent>
            <TabsContent value="manage-store">
                <ManageStoreForm store={store}
                    onSave={isEditing ? updateStore : createStore}
                    isLoading={isCreateLoading || isUpdateLoading} />
            </TabsContent>
        </Tabs>
    )
};

export default ManageStorePage;