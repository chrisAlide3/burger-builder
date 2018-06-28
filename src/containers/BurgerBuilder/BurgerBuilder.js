import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Checkout from '../Checkout/Checkout';
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
    ingredients: {},
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    checkout: false,
    loading: false,
    error: false,
};

class BurgerBuilder extends Component {
    state = initialState;

    componentDidMount() {
        this.setState({loading: true});
        axios.get('https://burger-builder-e8d73.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data, loading:false})
        })
        .catch(err => {
            this.setState({error: true, loading:false})
        })
        ;
    }

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

        axios.post('https://burger-builder-e8d73.firebaseio.com/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false, checkout: true});
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false, checkout: false});
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
                {this.state.checkout
                ?<Checkout ingredients={this.state.ingredients} 
                            price={this.state.totalPrice}/>

                :<Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading
                    ? <Spinner />
                    : <OrderSummary ingredients={this.state.ingredients} 
                                    price={this.state.totalPrice}
                                    continue={this.purchaseContinueHandler}
                                    cancel={this.purchaseCancelHandler} 
                        />}
                </Modal>}

                {!this.state.checkout
                ?<div>
                    {this.state.error
                    ?<p style={{textAlign: 'center'}}>There was an error loading the ingredient</p>
                    :<Aux>
                        {this.state.loading
                        ?<Spinner />
                        :<Burger ingredients={this.state.ingredients}/>}
                        
                        <div>
                        <BuildControls 
                            addIngredient={this.addIngredientHandler} 
                            removeIngredient={this.removeIngredientHandler}
                            disabledInfo={disabledInfo}
                            totalPrice={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            purchase={this.purchaseHandler}                    />
                        </div>
                    </Aux>}
                </div>
                :null}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);