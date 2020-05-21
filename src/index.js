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

class Application extends React.Component {
    render() {
        return (
            <>
                <Map/>
            </>
            )
    }   
} 
    
    
ReactDOM.render(<Application />, document.getElementById('app'));