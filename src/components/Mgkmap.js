import React, {Component} from 'react';
import ModalPortal from '../ModalPortal';
import PrivateModal from './PrivateModal';
import LocationAuth from './LocationAuth';
import '../style/mgkmap.css';

class Mgkmap extends Component {
    constructor(props){
      // 초기화 담당
      super(props);
      this.state = {
        modal:true,
        currentAddress:'위치 파악 중...'
      }
    }
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
                className="main map"
                ref={this.mapContainer}
            >
                <div className="map-element">
                    <span className="map-address">위치인증: {this.state.currentAddress}</span>
                    {this.state.modal && (
                        <ModalPortal>
                            <PrivateModal path="/location-auth" component={LocationAuth}/>
                        </ModalPortal>
                    )}
                    <button className="btn btn-auth-location">재인증하기</button>
                </div>
                
            </div>
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
        this.reverseGeocode(currentCoords)
    }
    reverseGeocode(currentCoords){
        window.naver.maps.Service.reverseGeocode({
            coords: currentCoords,
            orders:'admcode',
        }, (status, response)=>{
            if (status !== window.naver.maps.Service.Status.OK) {
                return alert('[Naver map]Something wrong!');
            }

            let result = response.v2, // 검색 결과의 컨테이너
                items = result.results; // 검색 결과의 배열

            // do Something
            console.log(result);
            console.log(items[0].region.area3.name);
            if(this.state.currentAddress !== items[0].region.area3.name){
                this.setState({currentAddress:items[0].region.area3.name});
            }
        })
    };
}

export default Mgkmap;
