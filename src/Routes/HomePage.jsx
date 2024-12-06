import { 
    MealsharePagination,
    Header,
    Footer,
} from "../components"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ferris_photo from '../assets/ferris.jpg'
import guy_1 from '../assets/guy_1.jpeg'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function HomePage(){
    return(
        <>
            <Header/>
            <Separator/>
            <div className="grid grid-cols-3 gap-10 mx-10 my-10">
                <div className="...">
                    <div className="flex flex-col border border-slate-300 dark:border-white-50 px-2 py-2">
                        <div className="text-2xl pb-4"> Dining Halls</div>
                        <div className='flex items-center space-x-2 my-1'>
                            <Checkbox id='jjh'>                            
                            <label
                                htmlFor="jjh"
                                className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            </label>
                            </Checkbox>
                            <div className="pl-2">
                                John Jay Dining Hall
                            </div>
                        </div>
                        <div className='flex items-center space-x-2 my-1'>
                            <Checkbox id='ferris'>                            
                            <label
                                htmlFor="ferris"
                                className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            </label>
                            </Checkbox>
                            <div className="pl-2">
                                Ferris Dining Hall
                            </div>
                        </div>
                        <div className='flex items-center space-x-2 my-1'>
                            <Checkbox id='mike'>                            
                            <label
                                htmlFor="mike"
                                className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            </label>
                            </Checkbox>
                            <div className="pl-2">
                                Chef Mike's Sub Shop
                            </div>
                        </div>
                        <div className='flex items-center space-x-2 my-1'>
                            <Checkbox id='don'>                            
                            <label
                                htmlFor="don"
                                className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            </label>
                            </Checkbox>
                            <div className="pl-2">
                                Chef Don's Pizza Pi
                            </div>
                        </div>
                        <div className='flex items-center space-x-2 my-1'>
                            <Checkbox id='jjp'>                            
                            <label
                                htmlFor="jjp"
                                className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            </label>
                            </Checkbox>
                            <div className="pl-2">
                                JJ's Place
                            </div>
                        </div>
                        <div className="text-2xl pb-4"> Event Details</div>
                        More to come...
                    </div>
                </div>
                <div className="col-span-2">  
                    <div className="flex flex-col">
                    <span className="flex inline">
                        <form className="dark:rounded-md mr-5 grow">
                            <div className="">
                                <div className="relative w-full dark:rounded-md">
                                    <input type="search" id="search-dropdown" className="p-2.5 z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:rounded-md dark:border-gray-50 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by host" required />
                                    <button type="submit" className="absolute top-0 end-0 p-2.5 rounded-md dark:rounded text-sm font-medium h-full text-white bg-white rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <Button className="mx-2 ml-5 w-22 h-8 my-auto" size="sm">
                            Newest
                        </Button>
                        <Button className="mx-1 w-22 h-8 my-auto" size="sm">
                            Oldest
                        </Button>
                    </span>
                        <div>
                        <Card className="my-5">
                            <img src={ferris_photo} className="mx-5 mt-5 justify-center items-center" alt="ferris_photo" width="200px"/>
                            <CardContent>
                                <p>Ferris Dining Hall</p>
                                <p>Sunday, October 6th at 2:00PM</p>
                                <span className="flex">
                                    <p className="font-bold grow inline-flex">1 Spot(s) Taken, 1 Remaining</p>
                                    <Avatar className='inline-flex'>
                                        <AvatarImage src={guy_1} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="mx-3">
                                        <p>
                                            Eric
                                        </p>
                                        <p className="font-light font-thin">
                                            Host
                                        </p>
                                    </div>
                                </span>
                            </CardContent>
                            <CardFooter>
                                <Button className='w-full'>
                                    Join
                                </Button>
                            </CardFooter>
                        </Card>

                        </div>
                    </div>
                </div>
            </div>
            <MealsharePagination/>
            <Footer/>
        </>
        
    )
}
