import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data')
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // };
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout/contact-data',
        //     search: '?' + queryString,
        // });
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
                <Route path={this.props.match.url + '/contact-data'}
                    render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />)}
                />
            </div>
        );
    }
}

export default Checkout;