import React, { Component } from 'react'
import d3 from 'd3'
export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
        containerHeight: null
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      window.addEventListener('resize', this.fitParentContainer)
      this.fitParentContainer()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth, containerHeight} = this.state
      const currentContainerWidth = this.refs.respWrapperRef.getBoundingClientRect().width
      const currentContainerHeight = this.refs.respWrapperRef.getBoundingClientRect()

      const shouldResize = ((containerWidth !== currentContainerWidth) || (containerHeight !== currentContainerHeight))

      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight,
        })
      }
    }

    renderChart() {
      const parentWidth = this.state.containerWidth
      const parentHeight = this.state.containerHeight
      // console.log('WRAPPER parentHeight')
      // console.log(parentHeight)
      if(parentHeight === 0){ this.fitParentContainer()}

      return (
        <ChartComponent {...this.props} fpc={() => this.fitParentContainer()} parentWidth={parentWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref='respWrapperRef'
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)
