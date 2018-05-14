import React from 'react'
import mapError from './mapError'

export default (Component) => (props) =>{
    const{ input, floatingLabelText, ...rest} = props;
    return <Component {...input}
                      onChange={input.onChange}
                      name={input.name}
                      label={floatingLabelText}
                      {...mapError(rest)}/>
}