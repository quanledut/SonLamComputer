import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as AuthAction from '../../actions/auth'
import { BASE_URL } from '../../config'

import * as DeviceAction from '../../actions/deviceName'

// import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import colors from '../../styles/colors'

const GET_SIZE = (percentage, isWidth) => {
    return isWidth ? percentage * SCREEN_WIDTH : percentage * SCREEN_HEIGHT
}

class ProductViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null,
            itemData: [],
            page: 1,
            itemPerPage: 10,
            error: null,
            refreshing: false,
            scrollViewOffset: 0,
            enableScrollViewScroll: true
          };
    }

    componentDidMount() {
        // this.makeRemoteRequest();
        const itemId = this.props.navigation.getParam('id');
        this.getProductDetail(itemId, (data, err) => {
            this.setState({
                data
            })
        })
    }

    getProductDetail(id, cb) {
        this.props.findById(id, (data, err) => {
            data.image_url = BASE_URL + data.image_url;
            data.description = data.description.map(i => i.split(":")).reduce((array, i) => {
                if (i[1]) {
                    array.push(i)
                } else {
                    const otherId = array.findIndex(i1 => i1[0] === 'Khác');
                    if (otherId !== -1) {
                        array[otherId][1].push(i[0]);
                    } else {
                        array[otherId] = ['Khác', [i[0]]]
                    }
                }
    
                return array;
            }, [])

            cb(data, null)
        })
    }




    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{height: GET_SIZE(1) - 30}}>
                    {
                        this.state.data &&
                        (
                        <View>
                            <View style={styles.productItem}>
                                <Image 
                                    style={styles.productItemImage} 
                                    source={{uri: this.state.data.image_url}}
                                    ></Image>
                                <View style={{padding: 20}}>
                                    <Text style={styles.productItemName}>
                                        {this.state.data.name}
                                    </Text>
                                    <Text style={styles.productItemPrice} >
                                        {this.state.data.price} đ
                                    </Text>
                                </View>
                            </View>
                            {/* <View>
                                <View style={style.table}>
                                    {
                                        this.state.data.description.map((i, id) => {
                                            let name, content;

                                            name = i[0];

                                            if (name === 'Khác') {
                                                content = i[1].map((j, id1) => {
                                                    return <Text key={id1} style={styles.tableContentText}>{j}</Text>
                                                })
                                            } else {
                                                content = <Text style={styles.tableContentText}>{i[1]}</Text>
                                            }

                                            return (
                                                <View key={id} style={styles.tableRow}>
                                                    <View style={styles.talbeCol}>
                                                        {name}
                                                    </View>
                                                    <View style={styles.talbeCol}>
                                                        {content}
                                                    </View>
                                                </View>
                                            )

                                        })
                                    }
                                </View>
                            </View> */}
                        </View>
                        )
                    }
                </ScrollView>
                <View style={{flex: 0, height: 50, width: GET_SIZE(1, 1), justifyContent: 'flex-end',}}>
                    <View style={{flexDirection:"row"}}>
                        <Button 
                            icon={<Icon style={{fontSize: 30}} name='comments'></Icon>}
                            buttonStyle={
                                {
                                    backgroundColor: 'green',
                                    height: 50,
                                    width: GET_SIZE(0.25, 1)
                                }
                            }
                            title=''

                        />
                        <Button 
                            icon={<Icon style={{fontSize: 30}} name='shopping-cart'></Icon>}
                            buttonStyle={
                                {
                                    backgroundColor: 'green',
                                    height: 50,
                                    width: GET_SIZE(0.25, 1)

                                }
                            }
                            title=''
                        />
                        <Button 
                            buttonStyle={
                                {
                                    backgroundColor: 'red',
                                    height: 50,
                                    width: GET_SIZE(0.5, 1),
                                }
                            }
                            fontSize= {30}
                            title='Mua ngay'
                        />
                    </View>
                </View>
            </View>

        )
    }
}

// export default ProductViewDetail;

const mapDispatchToProps = (dispatch) => {
    return ({
        findById: (id, cb) => {
            dispatch(DeviceAction.findByIdRequest(id, cb))
        }
    })
}

export default connect(null, mapDispatchToProps)(ProductViewDetail)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: GET_SIZE(1),
      width: GET_SIZE(1, 1),
      backgroundColor: "rgb(240,240,240)"
    },
    list: {
      marginTop: 20,
      borderTopWidth: 1,
      borderColor: colors.greyOutline,
      backgroundColor: '#fff',
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      height: GET_SIZE(0.33)
    //   backgroundColor: '#FD6B78',
    },
    categoryItem: {
        alignItems: 'center', width: GET_SIZE(0.3, 1), height: GET_SIZE(0.2)
    },
    categoryItemText: {
        marginTop: 15, fontSize: 15, textAlign: "center"
    },
    categoryItemImage: {
        width: 100, height: 100, borderRadius: 100
    },
    productItem: {width: GET_SIZE(1, 1), flex: 0, alignItems: 'center', marginTop: 5},
    productItemImage: {width: GET_SIZE(1, 1), height: GET_SIZE(0.6)},
    productDescription: {backgroundColor: 'white', },
    productItemName: {width: GET_SIZE(1, 1), fontSize: 25, paddingLeft : 10, paddingRight : 10, fontWeight: 'bold'},
    productItemPrice: {width: GET_SIZE(1, 1), fontSize: 20, paddingLeft : 10, paddingRight : 10},
    table: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    tableRow: {
        flex: 1, alignSelf: 'stretch', flexDirection: 'row'
    },
    tableCol: {
        flex: 1, alignSelf: 'stretch'
    },
    tableContentText: {}
  });
  