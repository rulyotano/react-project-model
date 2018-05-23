import React from 'react'
import mapError from './mapError'

export default (Component) => (props) =>{
    return <Component {...mapError(props)}/>
}