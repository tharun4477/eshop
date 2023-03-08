import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/node/ToggleButtonGroup/ToggleButtonGroup';
import "./product-category-tabs.css";

const ProductCategoryTabs=React.memo((props)=> {
    return (
         <ToggleButtonGroup
            value={props.categorySelect}
            exclusive
            onChange={props.handleCategorySelect}           
            className="product-page-category-tabs"
        >
            <ToggleButton value="all" name="category"  >
                ALL
            </ToggleButton>
            <ToggleButton value="apparel" name="category" >
                APPAREL
            </ToggleButton>
            <ToggleButton value="footwear" name="category">
                FOOTWEAR
            </ToggleButton>
            <ToggleButton value="electronics" name="category">
                ELECTRONICS
            </ToggleButton>
            <ToggleButton value="personalcare" name="category">
                PERSONAL CARE
            </ToggleButton>
        </ToggleButtonGroup>
        
    );
});

export default ProductCategoryTabs;