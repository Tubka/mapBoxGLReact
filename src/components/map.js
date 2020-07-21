import React from 'react';
import { connect} from 'react-redux'
import mapboxgl from 'mapbox-gl';
import '../site.css'
import {Button, Collapse, CardBody, Card } from 'reactstrap';
import * as action from '../redux/action.creators'


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: 21,
    lat: 52,
    zoom: 6.5,
    currentMarkers: [],
    isOpenMap: true,
    };
  }

  handleChangeReduxCoords = () => this.props.handleChangeReduxCoords()

  handleAddToRedux = (marker) => this.props.handleAddToRedux(marker)

  handleSetNullId = () => this.props.handleSetNullId()

  handleChangeReduxCoords = () => this.props.handleChangeReduxCoords()

  handleToggleMap = () => this.setState({ isOpenMap: !this.state.isOpenMap });

  changeModeMap = () => {
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
    const switchLayer = (layer) => {
      var layerId = layer.target.id;
      this.map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
    for (let i = 0; i < inputs.length; i++) inputs[i].onclick = switchLayer
  }


  componentDidUpdate(prevProps) {
    const idToRemove = this.props.clickedCoords.coordsReducer.idToRemove
  
    if(idToRemove && prevProps.clickedCoords !== this.props.clickedCoords) {
      const currentMarkers = this.state.currentMarkers.filter(el => {
        if(el.id===idToRemove){
          el.remove()
        } else return el
      })
      this.setState({ currentMarkers })
      this.handleSetNullId()
    }
  }
  
  componentDidMount() {
    this.setState({ isOpenMap: false });

    mapboxgl.accessToken = 'pk.eyJ1IjoidHViZWN6a2EiLCJhIjoiY2s5YmtrandjMDE1dDNlcTlnb3NhdTl4OCJ9.SEkArbGMm-oq1xtZ8Q5o9w';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/streets-v11`,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });

    this.map.on('click', (e) => {
      this.marker = new mapboxgl.Marker({
        draggable: true
      })
      const onDragEnd = () => {this.handleChangeReduxCoords(); console.log(this.state.currentMarkers)}
         
      this.marker.on('dragend', onDragEnd);
      this.marker.setLngLat(e.lngLat).addTo(this.map);
      if(this.state.currentMarkers.length) {
        this.marker.id = this.state.currentMarkers[this.state.currentMarkers.length-1].id +1 
      } else this.marker.id = 1
      this.setState({ currentMarkers: [...this.state.currentMarkers, this.marker] })
      this.handleAddToRedux(this.marker)
    });

    this.changeModeMap()
  }
  render() {
    return (
        <>
          <Button color="primary" onClick={this.handleToggleMap} style={{ marginBottom: '1rem', display: 'block' }}>{this.state.isOpenMap? 'Close map' : 'Open map'}</Button>
          <Collapse isOpen={this.state.isOpenMap}>
            <Card>
              <CardBody style={{height: '600px'}}>    
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
              </CardBody>
            </Card>
          </Collapse>
        </>
    )
  }

}


const mapStateToProps = state => ({
  clickedCoords: state
})
const mapDispatchToProps = dispatch => {
  return {
    handleAddToRedux: (marker) => dispatch(action.reduxAddCoords(marker)),
    handleChangeReduxCoords: () => dispatch(action.reduxEditCoords()),
    handleSetNullId: () => dispatch(action.setNull())  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)