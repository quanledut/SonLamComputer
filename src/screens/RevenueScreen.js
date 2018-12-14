import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  processColor
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper'
import Header from './layouts/Header'
import {MenuProvider} from 'react-native-popup-menu'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

class Year extends Component {
  constructor (props) {
    super(props)
    this.state = {
      line: {
        title: 'Development smartphone in Indonesia',
        detail: { 
          time_value_list: ['2013', '2014', '2015', '2016', '2017', '2018'],
          legend_list: ['Sale', 'Service', 'Warranty', 'Upgrade'],
          dataset: {
            Sale: {
              '2013': 8806,
              '2014': 9000,
              '2015': 9200,
              '2016': 8600,
              '2017': 8000,
              '2018': 9000,
            },
            Service: {
              '2013': 1000,
              '2014': 950,
              '2015': 1100,
              '2016': 1500,
              '2017': 2000,
              '2018': 2500,
            },
            Warranty: {
              '2013': 500,
              '2014': 600,
              '2015': 600,
              '2016': 790,
              '2017': 800,
              '2018': 500,
            },
            Upgrade: {
              '2013': 120,
              '2014': 200,
              '2015': 400,
              '2016': 1000,
              '2017': 2000,
              '2018': 5000,
            }
          }
        }
      }
    }
  }

  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  render () {
    const time = this.state.line.detail.time_value_list
    const legend = this.state.line.detail.legend_list
    const dataset = this.state.line.detail.dataset

    var dataSetsValue = []
    var dataStyle = {}
    var legendStyle = {}
    var descStyle = {}
    var xAxisStyle = {}
    var chooseStyle = {}
    var valueLegend = []
    var colorLegend = []

    legend.map((legendValue) => {
      var valueLegend = []

      time.map((timeValue) => {
        const datasetValue = dataset[legendValue]
        const datasetTimeValue = datasetValue[timeValue]

        valueLegend.push({ y: parseInt(datasetTimeValue) })
      })

      const datasetObject = {
        values: valueLegend,
        label: legendValue,
        config: {
          lineWidth: 1,
          drawCubicIntensity: 0.4,
          circleRadius: 5,
          drawHighlightIndicators: false,
          color: processColor(this.getRandomColor()),
          drawFilled: true,
          fillColor: processColor(this.getRandomColor()),
          fillAlpha: 45,
          circleColor: processColor(this.getRandomColor()),
          drawValues: false
        }
      }
      dataSetsValue.push(datasetObject)
    })

    legendStyle = {
      enabled: true,
      textColor: processColor('blue'),
      textSize: 12,
      position: 'BELOW_CHART_RIGHT',
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      formToTextSpace: 5,
      wordWrapEnabled: true,
      maxSizePercent: 0.5
    }
    dataStyle = {
      dataSets: dataSetsValue
    }
    xAxisStyle = {
      valueFormatter: time
    }
    const markers = {
      enabled: true,
      digits: 2,
      backgroundTint: processColor('teal'),
      markerColor: processColor('#F0C0FF8C'),
      textColor: processColor('white')
    }

    return(
      <LineChart
        style={styles.bar}
        data={dataStyle}
        chartDescription={{text: ''}}
        legend={legendStyle}
        marker={markers}
        xAxis={xAxisStyle}
        drawGridBackground={false}
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders
      />
    )
  }
}

class Month extends Component {
    constructor (props) {
      super(props)
      this.state = {
        bar: {
          title: 'Sales motor in Indonesia',
          detail: { 
            time_value_list: ['Jun', 
            'Jully', 'Augus', 'September', 'October', 'November', 'December'],
            legend_list: ['Sale', 'Service', 'Warranty', 'Upgrade'],
            dataset: {
              Sale: {
                'Jun': 38000,
                'Jully': 45000,
                'Augus': 54000,
                'September': 60000,
                'October': 70000,
                'November': 78000,
                'December': 40000,
              },
              Service: {
                  'Jun': 12000,
                  'Jully': 13000,
                  'Augus': 14500,
                  'September': 16000,
                  'October': 17200,
                  'November': 18000,
                  'December': 10000,
              },
              Warranty: {
                  'Jun': 8000,
                  'Jully': 8500,
                  'Augus': 9000,
                  'September': 10200,
                  'October': 11000,
                  'November': 12000,
                  'December': 7000,
                },
              Upgrade: {
                  'Jun': 30000,
                  'Jully': 32000,
                  'Augus': 35000,
                  'September': 40000,
                  'October': 42300,
                  'November': 46000,
                  'December': 25000,
                },
            }
          }
        }
    }
    }

    getRandomColor () {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      }
    
    
    render () {
        const style1 = {
          barWidth: 0.1,
          groupSpace: 0.2
        }
        const style2 = {
          barWidth: 0.2,
          groupSpace: 0.1
        }
        const style3 = {
          barWidth: 0.3,
          groupSpace: 0.2
        }
    
        const time = this.state.bar.detail.time_value_list
        const legend = this.state.bar.detail.legend_list
        const dataset = this.state.bar.detail.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        if (legend.length === 4) {
          chooseStyle = style1
        } else if (legend.length === 3) {
          chooseStyle = style2
        } else if (legend.length === 2) {
          chooseStyle = style3
        }
    
        legend.map((legendValue) => {
          var valueLegend = []
    
          time.map((timeValue) => {
            const datasetValue = dataset[legendValue]
            const datasetTimeValue = datasetValue[timeValue]
    
            valueLegend.push(parseInt(datasetTimeValue))
          })
    
          const datasetObject = {
            values: valueLegend,
            label: legendValue,
            config: {
              drawValues: false,
              colors: [processColor(this.getRandomColor())]
            }
          }
          dataSetsValue.push(datasetObject)
        })
    
        legendStyle = {
          enabled: true,
          textSize: 14,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          wordWrapEnabled: true
        }
        dataStyle = {
          dataSets: dataSetsValue,
          config: {
            barWidth: chooseStyle.barWidth, // 0.1
            group: {
              fromX: 0,
              groupSpace: chooseStyle.groupSpace, // 0.2
              barSpace: 0.1
            }
          }
        }
        xAxisStyle = {
          valueFormatter: time,
          granularityEnabled: true,
          granularity: 1,
          axisMaximum: 5,
          axisMinimum: 0,
          centerAxisLabels: true
        }
    
        return (
          <BarChart
            style={styles.bar}
            xAxis={xAxisStyle}
            chartDescription={{ text: '' }}
            data={dataStyle}
            legend={legendStyle}
            drawValueAboveBar={false}
          />
        )
      }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bar: {
    marginTop: 10,
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Quarter_Year extends Component{
    constructor (props) {
        super(props)
        this.state = {
          pie: {
            title: 'Favorite Food in Jogja',
            detail: { 
              time_value_list: [2017],
              legend_list: ['Sale', 'Service', 'Warranty', 'Upgrade'],
              dataset: {
                Sale: { '2017': 45 },
                Service: { '2017': 15 },
                Warranty: { '2017': 10 },
                Upgrade: { '2017': 30 }
              }
            }
          }
        }
    }

    getRandomColor () {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      }

    render () {
        const time = this.state.pie.detail.time_value_list
        const legend = this.state.pie.detail.legend_list
        const dataset = this.state.pie.detail.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        legend.map((legendValue) => {
          time.map((timeValue) => {
            const datasetValue = dataset[legendValue]
            const datasetTimeValue = datasetValue[timeValue]
    
            valueLegend.push({ value: parseInt(datasetTimeValue), label: legendValue })
          })
          colorLegend.push(processColor(this.getRandomColor()))
        })
    
        const datasetObject = {
          values: valueLegend,
          label: '',
          config: {
            colors: colorLegend,
            valueTextSize: 20,
            valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 13
          }
        }
        dataSetsValue.push(datasetObject)
    
        legendStyle = {
          enabled: true,
          textSize: 12,
          form: 'CIRCLE',
          position: 'BELOW_CHART_RIGHT',
          wordWrapEnabled: true
        }
        dataStyle = {
          dataSets: dataSetsValue
        }
        descStyle = {
          text: '',
          textSize: 15,
          textColor: processColor('darkgray')
        }
    
        return (
          <PieChart
            style={styles.bar}
            chartDescription={descStyle}
            data={dataStyle}
            legend={legendStyle}
            highlights={[{ x: 2 }]} />
        )
      }
}


const TabNavigator = createMaterialTopTabNavigator({
    Quarter_Year: {
        screen: Quarter_Year,
    },
    Month: {
        screen: Month,
    },
    Year:{
        screen: Year,
    }
// },
// {
//     tabBarPosition:'top'
});
// const TabNavigator = createMaterialTopTabNavigator({
//     Quarter_Year: {
//         screen: Quarter_Year,
//         navigationOptions: () => ({
//           tabBarIcon: () => (
//               <MaterialIcons
//                   name='account-balance'
//                   // type='ionicon'
//                   color='#517fa4'
//                   size = {22}
//               />
//           )
//         })
//     },
//     Month: {
//       screen: Month,
//       navigationOptions: () => ({
//         tabBarIcon: () => (
//             <MaterialIcons
//                 name='trending-up'
//                 // type='ionicon'
//                 color='#517fa4'
//                 size = {22}
//             />
//         )
//       })
//   },
//   });

const HomeContainer = createAppContainer(TabNavigator);
export default class RevenueScreen extends Component{
    render(){
        return(
            <MenuProvider>
                <View style = {{flex:1}}>
                    <Header title = 'Analyst' username = 'thanhson'/>
                </View>
                <View style = {{flex:4}}>
                    <HomeContainer/>
                </View>
                
            </MenuProvider>
        )
    }
}