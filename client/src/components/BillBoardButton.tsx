import React from 'react';

import {PlayIcon} from "@heroicons/react/24/solid";

interface BillBoardButtonProps {
    label: string;
    theme: "light" | "dark";
}

const BillBoardButton: React.FC<BillBoardButtonProps> = ({ label, theme }:BillBoardButtonProps) => {
    return (
        <button className={`${theme==="dark" ? "bg-opacty-30" : null } bg-white rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-centered hover:bg-neutral-400 transition`}>
            <PlayIcon className={`w-7 ${theme==="dark" ? "text-white": null} mr-1`}/>
            <p className={`${theme==="light" ? "text-black": null}`}>{label}</p>
        </button>
    );
};

export default BillBoardButton;