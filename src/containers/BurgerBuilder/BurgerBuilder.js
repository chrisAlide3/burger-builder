import React, {Component} from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.9,
    meat: 1.6,
};

const initialState = {
    // ingredients: {},
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    goCheckout: false,
    loading: false,
    error: false,
};

class BurgerBuilder extends Component {
    state = initialState;

    // componentDidMount() {
    //     this.setState({loading: true});
    //     axios.get('https://burger-builder-e8d73.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ingredients: response.data, loading:false})
    //     })
    //     .catch(err => {
    //         this.setState({error: true, loading:false})
    //     })
    //     ;
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // Pass the ingredients object as Querystring in the push method
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        };
        queryParams.push('price=' + this.state.totalPrice);
        
        const queryString = queryParams.join('&');
    
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
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
            ...this.props.ings,
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
                    : <OrderSummary ingredients={this.props.ings} 
                                    price={this.state.totalPrice}
                                    continue={this.purchaseContinueHandler}
                                    cancel={this.purchaseCancelHandler} 
                        />}
                </Modal>

                <div>
                    {this.state.error
                    ?<p style={{textAlign: 'center'}}>There was an error loading the ingredient</p>
                    :<Aux>
                        {this.state.loading
                        ?<Spinner />
                        :<Burger ingredients={this.props.ings}/>}
                        
                        <div>
                        <BuildControls 
                            addIngredient={this.props.onAddIngredient} 
                            removeIngredient={this.props.onRemoveIngredient}
                            disabledInfo={disabledInfo}
                            totalPrice={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            purchase={this.purchaseHandler}                    />
                        </div>
                    </Aux>}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
        onRemoveIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient}),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));