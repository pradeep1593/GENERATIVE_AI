import React from 'react';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';

const Home = ({ username, onLogout }) => {
    return(
    <>
    <Sidebar />
    <Main onLogout={onLogout} />
    </>
    );
};

export default Home;
