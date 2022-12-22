import './map.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map(props) {
  // const [riverData, setRiverData] = useState([])

  // useEffect(() => {
  //   axios.get('https://hydrology.gov.np/gss/api/socket/river_test/response').then((response) => {
  //     const data = response.data
  //     setRiverData(data)
  //     // console.log(data)
  //   }).catch((error) => { console.log(error) })

  // }, [])

  const center = [26.887222, 87.943889];



  return (
    <div className="map">

      <MapContainer
        center={center}
        zoom={9}
        style={{ width: '30%', height: '50vh', margin: 'auto' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'>

        </TileLayer>

        {props.data?.filter(item => item.observations[0].parameter_code === "R")?.filter(item => !!item.latitude && !!item.longitude).map((data, index) => {
          // let intervalValue = data.intervals[props.interval];
          // let color = getColor(intervalValue)
          let hourData = props.hrValue[index][props.interval]
          var color = 'grey'
          if (hourData > 120) {
            color = 'red'
          } else if (hourData > 100) {
            color = 'orange'
          } else if (hourData > 80) {
            color = 'yellow'
          } else if (hourData > 0.5) {
            color = 'green'
          } else if (hourData > 0) {
            color = 'blue'
          } else {
            color = 'grey'
          }
          let achenSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg>`
          let myIconUrl = encodeURI("data:image/svg+xml," + achenSvgString).replace('#', '%23');
          let DefaultIcon = L.icon({
            iconUrl: myIconUrl
          });

          return (
            <Marker key={index}
              position={[data.latitude, data.longitude]}
              icon={DefaultIcon}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup>{data.name} ({data.observations[0].data === null ? <></> : props.hrValue[index][props.interval]})</Popup>
              {/* <Popup>{data.name} (data.intervals[props.interval])</Popup> */}
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

// data = {
//   rainfall: {
//     '1': '',
//     '3': ''
//   }
// }
