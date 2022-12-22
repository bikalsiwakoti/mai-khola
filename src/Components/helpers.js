// import _ from 'lodash'
import {toJS } from 'mobx'

// export const calculateRainfallInterval = (values, interval) => {
//     const final = values.filter((item) => (new Date(item.datetime).getTime() > Date.now() - interval * 60 * 60 * 1000));
//     const totalValue = _.sum(final.map(totalVal => totalVal.value))
//     return totalValue;
// }

// export const resolveSeries = (observations, code, secondary) => {
//   let series = observations.find(item => item.parameter_code === code)
//   if (!!secondary && (!series || !series.data)) series = observations.find(item => item.parameter_code === secondary);
//   return toJS(series);
// };


export const calculateRainfallInterval=(hrValue) =>{
  return hrValue.filter(item => item.observations[0].parameter_code == "R").map(station => {
    let intervals = {
      '1': 0,
      '3': 0,
      '6': 0,
      '12': 0,
      '24': 0,
    }
    station.observations[0].data === null ||station.observations[0].data === undefined  ? <></> : station.observations[0].data.forEach(item => {
      if ((new Date(item.datetime).getTime()) > (Date.now() - 1 * 60 * 60 * 1000)) {
        intervals[1] += item.value;
      }
      if ((new Date(item.datetime).getTime()) > (Date.now() - 3 * 60 * 60 * 1000)) {
        intervals[3] += item.value;
      }
      if ((new Date(item.datetime).getTime()) > (Date.now() - 6 * 60 * 60 * 1000)) {
        intervals[6] += item.value;
      }
      if ((new Date(item.datetime).getTime()) > (Date.now() - 12 * 60 * 60 * 1000)) {
        intervals[12] += item.value;
      }
      if ((new Date(item.datetime).getTime()) > (Date.now() - 24 * 60 * 60 * 1000)) {
        intervals[24] += item.value;
      }
    })
    return intervals;
    
  })
}


// export const scaleLine=(selectedInterval) =>{
//   if(selectedInterval === 24){
//     var redLine = 140
//     var orangeLine = 120
//     var yellowLine = 100
//     var greenLine = 80
//     var blueLine = 0.5
//     var greyLine = 0
//   }
//   if(selectedInterval === 12){
//     var redLine = 120
//     var orangeLine = 100
//     var yellowLine = 80
//     var greenLine = 60
//     var blueLine = 0.5
//     var greyLine = 0
//   }
//   if(selectedInterval === 6){
//     var redLine = 100
//     var orangeLine = 80
//     var yellowLine = 60
//     var greenLine = 40
//     var blueLine = 0.5
//     var greyLine = 0
//   }
//   if(selectedInterval === 3){
//     var redLine = 80
//     var orangeLine = 60
//     var yellowLine = 40
//     var greenLine = 20
//     var blueLine = 0.5
//     var greyLine = 0
//   }
//   if(selectedInterval === 1){
//     var redLine = 60
//     var orangeLine = 40
//     var yellowLine = 20
//     var greenLine = 10
//     var blueLine = 0.5
//     var greyLine = 0
//   }

// }
