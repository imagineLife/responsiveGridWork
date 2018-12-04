import React, { Component } from 'react'
import TruckPitInChart from '../TruckPitInChart'
import TruckPitOutChart from '../TruckPitOutChart'
import cornerClickerImg from '../../imgs/cornerClicker.png'
import TileTitle from '../TileTitle'
import CornerClicker from '../CornerClicker'
import './style.css';

class TruckBarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewNumber: 1,
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
      apiData: [],
      returnedAPIData: false,
      getInterval: 0,
    }
    this.updateViewNumber = this.updateViewNumber.bind(this)
    this.getTrucksFromAPI = this.getTrucksFromAPI.bind(this)
  }


  componentDidMount(){
    if(this.state.apiData.length < 1){
      this.getTrucksFromAPI();
    }
    let setIntVar = setInterval(() => this.getTrucksFromAPI(), 5000);
    this.setState({getInterval: setIntVar })
  }
  componentWillUnmount() {
    clearInterval(this.state.getInterval);
  }

  getTrucksFromAPI() {
    let APIURL = '//localhost:3000/trucksData'
    return fetch(APIURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(APIRes => APIRes.json())
    .then(res => this.setState({apiData: res}) )
    .catch(err => {
      console.log('fetch err')
      console.log(err)
    })
  }

  updateViewNumber(){
    let tileViewNumber = (this.state.viewNumber ===1) ? 2 : 1;
    this.setState({viewNumber: tileViewNumber})
  }

  // componentDidUpdate(){
  //   console.log('cdUpdate here!')
  // }

  render() {
    let colorCode, tileTitleText;

    if(this.state.viewNumber ===1){
      colorCode = 'ProductCode';
      tileTitleText = `Trucks: ${this.state.apiData.length}`
    }else{
      colorCode = 'PitID';
      tileTitleText = 'Trucks By Pit'
    }

    return(
      <div className="truckPit" id="truckPit">
        <CornerClicker src={cornerClickerImg} clickProps={this.updateViewNumber}/>
        <TileTitle titleText={tileTitleText} />
        <TruckPitInChart data={this.state.apiData} colorBy={colorCode} parentH={((this.props.singleDivH / 2) - 27.5)}/>
        <TruckPitOutChart data={this.state.apiData} colorBy={colorCode} parentH={((this.props.singleDivH / 2) - 27.5)}/>
      </div>
    )
  }
}

export default TruckBarChart