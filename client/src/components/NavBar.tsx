import { useEffect } from "react";
import NetflixLog from "../assets/netflix-3.svg";
import React from "react";

const tabs = ["Home", "Series", "Films", "New & Popular", "My List", "Browse by Languages"];

const NavBar:React.FC = () => {

    const [showBackground, setShowBackground] = React.useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => { 
            if(window.scrollY > 700)
            {
                setShowBackground(true);
            }
            else
            {
                setShowBackground(false);
            }
        });
    },[]);

    return(
        <nav className="w-full fixed z-40">
            <div className={`flex items-center px-16 py-6 ${showBackground?`bg-black bg-opacity-70`:null}`} >
                <img  
                    className="h-8"
                    src={NetflixLog}
                    alt="logo"
                />
                <div className="flex gap-7 ml-8">
                    {tabs.map(tab => (
                        <div key={tab} className="text-white hover:text-gray-300 cursor-pointer">{tab}</div>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
