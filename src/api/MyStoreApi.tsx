import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Order, Store } from "@/types";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyStore = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyStoreRequest = async (): Promise<Store> => {
        const accessToken = await getAccessTokenSilently();

        console.log('API Base URL:', API_BASE_URL);
        console.log('Access Token:', accessToken);

        const response = await fetch(`${API_BASE_URL}/api/my/store`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Greška pri dohvaćanju prodavnice.");
        }

        return response.json();
    };

    const { data: store, isLoading } = useQuery("fetchMyStore", getMyStoreRequest);

    return { store, isLoading }
}

export const useCreateMyStore = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyStoreRequest = async (storeFormData: FormData): Promise<Store> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/store`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: storeFormData,
        });

        if (!response.ok) {
            throw new Error("Greška pri kreiranju prodavnice.");
        }

        return response.json();
    };

    const {
        mutate: createStore, isLoading, isSuccess, error
    } = useMutation(createMyStoreRequest);

    if (isSuccess) {
        toast.success("Prodavnica kreirana.");
    }

    if (error) {
        toast.error("Nije moguće ažurirati prodavnicu.");
    }

    return {
        createStore, isLoading
    }
};

export const useUpdateMyStore = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateStoreRequest = async (storeFormData: FormData): Promise<Store> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/store`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: storeFormData,
        });
        if (!response) {
            throw new Error("Greška pri ažuriranju prodavnice.");
        }

        return response.json();

    };

    const { mutate: updateStore, isLoading, error, isSuccess } = useMutation(updateStoreRequest);

    if (isSuccess) {
        toast.success("Prodavnica ažurirana.");
    }

    if (error) {
        toast.error("Nije moguće ažurirati prodavnicu.");
    }

    return {
        updateStore, isLoading
    }
};

export const useGetMyStoreOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyStoreOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/store/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Greška pri dohvaćanju narudžbe.");
        }

        return response.json();
    };

    const { data: orders, isLoading } = useQuery("fetchMyStoreOrders", getMyStoreOrdersRequest);

    return { orders, isLoading };
}

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}

export const useUpdateMyStoreOrder = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyStoreOrder = async (
        updateStatusOrderRequest: UpdateOrderStatusRequest
    ) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(
            `${API_BASE_URL}/api/my/store/order/${updateStatusOrderRequest.orderId}/status`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: updateStatusOrderRequest.status }),
            }
        );

        if (!response.ok) {
            throw new Error("Greška pri ažuriranju stanja.");
        }

        return response.json();
    };

    const {
        mutateAsync: updateStoreStatus,
        isLoading,
        isError,
        isSuccess,
        reset,
    } = useMutation(updateMyStoreOrder);

    if (isSuccess) {
        toast.success("Narudžba ažurirana.");
    }

    if (isError) {
        toast.error("Nije moguće ažurirati narudžbu.");
        reset();
    }

    return { updateStoreStatus, isLoading };
};

