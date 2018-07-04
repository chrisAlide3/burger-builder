import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import { Route } from 'react-router-dom';

import OrderDetail from '../../components/Order/OrderDetail/OrderDetail';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        loading: true,
        error: false,
        orders: [],
    }

    componentDidMount () {
        axios.get('https://burger-builder-e8d73.firebaseio.com/orders.json')
        .then(res => {
            //Transform Object to an array with For..In loop
            let orderArray = [];
            for (let key in res.data) {
                orderArray.push({
                    ...res.data[key],
                    id: key,
                });
            }

            this.setState({orders: orderArray, loading: false});
        })
        .catch(err => {
            this.setState({error: true, loading:false})
        })
        ;
    }

    orderClickHandler = (id, ingredients, customer, price) => {
        this.props.history.push({
            pathname: this.props.match.url + "/" + id,
            state: {
                id: id,
                ingredients: ingredients,
                customer: customer,
                price: price,
            }})
    }

    render () {

        let order = (<p><strong>No orders have been placed!</strong></p>);

        if (this.state.loading) {
            order = (<Spinner />)
        } else {

        if (this.state.orders.length) {
            order = this.state.orders.map((order) => {
                    return (
                        <li key={order.id}>
                            <OrderDetail
                                id={order.id} 
                                ingredients={order.ingredients}
                                customer={order.customer}
                                price={order.totalPrice}
                                clicked={this.orderClickHandler}
                            />
                        </li>
                    )
            })
        }}

        return (
            <Aux>
                <div>
                    <ul style={{listStyle: 'none'}}>
                        {order}
                    </ul>
                </div>
                <div>
                    <hr />
                    <Route path={this.props.match.url + "/:id"} exact
                        render={()=> {
                            return <OrderDetail 
                                clicked={this.orderClickHandler}
                            />
                        }} />
                </div>
            </Aux>
        );
    }
}
export default withErrorHandler(Orders, axios);