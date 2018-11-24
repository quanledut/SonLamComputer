import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Dimensions, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as AuthAction from '../../actions/auth'
import { BASE_URL } from '../../config'
import { withNavigation } from 'react-navigation';


import * as DeviceAction from '../../actions/deviceName'



// import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import colors from '../../styles/colors'

const GET_SIZE = (percentage, isWidth) => {
    return isWidth ? percentage * SCREEN_WIDTH : percentage * SCREEN_HEIGHT
}

class ProductViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            itemData: [],
            page: 1,
            itemPerPage: 10,
            error: null,
            refreshing: false,
            scrollViewOffset: 0,
            enableScrollViewScroll: true
          };

        this.renderFooter = this.renderFooter.bind(this);
        this.loadmore = this.loadmore.bind(this);
        this.find = this.find.bind(this);
    }

    componentDidMount() {
        console.log("Props:" ,this.props);
        this.makeRemoteRequest();
    }

    fakeData(page, itemPerPage) {
        let array = [];
        for (let i = 0; i < itemPerPage; i++) {
            array.push({
                _id: (page - 1) * itemPerPage + i + "",
                name: "Test",
                image_url: "/images/accessory_battery.jpg",
                price: 0,
            })
        }

        array = array.reduce((a, item, id) => {
            const newItem = {
                ...item,
                image_url: BASE_URL + item.image_url
            }

            if (id % 2 === 0) a.push([newItem])
            else {
                a[a.length - 1].push(newItem)
            }

            return a
        }, [])

        return array
    }

    find(page, itemPerPage, cb) {

        this.props.find({
            page,
            limit: itemPerPage
        }, (res, err) => {
            cb(res.docs.reduce((a, item, id) => {
                const newItem = {
                    ...item,
                    image_url: BASE_URL + item.image_url
                }
    
                if (id % 2 === 0) a.push([newItem])
                else {
                    a[a.length - 1].push(newItem)
                }
    
                return a
            }, []), err);
        })
    }

    makeRemoteRequest() {
        const { page, itemPerPage } = this.state;
        this.setState({
            loading: true
        });


        this.find(page, itemPerPage, (data, err) => {
            if (!err)
                this.setState({
                    data: page === 1 ? [...data] : [...this.state.data, ...data],
                    loading: false,
                    page: page + 1
                })       
            // if (err) console.log(err);
    
        })
    }

    loadmore() {
        // console.log(this.state.data.length, this.state.page)
        // if (this.state.data.length >= this.state.page * this.state.itemPerPage) {
        //     this.setState({
        //         data: this.state.data.slice(0, this.state.page * this.state.itemPerPage)
        //     })
        // }
        // else 
        if (this.state.loading) return;
        this.makeRemoteRequest()
    }


    renderFooter() {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }


    render() {
        const { navigation } = this.props
        return (
            <View      
                onStartShouldSetResponderCapture={() => {
                    this.setState({ enableScrollViewScroll: true });
                }}>
                <ScrollView scrollEnabled={this.state.enableScrollViewScroll} 
                    onScroll={(e) => {
                        console.log("In scrollview", e.nativeEvent.contentOffset.y)
                        this.setState({
                            ...this.state,
                            scrollViewOffset: e.nativeEvent.contentOffset.y
                        })
                    }}
                    style={{backgroundColor: "rgb(240,240,240)"}}>
                    <ImageBackground source={require('../../../assets/images/headerbg_product.jpg')} style={styles.headerContainer}>
                        
                    </ImageBackground>
                    <View style={{flex: 1, marginTop: 10}}>
                        <Text style={{flex: 1 , padding: 10, backgroundColor: "white", fontSize: 25, fontWeight: 'bold', color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular'}}>
                        Danh mục
                        </Text>
                        <View style={{flex: 1, marginTop: 10, backgroundColor: "white", width: SCREEN_WIDTH}}>
                            <ScrollView
                                style={{flex: 1}}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <View style={{flex:1, flexDirection: 'row'}}>
                                        <View style={{}}>
                                            <Image
                                                style={styles.categoryItemImage}
                                                source={require('../../../assets/images/products/laptop.jpg')}
                                            >
                                            </Image>
                                            <Text style={styles.categoryItemText}>Laptop</Text>
                                        </View>
                                        <View style={styles.categoryItem}>
                                            <Image
                                                style={styles.categoryItemImage}
                                                source={require('../../../assets/images/products/keyboard.jpg')}
                                            >
                                            </Image>
                                            <Text style={styles.categoryItemText}>Ban phim</Text>
                                        </View>
                                        <View style={styles.categoryItem}>
                                            <Image
                                                style={styles.categoryItemImage}
                                                source={require('../../../assets/images/products/mouse.jpg')}
                                            >
                                            </Image>
                                            <Text style={styles.categoryItemText}>Chuot</Text>
                                        </View>
                                        <View style={styles.categoryItem}>
                                            <Image
                                                style={styles.categoryItemImage}
                                                source={require('../../../assets/images/products/ssd.jpg')}
                                            >
                                            </Image>
                                            <Text style={styles.categoryItemText}>SSD</Text>
                                        </View>
                                        <View style={styles.categoryItem}>
                                            <Image
                                                style={styles.categoryItemImage}
                                                source={require('../../../assets/images/products/hdd.jpg')}
                                            >
                                            </Image>
                                            <Text style={styles.categoryItemText}>HDD</Text>
                                        </View>

                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{flex: 1, marginTop: 10}}>
                        <Text style={{flex: 1, padding: 10, backgroundColor: "white", fontSize: 25, fontWeight: 'bold', color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular'}}>
                        San pham
                        </Text>
                        <View
                            onStartShouldSetResponderCapture = {() => {
                                if (this.state.data.length == 0) return;
                                if (this.state.scrollViewOffset === 0 && this.state.enableScrollViewScroll === false) {
                                    console.log("Disable flat list")
                                    this.setState({ 
                                        enableScrollViewScroll: true,
                                        page: 1,
                                    });
                                } else if (this.state.scrollViewOffset >= SCREEN_HEIGHT * 3 / 4){
                                    console.log("Enable flat list")
                                    this.setState({ enableScrollViewScroll: false });
                                }  

                            }}

                            style={{height: SCREEN_HEIGHT}}
                        >
                            <FlatList 
                                    style={{marginTop: 10, flex:1, padding: 10}}
                                    data={this.state.data}
                                    keyExtractor={(item, index) => item[0]._id}
                                    renderItem={({item}) => {
                                        return (
                                            <View style={{flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                                <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetail', {
                                                    id: item[0]._id
                                                })}>
                                                    <Image
                                                        style={styles.productItemImage}
                                                        source={{uri: item[0].image_url}}
                                                    >
                                                    </Image>
                                                    <View style={styles.productDescription}>
                                                        <Text style={styles.productItemName} numberOfLines={2}>
                                                                {item[0].name}
                                                        </Text>
                                                        <Text style={styles.productItemPrice}>
                                                                {item[0].price} đ
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetail', {
                                                    id: item[1]._id
                                                })}>
                                                    <Image
                                                        style={styles.productItemImage}
                                                        source={{uri: item[1].image_url}}
                                                    >
                                                    </Image>
                                                    <View style={styles.productDescription}>
                                                        <Text style={styles.productItemName} numberOfLines={2}>
                                                                {item[1].name}
                                                        </Text>
                                                        <Text style={styles.productItemPrice} >
                                                                {item[1].price} đ
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}

                                    onScroll={(e) => {
                                        console.log("In flat list", e.nativeEvent.contentOffset.y)
                                        this.setState({
                                            scrollViewOffset: e.nativeEvent.contentOffset.y
                                        })

                                        // if (e.nativeEvent.contentOffset.y === 0) {
                                        //     this.setState({
                                        //         enableScrollViewScroll: true,
                                        //         page: 1
                                        //     })
                                        // }
                                    }}

                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadmore}
                                    onEndReachedThreshold={1}
                                    >

                            </FlatList>
                        </View>
                    </View>
                </ScrollView>
            </View>)
    }
}

// export default ProductViews;

const mapDispatchToProps = (dispatch) => {
    return ({
        find: (query, cb) => {
            dispatch(DeviceAction.findAllRequest(query, cb))
        }
    })
}


export default connect(null, mapDispatchToProps)(withNavigation(ProductViews))

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    productItem: {width: GET_SIZE(0.5, 1)-20, flex: 0, alignItems: 'center', marginTop: 5},
    productItemImage: {width: GET_SIZE(0.5, 1)-15, height: GET_SIZE(0.2)},
    productDescription: {backgroundColor: 'white', },
    productItemName: {width: GET_SIZE(0.5, 1)-15, fontSize: 20, padding: 10},
    productItemPrice: {width: GET_SIZE(0.5, 1)-15, fontSize: 15, padding: 10}

  });
  