import React from 'react';
import burgerLogo from '../../assets/images/127 burger-logo.png';
import classes from './Logo.css';

const logo = () => (

    <div className={classes.Logo}>
        <img alt='myBurgerLogo' src={burgerLogo} />
    </div>

)

export default logo;