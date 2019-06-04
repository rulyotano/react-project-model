import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select,
  withStyles } from "@material-ui/core";
import Variable from '../../../../../service/maps/variables/vars/Variable';

const styles = (theme)=>({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class VariableDropDownComponent extends PureComponent {
    static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      value: PropTypes.any,
      onChange: PropTypes.func.isRequired,
      variables: PropTypes.array.isRequired
    }

    varMapping = {}

    componentWillMount(){
      this.createVariablesMap();
    }

    componentWillReceiveProps(nextProp){
      if (nextProp.variables && this.props.variables !== nextProp.variables){
        this.createVariablesMap();
      }
    }

    createVariablesMap(){
      const {variables} = this.props;
      if (variables)
      {
        this.varMapping = {};
        const keyObj = { key: 0 };
        const count = variables.length;
        for (let i = 0; i < count; i++) {
          const item = variables[i];                
          this._createVariablesMap(item, keyObj);                
        }
      }
    }

    _createVariablesMap(item){
      if (item instanceof Variable){
        this.varMapping[item.id] = item;
        return;
      }
      const count = item.variables.length;
      for (let i = 0; i < count; i++) {
        const childItem = item.variables[i];
        this._createVariablesMap(childItem);
      }
    }

    renderNodeItem(item){
      if (item instanceof Variable)
        return <option key={item.name} value={item.id}>{item.name}</option>;
      return <optgroup key={item.title} label={item.title}>
        {item.variables.map(item=>this.renderNodeItem(item))}
      </optgroup>;
    }

    render() {
      const {classes, id, value, onChange, label="", variables} = this.props;
      return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={`variable-select-${id}`}>{label}</InputLabel>
          <Select native
            value={value ? value.id : ""}
            onChange={ (e)=>onChange(e.target.value && this.varMapping[e.target.value]) }
            inputProps={{
              name: id,
              id,
            }}>

            <option value="" />
            {variables.map(item=>this.renderNodeItem(item))}
          </Select>
        </FormControl>
      );
    }
}

export default withStyles(styles)(VariableDropDownComponent);
