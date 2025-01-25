import React from 'react';
import { Link } from 'react-router-dom';

const HomeBanner: React.FC = () => {
    return (
        <div className="h-screen w-screen relative">
            <img 
                className="w-full h-full object-cover" 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg" 
                alt="Background" 
            />
            {/* Black overlay */}
            <div className="absolute h-full w-full bg-black opacity-50 top-0 left-0"></div>
            {/* Content */}
            <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white font-bold text-5xl">
                        Unlimited movies, TV shows, and more
                    </h1>
                    <p className="text-white text-3xl mt-3">
                        Watch anywhere, Cancel anytime
                    </p>
                    <div className="mt-8">
                        <Link to="/login" className="bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semibold">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
