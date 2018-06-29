import React, { Component } from 'react';
// import axios from 'axios';

import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 7.55,
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        
        this.setState({ingredients: ingredients});
    }
    orderSaveHandler = () => {
        // const order = {
        //     ingredients: this.state.ingredients,
        //     customer: {
        //         name: 'Chris B',
        //         email: 'test@test.com',
        //     },
        //     totalPrice: this.state.totalPrice,
        // };

        // axios.post('https://burger-builder-e8d73.firebaseio.com/orders.json', order)
        //     .then(response => {
        //     })
        //     .catch(err => {
        //     })
    }

    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    checkoutCancelHandler  = () => {
        this.props.history.goBack();
    }

    
    render (props) {
        
        return (
            <div className={classes.Checkout}>
                <h1>Your Order:</h1>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    checkoutContinue={this.checkoutContinueHandler}
                    checkoutCancel={this.checkoutCancelHandler}/>
            </div>
        );
    }
}

export default Checkout;