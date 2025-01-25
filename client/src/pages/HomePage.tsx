import React from 'react';
import NavBar from '../components/NavBar';
import HomeBanner from '../components/HomeBanner';

const HomePage: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <HomeBanner/>
        </div>
    );
};

export default HomePage;