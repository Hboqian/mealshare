import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    uni: z.string().min(5, {
        message: "UNI must be at least 5 characters."
    }).max(10, {
        message: "UNI must be shorter than 10 characters."
    }),
    password: z.string().min(8,{
        message: "Password must be at least 2 characters."
    }).max(30, {
        message: "Password must be shorter than 30 characters."
    }),
    first: z.string().min(1, {
        message: "First Name must be at least 1 character."
    }).max(50, {
        message: "First Name must be shorter than 50 characters."
    }),
    last: z.string().min(1, {
        message: "Last Name must be at least 1 character."
    }).max(50, {
        message: "Last Name must be shorter than 50 characters."
    }),
})

export function SignupPage(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uni: "",
            password: "",
            first: "",
            last: "",
        },
    })

    function onSubmit(values){
        // Send to backend
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}