import React from 'react'
import { scaleOrdinal } from 'd3-scale'
import './bars.css'

export default function Bars(props) {

    let colorArr = [];

    const { scales, margins, data, svgDimensions, commods } = props
    const { xScale, yScale, colorScale } = scales
    const { height } = svgDimensions


    //calculate bar border based on data above/below threshold
    const calcLessStroke = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return 'rgb(190,0,22)'
      }else{
        return 'gray'
      }
    }

    const calcMoreStroke = (d) => {
      if(d.minutes > props.alertLevel){
        return 'rgb(190,0,22)'
      }else{
        return 'gray'
      }
    }

    const calcLessStrokeWidth = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return '5px'
      }else{
        return '1px'
      }
    }

    const calcMoreStrokeWidth = (d) => {
      if(d.minutes > props.alertLevel){
        return '5px'
      }else{
        return '1px'
      }
    }

    let colorBy, xScaleBy;
    if(data.length > 0 && props.colorBy){
      if(typeof props.colorBy[0] === 'string'){
        colorBy = 'ProductCode'
        xScaleBy = 'TrucksNumber'
      }else{
        colorBy = 'PitID'
        xScaleBy = 'TrucksNumber'

      }
    }

    const bars = (
      data.map(barData => {

        let uQ = barData.TrucksNumber + barData.Volume;

          return (
            <rect
              key={uQ}
              x={xScale(barData[xScaleBy]) + (xScale.bandwidth() * .25)}
              y={yScale(barData.Volume)}
              height={height - margins.bottom - scales.yScale(barData.Volume)}
              width={xScale.bandwidth() * .75}
              fill={colorScale(barData[colorBy])}
              onClick={() => props.showBarDetails(barData)}
              // onMouseOver={() => props.mousedOver(barData)}
              className="singleBar"
            />
          )

      })
    )


      if({bars}){
        return (
          <g>{bars}</g>
        )
      }else{
        return (
          <g></g>
        )
      }

}