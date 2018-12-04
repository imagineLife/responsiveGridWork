import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import LegendItem from '../LegendItem'
import ResponsiveWrapper from '../ResponsiveWrapper'
import { Redirect } from 'react-router-dom';
import * as d3 from 'd3-selection'
import * as cs from 'd3-scale'
import './style.css';

class TruckPitInChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand().padding(0.2)
    this.yScale = scaleLinear()
    this.state = {
      labels: [
        {
          type: 'y',
          text : 'Volume',
          textClass : 'yAxisLabelText',
          gWrapperClass : 'yAxisLabelG',
          transformation: 'rotate(-90)'
        },
        {
          type: 'bigY',
          text : 'IN',
          textClass : 'bigYLabel',
          gWrapperClass : 'bigYLabelG',
        }
      ],
      margins : { top: 10, right: 20, bottom: 40, left: 120 },
      filteredData: [],
      filteredCommodity: [],
      filteredPit: [],
      colorBy: ''
    }
  }

  calcXPos(string, dims){
    if(string.indexOf('y') > -1){
      return -(dims.height / 2.75)
    }else if(string.indexOf('c') > -1){
      return (dims.width / 2)
    }else if(string.indexOf('b') > -1){
      return 20
    }else{
      return ( dims.width / 2)
    }

  }

  calcYPos(string, dims){
    if(string.indexOf('y') > -1){
      return 70
    }else if(string.indexOf('c') > -1){
      return (dims.height * .05)
    }else if(string.indexOf('b') > -1){
      return(dims.height / 3)
    }else{
      return dims.height - 25
    }

  }

  render() {

    //color bars by either commodity or pit number
    let colorBy = (this.props.colorBy === 'ProductCode') ? this.state.filteredCommodity : this.state.filteredPit

    //prep data
    if(this.props.data.length > 0 && this.state.filteredData.length < 1){
      let a = this.props.data
      a.forEach(t => {
        let thisPC = t["ProductCode"];
        if (this.state.filteredCommodity.includes(thisPC)){
          return;
        }else{
          this.state.filteredCommodity.push(thisPC)
        }

      })
      a.forEach(t => {
        let thisPit = t["PitID"]
        if (this.state.filteredPit.includes(thisPit)){
          return;
        }else{
          this.state.filteredPit.push(thisPit)
        }
      })
      this.state.filteredData = this.props.data.filter((d) => d.Direction === 1)
    }

    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: this.props.parentH,
      'class': 'trucksPerHourSVG'
    }

    //max value from data
    const maxDataValue = Math.max(...this.state.filteredData.map(d => d.Volume  ) )

    //make x&y&color scales using d3
    const xScale = this.xScale
      .domain(this.state.filteredData.map(d => d.TrucksNumber))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])
    const yScale = this.yScale
      .domain([0, maxDataValue * 1.1])
      .range([(svgDimensions.height - this.state.margins.bottom), this.state.margins.top])
    const colorScale = cs.scaleOrdinal()
      .domain(colorBy)
      .range(['green', 'yellow', 'brown', 'orange', 'darkblue', 'pink']);

    //build legend items from commodities or pits, depending on tile view (colorBy)
    const legendItems = colorBy.map((dc, i) => {
      let thisI = i+1;
      let circleX = (thisI * 120);
      let circleY = 0;
      let textX = (thisI * 120) + 60;
      let textY = 0;
      if (!dc) dc = 'n/a'
        return(
            <LegendItem dc={dc} color={colorScale(dc)} />
          )
    })

    //make AxisLabel Objects
    const axisLabels = this.state.labels.map((each) => {
      return <AxisLabel
        key={each.text}
        xPos={this.calcXPos(each.type, svgDimensions)}
        yPos={this.calcYPos(each.type, svgDimensions)}
        labelClass={each.textClass}
        groupClass={each.gWrapperClass}
        textVal={each.text}
        transformation={each.transformation}
      />

    })

    return (
      <React.Fragment>
        <ul className="legendUL">
          {legendItems}
        </ul>

        <svg style={svgDimensions} >
          <AxesAndMath
            scales={{ xScale, yScale }}
            margins={this.state.margins}
            svgDimensions={svgDimensions}
          />

          <Bars
            key={'abc'}
            scales={{ xScale, yScale, colorScale }}
            margins={this.state.margins}
            data={this.state.filteredData}
            commods={this.state.filteredCommodity}
            maxValue={maxDataValue}
            svgDimensions={svgDimensions}
            colorBy={colorBy}
            showBarDetails={this.redirectToBarPage}
          />
          {axisLabels}
        </svg>
      </React.Fragment>
    )
  }
}

export default ResponsiveWrapper(TruckPitInChart)