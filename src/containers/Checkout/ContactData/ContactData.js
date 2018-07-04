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
        formIsValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    autoFocus: true,
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
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
                validation: {},
                valid: true,
                touched: false,
            },
        },
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        
        const updatedFormElements = {...updatedOrderForm[inputId]};
        
        updatedFormElements.value = event.target.value;

        updatedFormElements.valid = this.checkValidity(updatedFormElements.value, updatedFormElements.validation);
        updatedFormElements.touched = true;

        let formIsValid = true;
        for (let field in updatedOrderForm) {
            formIsValid = updatedOrderForm[field].valid && formIsValid;
        }
        
        updatedOrderForm[inputId] = updatedFormElements;


        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        
        const formData = {};
        for (let field in this.state.orderForm) {
         formData[field] = this.state.orderForm[field].value; 
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: formData,
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
            <form onSubmit={this.orderSubmitHandler}>
                {formElementArray.map((formElement) => {
                    return (
                        <Input
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event, formElement.id)}
                        />
                    );
                })}

                <Button btnType='Success' disabled={!this.state.formIsValid}
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