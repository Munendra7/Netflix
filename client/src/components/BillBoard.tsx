import React from 'react';
import BillboardVideo from '../assets/videoplayback.mp4';
import BillBoardButton from './BillBoardButton';

const BillBoard: React.FC = () => {
    return (
        <div className="relative h-screen">
            <video 
                className="w-full h-full object-cover brightness-[60%] transition duration-500" 
                autoPlay muted loop
                src={BillboardVideo}
            />
        
            <div className="absolute top-[40%] ml-16">
                <p className="text-white mt-8 mb-5 drop-shardow-x text-7xl">Netflix</p>
                <div className="flex items-center mt-4 gap-3">
                    <BillBoardButton label="Play" theme="light"/>
                    <BillBoardButton label="More Info" theme="dark"/>
                </div>
            </div>
        </div>
    );
}

export default BillBoard;