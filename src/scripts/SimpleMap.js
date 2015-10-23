import {default as React, Component} from "react";
import {default as update} from "react-addons-update";

import {GoogleMap, Marker, InfoWindow} from "react-google-maps";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
export default class SimpleMap extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      markers: []
    };
  }

  componentWillReceiveProps (nextProps) {
    var markers = nextProps.items.map((item, i) => {
      return {
        position: {
          lat: item.lat,
          lng: item.lon
        },
        item: item
      }
    });

    this.setState({ markers: markers });
  }

  render () {
    return (
      <section style={{height: "100%"}}>
        <GoogleMap containerProps={{
            style: {
              height: "100%",
            },
          }}
          defaultZoom={13}
          defaultCenter={{lat: 35.27341, lng: -80.81028}}
        >
          {this.state.markers.map((marker, i) => {
            var ref = 'marker_' + i;
            return (
              <Marker key={ref} ref={ref}
                      position={marker.position}
                      onMouseover={this._onMarkerMouseOver.bind(this, i)}
                      onMouseout={this._onMarkerMouseOut.bind(this, i)}>
                {marker.showInfo ? this._renderInfoWindow(ref, marker) : null}
              </Marker>
            );
          })}
        </GoogleMap>
      </section>
    );
  }

  _renderInfoWindow (ref, marker) {
    return (
      <InfoWindow key={ref + '_info_window'}>
          <p>Test</p>
      </InfoWindow>
    );
  }

  _onMarkerMouseOver (index, event) {
    var changedMarkers = update(this.state.markers, {
      [index]: {
        $merge: {
          showInfo: true
        }
      }
    });
    this.setState({ markers: changedMarkers });
  }

  _onMarkerMouseOut (index, event) {
    var changedMarkers = update(this.state.markers, {
      [index]: {
        $merge: {
          showInfo: false
        }
      }
    });
    this.setState({ markers: changedMarkers });
  }
}
