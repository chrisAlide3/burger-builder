import React from 'react';
import MenuImageWhite from '../../../assets/images/icons8-menu-96 _white.png';
import MenuImageBlack from '../../../assets/images/icons8-menu-96.png';

import classes from './MenuButton.css';

const menuButton = (props) => {
    let menuImage = '';
    if (props.color === 'white') {
        menuImage = MenuImageWhite;
    } else {
        menuImage = MenuImageBlack;
    }

    return (
        <div className={classes.MenuButton}>
            <a onClick={props.click}>
                <img src={menuImage} alt='menu button'/>
            </a>
        </div>
    )
}

export default menuButton;