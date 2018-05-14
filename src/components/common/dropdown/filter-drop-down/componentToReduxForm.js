import React from 'react'

export default (Component) => (props) =>{
    const{ input, ...rest} = props;
    return <Component {...input}
                      onChange={input.onChange}
                      name={input.name}
                      {...rest}/>
}