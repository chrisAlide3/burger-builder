import React, { Component } from 'react';

class Checkout extends Component {

    
    render (props) {

        const ingredients = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>
                );
            });

        return (
            <div>
                <h1>Your Order:</h1>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total price: {this.props.price}</strong></p>
            </div>
        );
    }
}

export default Checkout;