import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StopIcon from '@material-ui/icons/Stop';
import ColorPicker from '../../../pickers/color';

const styles = theme => ({  
  colorContainer:{
    marginBottom: "5px"
  },
  colorsContainer:{
    overflow: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
  colorsButtons: {
    display: "inline-block"
  }
});

export class EditColorTableComponent extends PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  state = {
    size: this.props.size,
    colors: this.props.colors
  }

  onSizeChange(value){
    this.setState({size: value});
    this.props.onChange({colors: this.state.colors, size: value});
  }

  onColorChange(newColor, index){
    const colors = [...this.state.colors];
    colors[index] = newColor;
    this.setState({colors});
    this.props.onChange({colors, size: this.state.size});
  }

  onColorDelete(index){
    const colors = [...this.state.colors.slice(0, index), ...this.state.colors.slice(index+1, this.state.colors.length)];
    this.setState({colors});
    this.props.onChange({colors, size: this.state.size});
  }

  onAddColor(index){
    const colors = [...this.state.colors];
    
    colors.splice(index,0, "black");
    this.setState({colors});
    this.props.onChange({colors, size: this.state.size});
  }

  render() {
    const {t, classes} = this.props;
    const {size, colors = []} = this.state;
    const canAddColors = colors.length < 10;
    const canRemoveColors = colors.length > 2;
    return (
      <div>
        <TextField id="color-picker-label" label={t("Size")} value={size}
          onChange={e=>this.onSizeChange(1*e.target.value)}
          inputProps={{type:"number", style:{width: "100px"}, min: colors.length, max: 20}}/>

        <div className={classes.colorsContainer}>        
          {colors.map((c, i)=> <div className={classes.colorContainer} key={i}>
            <Color color={c} canAddColors={canAddColors} canRemoveColors={canRemoveColors} 
              onChange={newColor=>this.onColorChange(newColor, i)} 
              onDelete={()=>this.onColorDelete(i)}
              onAddColor={()=>this.onAddColor(i)}/>
          </div>)}
        </div>
        
        <Button disabled={!canAddColors} onClick={()=>this.onAddColor(colors.length)}><AddIcon/></Button>
        {/* <br/>
        <Button onClick={()=>onFinishEdit({colors: this.state.colors, size: 1*this.state.size})}><CheckIcon/></Button>
        <Button onClick={()=>onCancelEdit()}><CloseIcon/></Button> */}
      </div>
    );
  }
}

export default withStyles(styles)(EditColorTableComponent);

export class Color extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAddColor: PropTypes.func.isRequired,
    canAddColors: PropTypes.bool.isRequired,
    canRemoveColors: PropTypes.bool.isRequired,
  }

  state = {
    open: false
  }

  onOpen(){
    this.setState({open: true});
  }

  onClose(){
    this.setState({open: false});
  }

  render() {
    const {color, onChange, classes, onDelete, canAddColors, 
      canRemoveColors, onAddColor} = this.props;
    const {open} = this.state;
    return (
      <React.Fragment>
        <div className={classes.colorsButtons}>
          <ColorPicker show={open} color={color}
            onChange={onChange}
            onClose={()=>this.onClose()}>
            <Button variant="outlined" onClick={()=>this.onOpen()}>
              <StopIcon style={{color}}/>
              {/* <div className={classes.color} style={{backgroundColor: color}}></div> */}
            </Button>
          </ColorPicker>            
        </div>
        
        <div className={classes.colorsButtons}>
          <Button disabled={!canRemoveColors} variant="outlined" onClick={onDelete}><DeleteOutlineIcon/></Button>
        </div>

        <div className={classes.colorsButtons}>
          <Button disabled={!canAddColors} onClick={onAddColor}><AddIcon/></Button>
        </div>
      </React.Fragment>
    );
  }
}

Color = withStyles(styles)(Color);
