import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MainActions from '../action_creators/main_action.js';
import classStyles from '../scss/app.scss';


import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer,Polyline } from 'react-leaflet';
import markerUrl from '../img/marker-icon.png'


function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(MainActions, dispatch);
}
const dataSourceConfig = {
    text: 'text',
    value: 'value',
};

const markerIcon = L.icon({
    iconUrl:markerUrl,
    iconSize: [25, 41],
})


class ReactApp extends React.Component {
    constructor(props){
        super(props);
        this.getMap = this.getMap.bind(this);
    }

    getMap(){
        let latLngList = this.props.latLngList;
        let MarkersAndPolyLine = [];
        if(latLngList.length===2){
            MarkersAndPolyLine.push(<Marker position={latLngList[0]} icon={markerIcon}>
                <Popup>
                    <span>{this.props.origin.name}</span>
                </Popup>
            </Marker>)
            MarkersAndPolyLine.push(<Marker position={latLngList[1]} icon={markerIcon}>
                <Popup>
                    <span>{this.props.destination.name}</span>
                </Popup>
            </Marker>)
            MarkersAndPolyLine.push(<Polyline positions={this.props.latLngList}></Polyline>)
        }
        return <Map center={[42.877742,-97.380979]} zoom={4}>
            <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {MarkersAndPolyLine}
        </Map>

    }

    render(){
        const styles ={
            list:{
                width:'100%'
            },
            button:{
                marginLeft:24
            },
            clearFixed:{
                clear:'both'
            }
        }

        return <div className={classStyles.container}>
                {this.getMap()}
            <AutoComplete
                floatingLabelText="Origin"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={this.props.airports}
                dataSourceConfig={dataSourceConfig}
                onNewRequest={this.props.originSelect}
                listStyle={styles.list}
            />
            <div className={classStyles.emptyBlock}>
                {this.props.distance>0?`${this.props.distance.toFixed(2)} miles`:''}
            </div>
            <AutoComplete
                className={classStyles.autoComplete}
                floatingLabelText="Destination"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={this.props.airports}
                dataSourceConfig={dataSourceConfig}
                onNewRequest={this.props.destinationSelect}
                listStyle={styles.list}
            />
            <RaisedButton style={styles.button} label="Calculate" primary={true} onClick={this.props.calculate}/>
           <div style={styles.clearFixed}></div>

        </div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ReactApp);