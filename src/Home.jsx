import React from 'react';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';

const Home = ({ onLogout }) => {
    return(
    <>
    <Sidebar />
    <Main onLogout={onLogout} />
    </>
    );
};

export default Home;
