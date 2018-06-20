import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    }

changeIngredientHandler = (ingredient, operator) => {
    let newQty = 0;
    if (operator === '+') {
        newQty = this.state.ingredients[ingredient] + 1;
    } else if (this.state.ingredients[ingredient] > 0){
        newQty = this.state.ingredients[ingredient] - 1;
    }

    this.setState(Object.assign(this.state.ingredients, {[ingredient]: newQty}));
}

    render () {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>

                <div>
                    <BuildControls changeIngredient={this.changeIngredientHandler}/>
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder;