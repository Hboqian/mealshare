"use client"
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
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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

// const formSchema = z.object({
//     uni: z.string().min(5, {
//         message: "UNI must be at least 5 characters."
//     }).max(10, {
//         message: "UNI must be shorter than 10 characters."
//     }),
//     password: z.string().min(8,{
//         message: "Password must be at least 2 characters."
//     }).max(30, {
//         message: "Password must be shorter than 30 characters."
//     }),
// })

// export function LoginPage(){
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             uni: "",
//             password: "",
//         },
//     })

//     function handleSubmit(values){
//         // Send to backend
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={handleSubmit} className="space-y-8">
//                 <FormField
//                 control={form.control}
//                 name="uni"
//                 render={({ field }) => (
//                     <FormItem>
//                     <FormLabel>UNI</FormLabel>
//                     <FormControl>
//                         <Input placeholder="ab1234" {...field} />
//                     </FormControl>
//                     <FormDescription>
//                         This is your Columbia UNI.
//                     </FormDescription>
//                     <FormMessage />
//                     </FormItem>
//                 )}
//                 />
//                 <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                     <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                         <Input placeholder="12345678" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                     </FormItem>
//                 )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }

