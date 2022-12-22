import './App.css';
import { useState, useEffect } from 'react'
import Map from './Components/Map/Map.js'
import Button from './Components/Button/Button.js'
import Chart from './Components/Chart/Chart.js'
import SingleGraph from './Components/SingleGraph/SingleGraph.js'
import io from 'socket.io-client';
import {calculateRainfallInterval} from './Components/helpers.js'


function App() {
  const [maiKholaData, setmaiKholaData] = useState([])
  // selectedInterval = [1,3,6,12,24]
  const [selectedInterval, setselectedInterval] = useState(24)

  function funHR(value) {
    setselectedInterval(value)
  }

  useEffect(() => {
    const socket_gss = io.connect('https://gss.wscada.net/');

    socket_gss.on('connect', () => {
      console.log('sending client requests');
      socket_gss.emit('client_request', 'mai_khola');
    });


    socket_gss.on('reconnect', () => {
      console.log('resending client requests');;
      socket_gss.emit('client_request', 'mai_khola');
    });

    socket_gss.on('disconnect', err => {
      console.log('socket disconnected', err);
    });

    socket_gss.on('mai_khola', res => {
      setmaiKholaData(res)
    });


  }, [])
  console.log(maiKholaData)

  


  return (<div className="Page">
    <div className="buttons">
      <span onClick={() => funHR(1)} className={selectedInterval === 1 ? 'active' : ""}>
        <Button hour="1 hour" />
      </span>
      <span onClick={() => funHR(3)} className={selectedInterval === 3 ? 'active' : ""}>
        <Button hour="3 hour" />
      </span>
      <span onClick={() => funHR(6)} className={selectedInterval === 6 ? 'active' : ""}>
        <Button hour="6 hour" />
      </span>
      <span onClick={() => funHR(12)} className={selectedInterval === 12 ? 'active' : ""}>
        <Button hour="12 hour" />
      </span>
      <span onClick={() => funHR(24)} className={selectedInterval === 24 ? 'active' : ""}>
        <Button hour="24 hour" />
      </span>
    </div>
    {/* <Map data={maiKholaData} interval={selectedInterval} /> */}
    <Map hrValue= {calculateRainfallInterval(maiKholaData)} data={maiKholaData} interval={selectedInterval} />
    <div className="colors">
      <div className="red"><span>&#62;140</span></div>
      <div className="orange"><span>120</span></div>
      <div className="yellow"><span>100</span></div>
      <div className="green"><span>80</span></div>
      <div className="blue"><span>0.5</span></div>
      <div className="grey"><span>0</span></div>
    </div>
    <div className='rightCharts'>
      <Chart data={maiKholaData.slice(0, 3)} />
    </div>
    <div className='leftCharts'>
      <Chart data={maiKholaData.slice(3, 6)} />
    </div>
    <SingleGraph data={maiKholaData} />
  </div>
  );
}
export default App;
