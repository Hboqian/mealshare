// src/components/Header.jsx
'use client'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import mealshare_logo from '../assets/mealshare_logo.png'
import { Link, NavLink, useLocation } from "react-router-dom"

function checkPath(curPath){
    const location = useLocation()
    const path = location.pathname

    if (path === curPath){
        return "underline hover:underline"
    }
    return "hover:underline"
}

export function Header(){  

    return(
        <div className="flex items-center justify-between px-10 py-4">
            <img src={mealshare_logo} alt="logo" width="200px"/>
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-8">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <NavLink to="/" className={checkPath("/")}>Home</NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/create-event" className={checkPath("/create-event")}>Create Event</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/manage-event" className={checkPath("/manage-event")}>Manage Event</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/profile" className={checkPath("/profile")}>Profile</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
