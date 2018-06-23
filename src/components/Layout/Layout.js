import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

class Layout extends Component {
    state = {
        showBackdrop: false,
        showSideDrawer: false,
    }

    backdropShowHandler = () => {
        const oldState = this.state.showBackdrop;
        this.setState({showBackdrop: !oldState, showSideDrawer: !oldState})
    }

    sideDrawerHandler = () => {
        const oldState = this.state.showSideDrawer;        
        this.setState({showSideDrawer: !oldState, showBackdrop: !oldState});
    }

    render () {

    return (
        <Aux>
            <Backdrop 
                show={this.state.showBackdrop}
                clicked={this.backdropShowHandler}
            />
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
