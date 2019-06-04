import React from 'react';
import mapError from './mapError';

export default (TextField) => (props) =>{
  const{ input, floatingLabelText,
    inputStyle, floatingLabelStyle, hintStyle, ...rest} = props;
  return <TextField {...input}
    onChange={input.onChange}
    name={input.name}
    label={floatingLabelText}
    InputProps={ {style:inputStyle} }
    InputLabelProps={ {style:floatingLabelStyle} }
    FormHelperTextProps={{style:hintStyle}}
    {...mapError(rest, "error")}/>;
};