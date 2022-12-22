import './singleGraph.css'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import _, { values } from 'lodash'
import moment from 'moment';




function getOption(props, waterLvlName, waterLvlData) {

    return {
        chart: {
            zoomType: 'x',
            height: 240,
            width: 600,
            style: {
                fontSize: '12px',
                height: '37vh',
                // width: '95%',
                border: "2px solid black",
            }
        },
        title: {
            useHTML: true,
            text: '',
        },
        legend: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            crosshair: true,
            opposite: true,
            style: {
                fontSize: '12px',
            },
            title: {
                text: 'Time (h)',
                style: {
                    color: Highcharts.getOptions().colors[1],
                }
            },

        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: '12px',
                },
            },
            title: {
                text: 'Raainfall depth(mm)',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: '11px',

                }
            },
            reversed: true,
        }, { // Secondary yAxis
            title: {
                text: 'Flow(m³/s)',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: '11px',
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: '11px',
                }
            },
            opposite: true,
        }],
        tooltip: {
            shared: true
        },
        series: [
            ...props.data?.filter(item => item.observations[0].parameter_code == "R").map((station) => {
                var barGraphData = [];
                const data = Object.entries(_.groupBy(station.observations[0].data, (item) => {
                    // console.log(Date.parse(item.datetime))
                    return (moment.utc(item.datetime).format('YYYY-MM-DDTHH:00:00+00:00'))
                }))
                data.map((stationValue) => {
                    var addValue = _.sum(stationValue[1].map(addVal => addVal.value))
                    var dateToNPT = moment(new Date(stationValue[0])).format('YYYY-MM-DDTHH:mm:ss+00:00')
                    barGraphData.push([Date.parse(dateToNPT), addValue])
                })
                return ({
                    name: station.name,
                    type: 'column',
                    data: barGraphData,
                    yAxis:0
                })
            }),
            {
                name: waterLvlName,
                type: 'spline',
                data: waterLvlData,
                yAxis:1
            },
        ]
    }
}

function SingleGraph(props) {
    var waterLvlName = ''
    var waterLvlData = [];
    props.data?.filter(item => item.observations[0].parameter_code == "WTR_LVL").map((station) => {
        waterLvlName = station.name
        const data = Object.entries(_.groupBy(station.observations[0].data, (item) => {
            return (moment.utc(item.datetime).format('YYYY-MM-DDTHH:00:00+00:00'))
        }))
        data.map((stationValue) => {
            var addValue = _.sum(stationValue[1].map(addVal => addVal.value))
            var dateToNPT = moment(new Date(stationValue[0])).format('YYYY-MM-DDTHH:mm:ss+00:00')
            waterLvlData.push([Date.parse(dateToNPT), addValue])
        })
    })
    return (
        <>
            <div className='singleChart'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={getOption(props, waterLvlName, waterLvlData)}
                    
                />
            </div>
        </>
    );


}

export default SingleGraph;