import React, { Component } from 'react';
// import axios from 'axios';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0,
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        
        this.setState({ingredients: ingredients});
    }

    checkoutContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        };
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout/contact-data',
            search: '?' + queryString,
        });
    }

    checkoutCancelHandler  = () => {
        this.props.history.goBack();
    }

    
    render (props) {
        
        return (
            <div>
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