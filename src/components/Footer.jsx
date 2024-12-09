// src/components/Footer.jsx
import mealshare_logo from '../assets/mealshare_logo.png'
import social_media_icons from '../assets/social_media_icons.webp'

export function Footer(){
    return(
        <footer className="border-t border-border/40 py-6 dark:border-border md:px-3 md:py-0 w-screen">
            <div className="grid grid-cols-4 gap-10 my-6 pb-10 px-10"> 
                <div className="flex flex-col">
                    <img className="mb-3" src={mealshare_logo} alt="logo" width="100px"/>     
                    <img src={social_media_icons} alt="social_media_icons" width="100px"/>     
                </div>
                <div>  
                    <div className="flex flex-col">
                        <p className='font-bold mb-5'>Events</p>
                        <p className='text-xs my-0.5'>Create an Event</p>
                        <p className='text-xs my-0.5'>Manage Events</p>
                        <p className='text-xs my-0.5'>Wireframing</p>
                        <p className='text-xs my-0.5'>Diagramming</p>
                        <p className='text-xs my-0.5'>Brainstorming</p>
                        <p className='text-xs my-0.5'>Online whiteboard</p>
                        <p className='text-xs my-0.5'>Team collaboration</p>
                    </div>
                </div>
                <div>  
                    <div className="flex flex-col">
                        <p className='font-bold mb-5'>Explore</p>
                        <p className='text-xs my-0.5'>Design</p>
                        <p className='text-xs my-0.5'>Prototyping</p>
                        <p className='text-xs my-0.5'>Developing features</p>
                        <p className='text-xs my-0.5'>Design systems</p>
                        <p className='text-xs my-0.5'>Collaboration features</p>
                        <p className='text-xs my-0.5'>Design process</p>
                        <p className='text-xs my-0.5'>Figjam</p>
                    </div>
                </div>
                <div>  
                    <div className="flex flex-col">
                        <p className='font-bold mb-5'>Contact Us</p>
                        <p className='text-xs my-0.5'>contact-us@mealshare.com</p>
                        <p className='text-xs my-0.5'>(+1) 111-222-3344</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
