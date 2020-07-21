import React from 'react';
import ReactDOM from 'react-dom';
// --> ui kit react
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/now-ui-kit.css";
// import "../src/assets/css/now-ui-kit.min.css";
// import "../src/assets/css/now-ui-kit.css.map";
import "../src/assets/demo/demo.css";
// <---
import Map from './components/Map'
import Coords from '../src/components/Coords'
import store from './redux/store'
import { Provider } from 'react-redux'


class Application extends React.Component {
    render() {
        return (
                <Provider store={store}>
                    <Map/>
                    <Coords/>
                </Provider>
            )
    }   
} 
    
    
ReactDOM.render(<Application />, document.getElementById('app'));