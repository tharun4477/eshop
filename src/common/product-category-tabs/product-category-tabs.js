import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/node/ToggleButtonGroup/ToggleButtonGroup';
import "./product-category-tabs.css";

// This is a functional component called 'ProductCategoryTabs' that renders a group of toggle buttons
const ProductCategoryTabs = React.memo((props) => {
    return (
        <ToggleButtonGroup
            value={props.categorySelect}
            exclusive
            onChange={props.handleCategorySelect}
            className="product-page-category-tabs"
        >

            {props.category.map((category) =>

                < ToggleButton value={category.value} >
                    {category.label}
                </ToggleButton>

            )}
        </ToggleButtonGroup >

    );
});

export default ProductCategoryTabs;