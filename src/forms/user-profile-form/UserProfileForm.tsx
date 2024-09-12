import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { User } from "@/types";
import { z } from "zod";

import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Ime je obavezno."),
    addressLine1: z.string().min(1, "Adresa je obavezna."),
    city: z.string().min(1, "Grad je obavezan."),
    country: z.string().min(1, "Država je obavezna."),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
};

const UserProfileForm = ({ onSave, isLoading, currentUser, title = "Korisnički profil", buttonText = "Spremi" }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div className="">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>Pogledaj i promijeni podatke ovdje</FormDescription>
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email: </FormLabel>
                        <FormControl>
                            <Input {...field} disabled className="bg-white" />
                        </FormControl>
                    </FormItem>
                )} />


                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ime: </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="addressLine1" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Adresa: </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Grad: </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Država: </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                {
                    isLoading ? (<LoadingButton />) : (
                        <Button type="submit" className="bg-green-500">{buttonText}</Button>
                    )
                }

            </form>
        </Form>
    )
};

export default UserProfileForm;