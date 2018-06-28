import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div>
            <h1>We hope it tastes well</h1>

            <div styles={{width: '300px', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>

            <Button 
                btnType='Success'
                clicked={props.checkoutContinue}
            >CONTINUE
            </Button>

            <Button 
                btnType='Danger'
                clicked={props.checkoutCancel}
            >CANCEL
            </Button>

        </div>

    );
}

export default checkoutSummary;