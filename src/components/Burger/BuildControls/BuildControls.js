import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
];

const buildControls = (props) => (
    
            <div className={classes.BuildControls}>
                <p>Total price of your order: <strong>{(Math.round(props.totalPrice * 100)/100).toFixed(2)}US$</strong></p>

                {controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        ingredientLabel={ctrl.label} 
                        ingredientType={ctrl.type} 
                        addIngredient={props.addIngredient} 
                        removeIngredient={props.removeIngredient}
                        disabledInfo={props.disabledInfo[ctrl.type]}
                    />
                ))}
                <button className={classes.Button}
                        disabled={!props.purchasable}
                        // onClick={}
                    >ORDER NOW!
                </button>
            </div>
);

export default buildControls;