import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    // Transform received object into an array
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingKey) => {
            return [...Array(props.ingredients[ingKey])]
        .map((_, idx) => {
           return <BurgerIngredient key={ingKey + idx} type={ingKey} />
        })
        })
        //Flaten the received array for check array length
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start to add ingredients</p>;
    }

    return (
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/>
                {transformedIngredients}
                <BurgerIngredient type='bread-bottom'/>
            </div>
    );
};

export default burger;