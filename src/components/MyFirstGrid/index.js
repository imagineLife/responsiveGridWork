import React from "react";
import ReactDOM from "react-dom";
import { Responsive, WidthProvider } from 'react-grid-layout';
import '../../css/resizingStyles.css'
import '../../css/cwc.css'
import Comp1 from '../Comp1'
import CommonComp from '../CommonComp'
import TruckBarChart from '../TruckBarChart'
import * as d3 from 'd3'

const ResponsiveGridLayout = WidthProvider(Responsive);


export default class MyFirstGrid extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "layouts": {
        "lg": [
          {
            "w": 3,
            "h": 4,
            "x": 0,
            "y": 0,
            "i": "1",
            "minW": 2,
            "minH": 2,
            "moved": false,
            "static": false,
            "comp": "TruckBarChart",
          },
          {
            "w": 3,
            "h": 4,
            "x": 3,
            "y": 0,
            "i": "2",
            "minW": 2,
            "minH": 2,
            "moved": false,
            "static": false,
            "comp": 'Comp1'
          },
          {
            "w": 3,
            "h": 4,
            "x": 6,
            "y": 0,
            "i": "3",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false,
            "comp": 'Dummy Comp 3'
          },
          {
            "w": 3,
            "h": 4,
            "x": 9,
            "y": 0,
            "i": "4",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false,
            "comp": 'Dummy Comp 4'
          },
          {
            "w": 6,
            "h": 4,
            "x": 0,
            "y": 3,
            "i": "5",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false,
            "comp": 'Dummy Comp 5'
          },
          {
            "w": 6,
            "h": 4,
            "x": 6,
            "y": 3,
            "i": "6",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          }
        ],
        "md": [
          {
            "w": 5,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "1",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false,
            "comp": "TruckBarChart"
          },
          {
            "w": 5,
            "h": 3,
            "x": 5,
            "y": 0,
            "i": "2",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 5,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "3",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 5,
            "h": 3,
            "x": 5,
            "y": 3,
            "i": "4",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 10,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "5",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 10,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "6",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          }
        ],
        "sm": [
          {
            "w": 6,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "1",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false,
            "comp": "TruckBarChart"
          },
          {
            "w": 6,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "2",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 6,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "3",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 6,
            "h": 3,
            "x": 0,
            "y": 9,
            "i": "4",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          }
        ],
        "xs": [
          {
            "w": 2,
            "h": 3,
            "x": 0,
            "y": 12,
            "i": "1",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 2,
            "y": 0,
            "i": "2",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 2,
            "y": 3,
            "i": "3",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 2,
            "y": 6,
            "i": "4",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          }
        ],
        "xxs": [
          {
            "w": 2,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "1",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "2",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "3",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          },
          {
            "w": 2,
            "h": 3,
            "x": 0,
            "y": 9,
            "i": "4",
            "minW": 2,
            "minH": 3,
            "moved": false,
            "static": false
          }
        ]
      },
      breakPoints: {
        lg: 1350,
        md: 850,
        sm: 500,
        xs: 480,
        xxs: 0
      },
      cols: {
        lg: 12,
        md: 10,
        sm: 6,
        xs: 4,
        xxs: 2
      }
    }

    this.colorScale = d3.scaleOrdinal(d3.schemeAccent)
    this.localLayout = JSON.parse(localStorage.getItem('demoSavedLayout'))
  }

  convertStrToComponent(str){
    let thisComp = ((str) => {
      switch(str){
        case 'TruckBarChart':
          return <TruckBarChart {...this.state.layouts.lg[0]} singleDivH={this.state.singleDivH}/>
        case 'Comp1':
          return <Comp1 />;
          break;
        default:
          return ' no component here yet';
          break;
      }
    })(str)
    return thisComp
  }

  componentDidMount(){
    const tileWrapperHeight = document.getElementById('tile-1').clientHeight;
    this.setState({singleDivH : tileWrapperHeight})
  }

  render() {

    console.log('MyFirstGrid rendering')

    if(this.state.layouts.lg && this.state.layouts.lg.length > 0){

      //Build LOCAL tiles, not from App.js
      let theseTiles = this.state.layouts.lg.map(t => {
        let curComp;
        if(t.comp){
          curComp = this.convertStrToComponent(t.comp)
        }

        return <div
          key={t.i}
          id={`tile-${t.i}`}
          singleDivH={(this.state.singleDivH) ? this.state.singleDivH : null}
          style={{backgroundColor: this.colorScale(t.i)}}>
            {curComp}
          </div>
      })

      return (
        <ResponsiveGridLayout
          className="layout"
          layouts={this.state.layouts}
          breakpoints={this.state.breakPoints}
          cols={this.state.cols}>
            {theseTiles}
        </ResponsiveGridLayout>
      )

    }else{
      return(<div>loading...</div>)
    }

  }
}