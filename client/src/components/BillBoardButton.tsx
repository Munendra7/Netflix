import React from 'react';

import {PlayIcon, InformationCircleIcon} from "@heroicons/react/24/solid";

interface BillBoardButtonProps {
    label: string;
    theme: "light" | "dark";
}

const BillBoardButton: React.FC<BillBoardButtonProps> = ({ label, theme }:BillBoardButtonProps) => {
    return (
        <button className={`${theme==="dark" ? "opacity-60" : null } bg-white rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-centered hover:bg-neutral-400 transition`}>
            {label=="Play"?
                <PlayIcon className={`w-7 ${theme==="dark" ? "text-white": null} mr-1`}/>
                :
                <InformationCircleIcon className={`w-7 ${theme==="dark" ? "text-black": null} mr-1`}/>
                }
            <p className={`${theme==="light" ? "text-black": null}`}>{label}</p>
        </button>
    );
};

export default BillBoardButton;