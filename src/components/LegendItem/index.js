import React from 'react'
import './legendItem.css'

export default function Bars(props) {
  return(
    <li className="legendItem" key={props.dc}>
      <div className="legendSq" style={{backgroundColor: props.color}}></div>
      <p className="legendP">= {props.dc}</p>
    </li>
  )
}