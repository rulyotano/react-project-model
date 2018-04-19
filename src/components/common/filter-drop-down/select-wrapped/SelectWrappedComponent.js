import React, {Component} from 'react';
import Select from 'react-select';
import Typography from 'material-ui-next/Typography';
import Chip from 'material-ui-next/Chip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CancelIcon from '@material-ui/icons/Cancel';
import ClearIcon from '@material-ui/icons/Clear';

import Option from './option/Option';


class SelectWrappedComponent extends Component{
    render(){
        const { classes, ...other } = this.props;
        return(
            <Select
                optionComponent={Option}
                noResultsText={<Typography>{'No results found'}</Typography>}
                arrowRenderer={arrowProps => {
                    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
                }}
                clearRenderer={() => <ClearIcon />}
                valueComponent={valueProps => {
                    const { value, children, onRemove } = valueProps;

                    const onDelete = event => {
                        event.preventDefault();
                        event.stopPropagation();
                        onRemove(value);
                    };

                    if (onRemove) {
                        return (
                            <Chip
                                tabIndex={-1}
                                label={children}
                                className={classes.chip}
                                deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                                onDelete={onDelete}
                            />
                        );
                    }

                    return <div className="Select-value">{children}</div>;
                }}
                {...other}
            />
        )
    }
}

export default SelectWrappedComponent;