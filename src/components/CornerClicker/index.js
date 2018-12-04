import React from 'react'
import './cornerClicker.css'

export default function TileTitle(props) {

  return(
    <img className="cornerClicker" src={props.src} onClick={props.clickProps}/>
  )
}