import React, {Component} from 'react';

class Mgkmap extends Component {
  mapContainer = React.createRef();

  componentDidMount(){
    const { latitude, longitude } = this.props.defaultCoords;
    const currentCoords = new window.naver.maps.LatLng(latitude,longitude);
        this.map = new window.naver.maps.Map(this.mapContainer.current, {
            center: currentCoords,
            zoom:11,
        });
        this.currentMarker = new window.naver.maps.Marker({
            position: currentCoords,
            title:'default 위치',
            map: this.map,
            icon:{
                content: '<div style="width:20px;height:20px;background:red;border-radius:50%"></div>'
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
        console.log('componentDidUpdate');
        const {longitude,latitude} = this.props.currentCoords;
        const newCurrentCoords = new window.naver.maps.LatLng(latitude,longitude);
        const {map} = this;
        if(!!this.currentMarker){
            this.currentMarker.setMap(null);
        }
        this.currentMarker = new window.naver.maps.Marker({
            position: newCurrentCoords,
            title:'현위치',
            map: this.map,
            icon:{
                content: '<div style="width:20px;height:20px;background:red;border-radius:50%"></div>'
            }
        })
        map.setCenter(newCurrentCoords);
    }
}

export default Mgkmap;
