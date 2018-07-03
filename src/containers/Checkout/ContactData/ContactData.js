import React, { Component } from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';

import classes from './ContactData.css';
import Button from '../../../components//UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        loading: false,

        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    autoFocus: true,
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
            },
        }
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        
        const updatedFormElements = {...updatedOrderForm[inputId]};
        
        updatedFormElements.value = event.target.value;
        updatedOrderForm[inputId] = updatedFormElements;

        this.setState({orderForm: updatedOrderForm});
    }

    orderBtnHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const orderFormFields = {...this.state.orderForm};
        let customer = {};
        for (let field in orderFormFields) {
            customer[field] = orderFormFields[field].value; 
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: customer,
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

        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }

        let form = (
            <form>
                {formElementArray.map((formElement) => {
                    return (
                        <Input
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event, formElement.id)}
                        />
                    );
                })}

                {/* <Input
                    inputtype='input' 
                    type='text' 
                    name='name' 
                    placeholder='Your name'
                    autoFocus
                    value={this.state.name}
                    onChange={this.inputChangeHandler} 
                />

                    
                <Input
                    inputtype='input' 
                    type='email' 
                    name='email' 
                    placeholder='Your email'
                    value={this.state.email}
                    onChange={this.inputChangeHandler}
                />
                <Input
                    inputtype='input' 
                    type='text' 
                    name='street' 
                    placeholder='Street'
                    value={this.state.street}
                    onChange={this.inputChangeHandler}
                />
                <Input
                    inputtype='input' 
                    type='text' 
                    name='postcode' 
                    placeholder='Postal Code'
                    value={this.state.postcode}
                    onChange={this.inputChangeHandler}
                /> */}

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