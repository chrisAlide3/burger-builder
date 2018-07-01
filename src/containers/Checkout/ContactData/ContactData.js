import React, { Component } from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';

import classes from './ContactData.css';
import Button from '../../../components//UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        loading: false,

        name: '',
        email: '',
        street: '',
        postcode: '',
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    orderBtnHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: this.state.name,
                email:this.state.email,
                address: {
                    street: this.state.street,
                    postcode: this.state.postcode,
                },
            },
        };

        axios.post('https://burger-builder-e8d73.firebaseio.com/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({loading: true});
                console.log('There was an error: ', err);
            })
    }

    render () {

        let form = (
            <form>
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
            </form>
        );

        if (this.state.loading) {
            form = (<Spinner />);
        }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact data</h4>
            {form}
        </div>
    );
}}

export default withRouter(ContactData);