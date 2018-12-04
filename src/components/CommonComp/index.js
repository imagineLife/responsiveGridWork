import React from "react";
import ReactDOM from "react-dom";
import './index.css'

export default class CommonComp extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    // console.log('rendering Comp1...')
    return (
      <div key={this.props.key} className={this.props.cl} >
        <span className='remove' id={this.props.spanID} onClick={this.props.clickFn}>x</span>
        {this.props.chartComp}
      </div>
    )
  }
}