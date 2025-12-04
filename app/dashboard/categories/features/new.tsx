"use client"
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    toast
} from "sonner"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/components/ui/field"
import {
    Button
} from "@/components/ui/button"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string()
});

export const New = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }
    return
    <SheetContent>
        <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
        </SheetHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Field>
                    <FieldLabel htmlFor="name">Username</FieldLabel>
                    <Input
                        id="name"
                        placeholder="shadcn"

                        {...form.register("name")}
                    />
                    <FieldDescription>This is your public display name.</FieldDescription>
                    <FieldError>{form.formState.errors.name?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Bio</FieldLabel>
                    <Textarea
                        id="description"
                        placeholder="Placeholder"

                        {...form.register("description")}
                    />
                    <FieldDescription>You can @mention other users and organizations.</FieldDescription>
                    <FieldError>{form.formState.errors.description?.message}</FieldError>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </SheetContent>
        ;
};