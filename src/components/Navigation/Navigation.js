import React from 'react';
import Logo from './../Logo/Logo';

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}} className='mt3'>
            <Logo />
            <p className='f3 link dim underline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation;