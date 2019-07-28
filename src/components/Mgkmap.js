import React, {Component} from 'react';
import ModalPortal from '../ModalPortal';
import PrivateModal from './PrivateModal';
import LocationAuth from './LocationAuth';
import '../style/mgkmap.css';

class Mgkmap extends Component {
    constructor(props){
      super(props);
      this.state = {
        modal:false,
        isLocaAuth:false,
        currentAddress:['미인증 상태']
      }
    }
  mapContainer = React.createRef();

  componentDidMount(){
    let coords;
    !this.props.currentCoords ? coords = this.props.defaultCoords : coords = this.props.currentCoords;
    const { latitude, longitude } = coords;
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
    if(!!this.props.currentCoords) {
        this.reverseGeocode(defaultCoords)
        this.setState({isLocaAuth:!this.state.isLocaAuth})
    }
    }
    render() {
        return (
            <div
                className="main map"
                ref={this.mapContainer}
            >
                <div className="map-element">
                    <span className="map-address">위치인증: {this.state.currentAddress}</span>
                    {(!this.state.isLocaAuth || this.state.modal) && (
                        <ModalPortal>
                            <PrivateModal path="/location-auth" component={LocationAuth}
                                isLocaAuth={this.state.isLocaAuth}
                                getCurrentPosition={this.getCurrentPosition}
                                onClose={this.onClose}
                            />
                        </ModalPortal>
                    )}
                    <button 
                        onClick={this.locationAuthToggle}
                        className="btn btn-auth-location"
                    >재인증하기</button>
                </div>
                
            </div>
        );
    }
    onClose=_=>{
        this.setState({modal:!this.state.modal})
    }
    locationAuthToggle=_=>{
        this.setState({modal:!this.state.modal})
    }
    getCurrentPosition=_=>{
        navigator.geolocation.getCurrentPosition(
            res=>{
                const lat = res.coords.latitude;
                const long = res.coords.longitude;
                this.locationAuth(lat,long);
            },
            err=>console.log('[getCurrentPosition] err',err)
        )
    }
    locationAuth=(lat,long)=>{
        console.log("locationAuth");
        const currentCoords = new window.naver.maps.LatLng(lat,long);
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
        console.log(currentCoords)
        this.reverseGeocode(currentCoords)
        this.setState({modal:false, isLocaAuth:true})
        console.log(this.props)
        this.props.setCurrentCoords(lat,long);
        // this.resetChatroom()
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
    componentDidUpdate(){
        // 첫 로드시 서버로부터 인증된 위치 정보를 받아옴

    }
}

export default Mgkmap;
