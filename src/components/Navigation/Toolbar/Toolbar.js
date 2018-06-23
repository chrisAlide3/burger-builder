import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../MenuButton/MenuButton';

const toolbar = (props) => {

    const menuClasses = [classes.Menu, classes.MobileOnly]

    return ( 
        <header className={classes.Toolbar}>
            <div className={menuClasses.join(' ')}>
                <MenuButton 
                    color='white'
                    click={props.show}/>
            </div>

            <div className={classes.Logo}>
                <Logo />
            </div>
            
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar;