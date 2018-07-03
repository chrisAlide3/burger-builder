import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './OrderDetail.css';

const orderDetail = (props) => {
    let wrkIngredients = null;
    let wrkCustomer = null;
    let wrkId = null;
    let wrkPrice= null;
    // Setting working fields depending of origin
    // From props when called through orders
    // From props.location.state when called from Push on click in orders
    if (props.location.state) {
        wrkIngredients = props.location.state.ingredients;
        wrkCustomer = props.location.state.customer;
        wrkId = props.location.state.id;
        wrkPrice = props.location.state.price;
    } else {
        wrkIngredients = props.ingredients;
        wrkCustomer = props.customer;
        wrkId = props.id;
        wrkPrice = props.price;
    }

    const ingredients = Object.keys(wrkIngredients)
        .map((igKey) => {
        return igKey + ": " + wrkIngredients[igKey];
    })

    const customer = Object.keys(wrkCustomer)
        .map((custKey) => {
            if (custKey === 'address') {
                return Object.keys(wrkCustomer.address)
                    .map((adrKey) => {
                        return adrKey + ": " + wrkCustomer.address[adrKey];
                    });
            } else {
            return custKey + ": " + wrkCustomer[custKey];
            }
        })
    
    return (
        <div className={classes.OrderDetails}
            onClick={()=>props.clicked(wrkId, wrkIngredients, wrkCustomer, wrkPrice)}
        >
            <label htmlFor="orderId">OrderId: </label>
            <input className={classes.Input} 
                type='text' 
                name='orderId'
                readOnly
                value={wrkId}
            />

            <label htmlFor="ingredients">Ingredients: </label>
            <input className={classes.Input} 
                type='text' 
                name='ingredients'
                readOnly
                value={ingredients}
            />
            <label htmlFor="customer">Customer: </label>
            <input className={classes.Input} 
                type='text' 
                name='customer'
                readOnly
                value={customer}
            />
            <label htmlFor="price">Total price: </label>
            <input className={classes.Input} 
                type='text' 
                name='price'
                readOnly
                value={+wrkPrice.toFixed(2)}
            />
  
        </div>
    );
}

export default withRouter(orderDetail);