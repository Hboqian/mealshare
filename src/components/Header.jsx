// src/components/Header.jsx
'use client'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import mealshare_logo from '../assets/mealshare_logo.png'
import { Link } from "react-router-dom"

export function Header(){
    return(
        <div className="flex items-center justify-between px-10 py-4">
            <img src={mealshare_logo} alt="logo" width="200px"/>
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-8">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/" className="hover:underline">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/create-event" className="hover:underline">Create Event</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/manage-event" className="hover:underline">Manage Event</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/profile" className="hover:underline">Profile</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
