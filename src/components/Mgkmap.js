import React, {Component} from 'react';
import '../style/mgkmap.css'

class Mgkmap extends Component {
  mapContainer = React.createRef();

  componentDidMount(){
    const { latitude, longitude } = this.props.defaultCoords;
    const defaultCoords = new window.naver.maps.LatLng(latitude,longitude);
        this.map = new window.naver.maps.Map(this.mapContainer.current, {
            center: defaultCoords,
            zoom:11,
        });
        this.currentMarker = new window.naver.maps.Marker({
            position: defaultCoords,
            title:'default 위치',
            map: this.map,
            icon:{
                content: '<div style="width:20px;height:20px;background:#FF412E;border-radius:50%"></div>'
            }
        })
    }
    render() {
        return (
            <div
                className="main"
                ref={this.mapContainer}
            >지도</div>
        );
    }

    componentDidUpdate(){
        const {longitude,latitude} = this.props.currentCoords;
        const currentCoords = new window.naver.maps.LatLng(latitude,longitude);
        const {map} = this;
        if(!!this.currentMarker){
            this.currentMarker.setMap(null);
        }
        this.currentMarker = new window.naver.maps.Marker({
            position: currentCoords,
            title:'현위치',
            map: this.map,
            icon:{
                content: '<div style="width:20px;height:20px;background:#FF412E;border-radius:50%"></div>'
            }
        })
        map.setCenter(currentCoords);
    }
}

export default Mgkmap;
