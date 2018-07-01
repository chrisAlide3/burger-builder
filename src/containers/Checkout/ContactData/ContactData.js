import React, { Component } from 'react';
import axios from 'axios';

import classes from './ContactData.css';
import Button from '../../../components//UI/Button/Button';

class ContactData extends Component {
    state = {
        ingredients: {},

        name: '',
        email: '',
        street: '',
        postcode: '',
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        
        this.setState({ingredients: ingredients});
    }


    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    orderBtnHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            customer: {
                name: this.state.name,
                email:this.state.email,
                address: {
                    street: this.state.street,
                    postcode: this.state.postcode,
                },
            },
            // totalPrice: this.state.totalPrice,
        };

        axios.post('https://burger-builder-e8d73.firebaseio.com/orders.json', order)
            .then(response => {
                this.props.history.push("/");
            })
            .catch(err => {
                console.log('There was an error: ', err);
            })
    }

    render (props) {

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact data</h4>
            <div>
                <input className={classes.Input} 
                    type='text' 
                    name='name' 
                    placeholder='Your name'
                    autoFocus
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                />
                    
                <input className={classes.Input} 
                    type='email' 
                    name='email' 
                    placeholder='Your email'
                    value={this.state.email}
                    onChange={this.inputChangeHandler}
                />
                <input className={classes.Input} 
                    type='text' 
                    name='street' 
                    placeholder='Street'
                    value={this.state.street}
                    onChange={this.inputChangeHandler}
                />
                <input className={classes.Input} 
                    type='text' 
                    name='postcode' 
                    placeholder='Postal Code'
                    value={this.state.postcode}
                    onChange={this.inputChangeHandler}
                />
                <Button btnType='Success'
                    clicked={this.orderBtnHandler} 
                >ORDER
                </Button>
            </div>
        </div>
    );
}}

export default ContactData;