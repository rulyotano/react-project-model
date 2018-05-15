import React, {Component} from 'react';
import {Select as SelectMui} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";


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

class Select extends Component{

    constructor(props){
        super(props);
        const {attrId} = props;
        this.state ={
            [attrId]:''
        }
    }

    handleChange = event => {
        let {suggestions, attrId} = this.props;

        this.setState({ [attrId]: event.target.value });

        let filtered = suggestions.find(i=>i[this.props.attrId] === event.target.value);
        this.props.onChange(filtered);
    };


    render(){
        const {suggestions, attrId, name, id, label} = this.props;
        return(
            <div style={{width:'100%'}}>
                <InputLabel>{label}</InputLabel>
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
                        <em>None</em>
                    </MenuItem>
                    {suggestions.map(m=><MenuItem value={m.id} key={m.id}>{m.desc}</MenuItem>)}
                </SelectMui>
            </div>
        )
    }
}
export const SelectRF = componentToReduxForm(Select);
export default Select;