import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.9,
    meat: 1.6,
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
};

class BurgerBuilder extends Component {
    state = initialState;

    addIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredient] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceChange = INGREDIENT_PRICES[ingredient];
        const newPrice = oldPrice + priceChange;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    removeIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        let newCount = null;

        const oldPrice = this.state.totalPrice;
        const priceChange = INGREDIENT_PRICES[ingredient];
        let newPrice = null;

        if (oldCount > 0) {
            newCount = oldCount - 1;
            newPrice = oldPrice - priceChange;
        } else {
            newCount = oldCount;
            newPrice = oldPrice;
        }

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredient] = newCount;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }


    render () {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                    <p>Total price of your order: {(Math.round(this.state.totalPrice * 100)/100).toFixed(2)} US$</p>
                </div>

                <div>
                    <BuildControls addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}/>
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder;