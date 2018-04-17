import React, {Component} from 'react';
import { MenuItem } from 'material-ui-next/Menu';

class Option extends Component{
    constructor(props){
        super(props);
    }
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render(){
        const { children, isFocused, isSelected, onFocus } = this.props;
        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        )
    }
}

export default Option;