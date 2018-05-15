import React from 'react'
import mapError from './mapError'

export default (Component) => (props) =>{
    const{ input, ...rest} = props;
    return <Component {...mapError(props)}/>
}