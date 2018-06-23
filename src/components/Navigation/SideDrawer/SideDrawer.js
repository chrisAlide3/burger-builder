import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import MenuButton from '../MenuButton/MenuButton';

const sideDrawer = (props) => {
    let displayClasses = [];
    if (props.show) {
        displayClasses = [classes.SideDrawer, classes.Open];
    } else {
        displayClasses = [classes.SideDrawer, classes.Close];
    }

    return (
        <div className={displayClasses.join(' ')}>
            <div className={classes.MenuButton}>
                <MenuButton 
                    color='black'
                    click={props.sideDrawerHandler}/>
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav>
                 <NavigationItems/>
            </nav>
        </div>
    )
}

export default sideDrawer;