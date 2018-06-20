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

        if (oldCount <= 0) {
            return;
        }
        newCount = oldCount - 1;
        newPrice = oldPrice - priceChange;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredient] = newCount;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }


    render () {
        //Adding boolean true/false when ingredient type has value 0
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>

                <div>
                    <BuildControls 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                    />
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder;