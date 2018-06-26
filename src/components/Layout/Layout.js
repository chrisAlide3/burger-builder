import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerHandler = () => {
        this.setState((oldState) => {
            return {showSideDrawer: !oldState.showSideDrawer}
        });
    }

    render () {

    return (
        <Aux>
            <Toolbar show={this.sideDrawerHandler}/>

            {this.state.showSideDrawer
            ? <SideDrawer 
                show={this.state.showSideDrawer}
                sideDrawerHandler={this.sideDrawerHandler}/>
            : null
            }
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    );
    }
}

export default Layout;
