import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../site.css'
import {Button, Collapse, CardBody, Card } from 'reactstrap';
import MaterialTable from 'material-table'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: 21,
    lat: 52,
    zoom: 6.5,
    currentMarkers: [],
    isOpenMap: true,
    isOpenCoords: false
    };
  }

  handleToggleMap = () => {
    this.setState({ 
      isOpenMap: !this.state.isOpenMap });
  }

  handleToggleCoords = () => {
    this.setState({ 
      isOpenCoords: !this.state.isOpenCoords });
  }

  Clear = (a,b) => {
    let currentMarkers = this.state.currentMarkers
    currentMarkers.forEach(el => {
      if(el.id === b.id) {
        el.remove()
      }
    })
    currentMarkers = currentMarkers.filter(el => {
      return b.id !== el.id
    })
    this.setState({
      currentMarkers: currentMarkers
    })
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
      const onDragEnd = () => {
        this.forceUpdate()
      }
         
      this.marker.on('dragend', onDragEnd);
      this.marker.setLngLat(e.lngLat).addTo(this.map);
      if(this.state.currentMarkers.length) {
        this.marker.id = this.state.currentMarkers[this.state.currentMarkers.length-1].id +1 
      } else this.marker.id = 1
      this.setState({ 
        currentMarkers: [...this.state.currentMarkers, this.marker]
      })
    });
    // change mode --->
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
    
    const switchLayer = (layer) => {
      var layerId = layer.target.id;
      this.map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }
    // change mode <---
  }
  render() {
    let data = this.state.currentMarkers
    if(data.length) {
      data = data.map(el => {
        return {'id': el.id, 'xCoordinate': el._lngLat.lng, 'yCoordinate': el._lngLat.lat}
      })
    }
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
          <Button color="warning" onClick={this.handleToggleCoords} style={{ marginBottom: '1rem', display: 'block' }}>{this.state.isOpenCoords? 'Hidden coordinates' : 'Show coordinates'}</Button>
          <Collapse isOpen={this.state.isOpenCoords}>
            <Card>
              <CardBody>
                <div style={{ maxWidth: '100%', BackgroundColor: 'black' }}>
                  <MaterialTable
                    options={{
                      search: false
                    }}
                    actions={[
                      {
                        icon: 'delete',
                        tooltip: 'Delete marker',
                        onClick: (event, rowData) => {
                          this.Clear(event, rowData)
                        }
                      }
                  ]}
                    columns={[
                      { title: 'ID', field: 'id', type: 'numeric' },
                      { title: 'X', field: 'xCoordinate', type: 'numeric'},
                      { title: 'Y', field: 'yCoordinate', type: 'numeric' },
                    ]}
                    data={data}
                    title="Co-ordinates"
                  />
                </div>
              </CardBody>
            </Card>
          </Collapse>
        </>
    )
  }
}
export default Map

