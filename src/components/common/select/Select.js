import React, {PureComponent} from 'react';
import {Select as SelectMui} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";
import propTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Select extends PureComponent{

    constructor(props){
        super(props);
        const {attrId} = props;
        this.state ={
            [attrId]:''
        }
    }
    static contextTypes={
        t: propTypes.func
    };
    static propTypes={
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        label: propTypes.string.isRequired,
        attrId: propTypes.string.isRequired,
        attrLabel: propTypes.string.isRequired,
        suggestions:propTypes.arrayOf(propTypes.object).isRequired,
    };

    handleChange = event => {
        let {suggestions, attrId} = this.props;

        this.setState({ [attrId]: event.target.value });

        let filtered = suggestions.find(i=>i[this.props.attrId] === event.target.value);
        this.props.onChange(filtered || 'isEmpty');
    };


    render(){
        const {suggestions, name, id, label, attrId="id", attrLabel="label"} = this.props;
        const {t} = this.context;
        return(
            <div style={{width:'100%'}}>
                {this.props.children}
                <InputLabel>{t(label)}</InputLabel>
                <SelectMui style={{width:'100%'}}
                    value={this.state[attrId]}
                    autoWidth={true}
                    MenuProps={MenuProps}
                    inputProps={{
                        onChange:this.handleChange,
                        name,
                        id,
                    }}
                >
                    <MenuItem value="">
                        <em>{t('None')}</em>
                    </MenuItem>
                    {suggestions.map(m=><MenuItem value={m[attrId]} key={m[attrId]}>{m[attrLabel]}</MenuItem>)}
                </SelectMui>
            </div>
        )
    }
}



export const SelectRF = componentToReduxForm(Select);
export default Select;