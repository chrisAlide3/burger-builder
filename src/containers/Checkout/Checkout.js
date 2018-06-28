import React, { Component } from 'react';
import axios from 'axios';

import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        checkout: false,
        loading: false,
        ordered: false,
    }

    orderSaveHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            customer: {
                name: 'Chris B',
                email: 'test@test.com',
            },
            totalPrice: this.props.totalPrice,
        };

        axios.post('https://burger-builder-e8d73.firebaseio.com/orders.json', order)
            .then(response => {
                this.setState({loading: false, ordered: true});
            })
            .catch(err => {
                this.setState({loading: false, ordered: false});
            })
    }

    checkoutContinueHandler = () => {
        this.setState({checkout: true});
    }

    
    render (props) {

        // const ingredients = Object.keys(this.props.ingredients)
        //     .map(igKey => {
        //         return (
        //             <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>
        //         );
        //     });

        return (
            <div className={classes.Checkout}>
                <h1>Your Order:</h1>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    checkoutContinue={this.checkoutContinueHandler}
                    checkoutCancel={this.props.purchaseCancel}/>
            </div>
        );
    }
}

export default Checkout;