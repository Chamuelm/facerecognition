import React from 'react';
import Logo from './../Logo/Logo';

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
            <p><Logo /></p>
            <p className='f3 link dim underline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation;