import './chart.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import _ from 'lodash'
import moment from 'moment';

function getOption(barGraphData,stationName,lineGraphData) {
    return {
        chart: {
            zoomType: 'xy',
            height: 225,
            width: 290,
            style: {
                width: '100%',
                fontSize: '12px',
                height: '38vh'
            }
        },
        title: {
            useHTML: true,
            text: stationName,
            style: {
                backgroundColor: 'rgba(30, 141, 193, 0.782)',
                color: 'white',
                padding: '0 100px',
                textAlign: 'center',

            }
        },
        xAxis: {
            type: 'datetime',
            crosshair: true,
            style: {
                fontSize: '12px',
            }
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: '12px',
                }
            },
            title: {
                text: 'MM',
                style: {
                    color: Highcharts.getOptions().colors[1],
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            y: 197,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Hourly',
            type: 'column',
            // yAxis: 1,// [[time, value], [time, val]]
            data: barGraphData,


        }, {
            name: 'Total',
            type: 'spline',
            color: Highcharts.getOptions().colors[2],
            data: lineGraphData,
        }]
    }
}

function Chart(props) {
    return (
        props.data === undefined ? <></> : props.data.filter(item => item.observations[0].parameter_code === "R").map((station, index) => {
            var barGraphData = [];
            var lineGraphData = [];
            let lineValue = 0;
            var stationName = station.name;
            Object.entries(_.groupBy(station.observations[0].data, (item) => {
                // console.log(item.datetime)
                return (moment.utc(item.datetime).format('YYYY-MM-DDTHH:00:00+00:00'))
            })).map((stationValue ) => {
                var addValue = _.sum(stationValue[1].map(addVal => addVal.value))
                lineValue += addValue
                var dateToNPT = moment(new Date(stationValue[0])).format('YYYY-MM-DDTHH:mm:ss+00:00')
                // console.log(dateToNPT);
                // console.log(stationValue[0]);
                barGraphData.push([Date.parse(dateToNPT), addValue])
                lineGraphData.push([Date.parse(dateToNPT), lineValue])
            })
            return (
                <>
                    { }
                    {/* {station.observations[0].data === null ? false : station.observations[0].data} */}
                    <div className='chart' key={index}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={getOption(barGraphData,stationName,lineGraphData)}
                        />
                    </div>
                </>

            )
        })
    );


};

export default Chart;
