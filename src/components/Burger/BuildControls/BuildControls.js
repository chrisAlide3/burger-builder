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
                {controls.map(ctrl => (
                    <BuildControl key={ctrl.label} ingredientLabel={ctrl.label} ingredientType={ctrl.type} addIngredient={props.addIngredient} removeIngredient={props.removeIngredient}/>
                ))}
            </div>
);

export default buildControls;