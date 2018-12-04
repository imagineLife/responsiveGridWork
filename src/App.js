import React from "react";
import ReactDOM from "react-dom";
import { Responsive, WidthProvider } from 'react-grid-layout';
import Comp1 from './components/Comp1'
import TruckBarChart from './components/TruckBarChart'
import layoutData from './data/layout.js'
import * as d3 from 'd3'

import './css/resizingStyles.css'
import './css/cwc.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ResponsiveGridLayout = WidthProvider(Responsive);


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      layouts: {},
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
      },
      staticTiles: true,
      editBtnTxt: 'Edit Layout'

    }

    this.colorScale = d3.scaleOrdinal(d3.schemeAccent)
    this.localLayout = JSON.parse(localStorage.getItem('demoSavedLayout'))
    this.getTileHeightFromStateVal = this.getTileHeightFromStateVal.bind(this)
    this.switchEditMode = this.switchEditMode.bind(this)
  }

  convertStrToComponent(str, idx){
    console.log('converting str to comp')
    console.log(str)
    let thisComp = ((str) => {
      switch(str){
        case 'TruckBarChart':
          return <TruckBarChart {...this.state.layouts.lg[0]} singleDivH={this.state.singleDivH} {...this.state.layouts.lg[idx]}/>
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

  getTileHeightFromStateVal(val){
    let thisHeight = ((val) => {
      switch(val){
        case 3:
          return '470';
        case 2:
          return '310';
          break;
        default:
          return '150';
          break;

          // @TODO THESE HEIGHTS NEED UPDATING
      }
    })(val)
    return thisHeight
  }

  componentDidMount(){
    // console.log('cdm');
    // console.log(this.state)

    let justComponents = layoutData.lg.map(tile => {
      return tile.cwcComp
    })

    //for client-requesting layout data from a url
    // fetch(`./src/data/data.json`, {
    //   method: 'GET'
    // }).then(res => {
    //   console.log('res');
    //   console.log(res);

    // })

    this.setState({ layouts: layoutData, components: justComponents })
  }

  componentDidUpdate(){
    if(!this.state.singleDivH){
      const tileHeight = this.getTileHeightFromStateVal(this.state.layouts.lg[0].h);
      this.setState({singleDivH : tileHeight})
    }
  }

  switchEditMode(){

    //make new editable val
    let newEditState = (this.state.staticTiles == true) ? false: true;
    let newButtonTxt = (this.state.staticTiles == true) ? 'Save Layout': 'Edit Layout';

    // console.log('SWITCHING DOC')
    // console.log('newEditState');
    // console.log(newEditState);

    //set editable in new-copy of stated layout
    let newLgLayout = this.state.layouts.lg.map(tile => {
      tile['static'] = newEditState
      return tile
    })




    //build new layout
    const lgLayout = {lg: newLgLayout};
    const newLayout = {...this.state.layouts, ...lgLayout}

    this.setState((prevState) => {
      return {
        ...prevState,
        layouts: newLayout,
        staticTiles: newEditState,
        editBtnTxt: newButtonTxt
      }
    })

  }

  render() {

    if(this.state.layouts.lg && this.state.layouts.lg.length > 0){

      //Build LOCAL tiles, not from App.js
      let lgLayout = this.state.layouts.lg;
      let theseTiles = lgLayout.map((t,ind) => {

        let curComp;
        if(t.cwcComp){
          curComp = this.convertStrToComponent(t.cwcComp, ind)
        }else if(this.state.components){
          curComp = this.convertStrToComponent(this.state.components[ind], ind)
        }else{
          curComp = <div>No Component here right now...</div>
        }

        return <div
          key={t.i}
          id={`tile-${t.i}`}
          style={{backgroundColor: this.colorScale(t.i)}}
          static={`${t.static}`}>
            {curComp}
          </div>
      })

      return (
        <div className='appWrapper'>
          <button type="button" onClick={this.switchEditMode} className="editModeButton btn btn-primary">{this.state.editBtnTxt}</button>
          <ResponsiveGridLayout
            className="myResponsiveGridLayout"
            layouts={this.state.layouts}
            breakpoints={this.state.breakPoints}
            cols={this.state.cols}
            static={`${this.state.layouts.lg[0].static}`}>
              {theseTiles}
          </ResponsiveGridLayout>
        </div>
      )
    }else{
      return(<div>loading...</div>)
    }
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById("app"));