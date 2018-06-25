import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

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
    purchasable: false,
    purchasing: false,
    loading: false,
};

class BurgerBuilder extends Component {
    state = initialState;

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            customer: {
                name: 'Chris B',
                email: 'test@test.com',
            },
            totalPrice: this.state.totalPrice,
        };

        axios.post('https://burger-builder-e8d73.firebaseio.com/orders', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false});
            })
        // alert('You continue to the purchasing');
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum + el;
            })
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredient] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceChange = INGREDIENT_PRICES[ingredient];
        const newPrice = oldPrice + priceChange;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
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
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading
                    ? <Spinner />
                    : <OrderSummary ingredients={this.state.ingredients} 
                                    price={this.state.totalPrice}
                                    continue={this.purchaseContinueHandler}
                                    cancel={this.purchaseCancelHandler} 
                        />}
                </Modal>

                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>

                <div>

                    <BuildControls 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}                    />

                </div>

            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);