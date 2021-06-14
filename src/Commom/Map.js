
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 10.822259645376581,
            lng: 106.68745776178493
        },
        zoom: 15
    };
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAOkR9tW-zKh72ZVYVDuFc6Sym01EN_W9E" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={10.822259645376581}
                        lng={106.68745776178493}
                        text="Master Easy English Center"
                    />
                    
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;