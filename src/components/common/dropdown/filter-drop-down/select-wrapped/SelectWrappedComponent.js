import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Select from 'react-select';
import {Typography, Chip} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp, Cancel, Clear} from '@material-ui/icons';

import Option from './option/Option';


class SelectWrappedComponent extends Component{
    render(){
        const { classes, ...other } = this.props;
        const { t } = this.context;
        return(
            <Select
                className={"SelectWrappedComponent"}
                classNamePrefix={"SelectWrappedComponent"}
                optionComponent={Option}
                noResultsText={<Typography>{t('dropdown.No results found')}</Typography>}
                arrowRenderer={arrowProps => {
                    return arrowProps.isOpen ? <ArrowDropUp /> : <ArrowDropDown />;
                }}                
                menuPortalTarget={document.getElementById('filter-drop-down-menu-container')}
                clearRenderer={() => <Clear />}
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
                                deleteIcon={<Cancel onTouchEnd={onDelete} />}
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
SelectWrappedComponent.contextTypes = {
    t: PropTypes.func
  }

export default SelectWrappedComponent;