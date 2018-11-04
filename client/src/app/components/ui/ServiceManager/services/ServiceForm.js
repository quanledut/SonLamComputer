import React, { Component } from 'react';
import Modal from './../../utils/Modal'
import {Redirect} from 'react-router-dom';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
    InputGroupAddon,
    InputGroup
} from 'reactstrap';

import CustomTable from '../../utils/Table'
import { access } from 'fs';

const DEFAULT_FORM = {
    _id :'',
    customer_name:'',
    accessories:[],
    devices: [],
    serviceType:'',
    customer_phone:'',
    totalPrice:0,
    status:false
}

class ServiceFormUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {...DEFAULT_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            devices: [],
            accessoryTypes: [],
            deviceTypes: [],
            computerNames: [],
            serviceTypes: [],
            _device_id:'',
            isDisabled:true,
            isRedirect: false,
            isSell: false,
            isFix: false,
            tbody: []
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)

        this._addAccessory = this._addAccessory.bind(this)
        this._addDevice = this._addDevice.bind(this)
        this._handleAccessories = this._handleAccessories.bind(this)
        this._handleDevices = this._handleDevices.bind(this)
    }

    componentWillMount(){
        var {match} = this.props;
        if(match.params.id)
        {
            var id = match.params.id;

            this.props.getById(id, (data) => {
                console.log("Edit: ", data)
                this.setState({
                    ...this.state,
                    form: data,
                    isFix: data.accessories.length != 0,
                    isSell: data.devices.length != 0,
                })
            })
        }
        this.props.findAllServiceType((serviceTypes, err) => {
            console.log("serviceTypes: ", serviceTypes.docs, err)
            if (!err) this.setState({
                ...this.state,
                serviceTypes: serviceTypes.docs
            })
        });
    }

    onClear = () =>{
        this.setState({
            form: {...DEFAULT_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            _device_id:'',
            isDisabled:true,
            isRedirect: false
        });
    }

    _openModal (modal) {
        this.setState({
          modal: {
            ...this.state.modal,
            ...modal,
            isOpened: true
          }
        })  
    }   
    
    _closeModal () {
        this.setState({
          modal: {
            isOpened: false,
            isLoading: false,
            title: "",
            content: ""
          }
        })
    }

    _findAllComputernames() {
        this.props.findAllComputername({
            all: true
        }, (computerNames, err) => {
            if (!err) this.setState({
                ...this.state,
                computerNames: computerNames.docs
            })
        })
    }


    _findAllAccessoryTypes() {
        this.props.findAllAccessoryTypes({
            all: true
        }, (accessoryTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                accessoryTypes: accessoryTypes.docs
            })
        })
    }

    _findAllDeviceTypes() {
        this.props.findAllDeviceTypes({
            all: true,
        }, (deviceTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                deviceTypes: deviceTypes.docs
            })
        })
    }

    _findDevice(type) {
        this.props.findAllDevices({
            type,
            all: true
        }, (devices, err) => {
            this.setState({
                ...this.state,
                devices: devices.docs
            })
        })
    }

    _findAccessory(computerName, accessoryType, key) {
        this.props.findAllaccessories({
            computerName,
            type: accessoryType,
            all: true
        }, (accessories, err) => {
            const currentAccessoriesState = this.state.form.accessories
            if (!err) currentAccessoriesState[key] = {
                ...currentAccessoriesState[key],
                price: accessories.docs[0].price,
                guaranteeDuration: accessories.docs[0].guaranteeDuration
            }

            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    accessories: currentAccessoriesState
                }
            })
        });
    }

    _addAccessory(event) {
        const key = this.state.tbody.length
        event.preventDefault()
        this.setState({
            form: {
                ...this.state.form,
                accessories: [
                    ...this.state.form.accessories,
                    {
                        computerName: "None",
                        type: "None"
                    }
                ]
            }
        })
    }

    _addDevice(event) {
        event.preventDefault()
        this.setState({
            form: {
                ...this.state.form,
                devices: [
                    ...this.state.form.devices,
                    {
                        name: "None",
                        type: "None"
                    }
                ]
            }
        }, () => {
            console.log(this.state)
        })
    }

    _handleDevices = (e, key) => {
        const {name, value} = e.target
        this.setState({
            form: {
                ...this.state.form,
                devices: this.state.form.devices.map((device, id) => {
                    if (id !== key) return device
                    device[name] = value

                    if (name == "type") {
                        this._findDevice(device.type)
                    } else if (name == "name") {
                        const currentDevice = this.state.devices.filter(i => i._id == value)[0]
                        return {
                            ...device,
                            price: currentDevice.price,
                            guaranteeDuration: currentDevice.guaranteeDuration
                        }
                    }

                    return device
                })
            }
        })
    }

    _handleAccessories = (e, key) => {
        const {name, value} = e.target
        this.setState({
            form: {
                ...this.state.form,
                accessories: this.state.form.accessories.map((accessory, id) => {
                    if (id !== key) return accessory
                    accessory[name] = value
                
                    if (name == "computerName" || name == "type") {
                        if (accessory.computerName && accessory.type) {
                            this._findAccessory(
                                accessory.computerName,
                                accessory.type,
                                key
                            )        
                        }
                    } 

                    return accessory
                })
            }
        })
    }

    onSubmitForm =(event) =>
    {
        
        event.preventDefault();
        this._openModal({
            isLoading: true,
            isOpened: true,
            title: "Loading"
        })

        let {_id} = this.state.form
        if (_id) {
            this.props.update(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Updat success",
                        isLoading: false
                    })
                    this.setState({
                        isRedirect: true
                    })              
                } else {
                    this._openModal({
                        title: "Error",
                        content: error,
                        isLoading: false,
                      })              
                }
            })
        } else {
            this.state.form.accessories = this.state.form.accessories.map(i => {
                return {
                    ...i,
                    computerName: this.state.computerNames.filter(i1 => i1._id == i.computerName)[0].name,
                    type: this.state.accessoryTypes.filter(i1 => i1._id == i.type)[0].name
                }
            })

            this.props.create(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Create success",
                        isLoading: false
                    })
                    this.setState({
                        isRedirect: true
                    })              
                } else{
                    this._openModal({
                        title: "Error",
                        content: error,
                        isLoading: false,
                      })              
                }
            })
        }
    }

    _validate(name, value) {
        const re = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        if (name === 'accessories') {
            return !(value !== null && value !== "" && value !== "None")
        }
        if (name === 'serviceType') {
            return !(value !== null && value !== "" && value !== "None")
        }
        if (name === 'date') {
            return !(value !== null && value !== "")
        }
        if (name === 'totalPrice') {
            return !(re.test(value) && (value > 0))
        }
        if (name === 'customer_name') {
            return !(value !== null && value !== "")
        }
        if (name === 'customer_phone') {
            return !(value !== null && value !== "")
        }
    }

    isChange = (event) =>
    {
        console.log(event.target.value, )
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [name] : value
            }
        });

        if(name === "deviceChoose")
        {
            this.setState({
                _device_id : value
            });
        }

        if (this._validate(name, value)) {
            this.setState({
                error: {
                    ...this.state.error,
                    [name]: true
                }
            })
        } else {
            delete this.state.error[name]
        }


        if (JSON.stringify(this.state.error) === JSON.stringify({})) {
            this.setState({
                isDisabled:false
              })
        }
        else{
            this.setState({
                isDisabled:true
              })
        }

        if (name === "serviceType") {
            let type = this.state.serviceTypes.filter((i) => i._id == value)[0]
            this.setState({
                isSell: false,
                isFix: false
            }, () => {
                console.log(type, this.state)

                if (!type) return;
                type = type.name
     
                if (type === "Mua Bán") {
                    this.setState({
                        isSell: true,
                        form: {
                            ...this.state.form,
                            accessories: []
                        }
                    })

                    if (this.state.deviceTypes.length == 0) {
                        this._findAllDeviceTypes()
                    }
                } else {
                    this.setState({
                        isFix: true,
                        form: {
                            ...this.state.form,
                            devices: []
                        }
                    })

                    if (this.state.computerNames.length == 0) {
                        this._findAllComputernames();
                    }
                    if (this.state.accessoryTypes.length == 0) {
                        this._findAllAccessoryTypes();
                    }

                }    
            })

        }

    }

    _deleteAccessory = (event, i) => {
        event.preventDefault();
        this.setState({
            tbody: this.state.tbody.filter((item, id) =>  id !== i),
            form: {
                ...this.state.form,
                accessories: this.state.form.accessories.filter((item, id) => id  !== i)
            }
        })
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/services/service"/>
            )
        }
        return (
            <div className="animated fadeIn">
                <Modal
                    isOpened={this.state.modal.isOpened}
                    isLoading={this.state.modal.isLoading}
                    title={this.state.modal.title}
                    content={this.state.modal.content}
                    onOkay={this._closeModal}
                    onCancel={this._closeModal} >
                </Modal>

                <Row>
                <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin dịch vụ</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên khách hàng</Label>
                                        <Input 
                                            disabled = {(this.props.match.params.id)?"disabled":""}
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.customer_name}
                                            type="username" id="nf-username" name="customer_name" placeholder="Nhập tên khách hàng..." autoComplete="current-password" />
                                        {this.state.error.customer_name ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Số điện thoại</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            disabled = {(this.props.match.params.id)?"disabled":""}
                                            value = {this.state.form.customer_phone}
                                            type="username" id="nf-username" name="customer_phone" placeholder="Nhập mã số điện thoại..." />
                                         {this.state.error.customer_id_card ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">Loại dịch vụ</Label>
                                            <Input 
                                                disabled = {(this.props.match.params.id)?"disabled":""}
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.serviceType}
                                                type="select" name="serviceType" id="select">
                                                <option value="None">---Chọn---</option>
                                                {
                                                    this.state.serviceTypes.map((e, id) => 
                                                        <option key={id} value={e._id}>{e.name}</option>
                                                    )
                                                }
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tổng tiền</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            disabled = {(this.props.match.params.id)?"disabled":""}
                                            value = {this.state.form.totalPrice}
                                            type="username" id="nf-username" name="totalPrice" placeholder="Nhập tổng tiền..." autoComplete="current-password" />
                                         {this.state.error.totalPrice ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                </Form>
                                {/* <FormGroup>
                                    <Label htmlFor="select">Thiết bị</Label>
                                    <Input 
                                        onChange = {(event) => (this.isChange(event))} 
                                        value = {this.state.form.device}
                                        type="select" name="device" id="select">
                                        <option value="None">---Chọn---</option>
                                        {
                                            this.state.accessories.map((e, id) => 
                                                <option key={id} value={e._id}>
                                                    Tên: {e.computerName.name} --- 
                                                    Loại: {e.deviceType.name} --- 
                                                    Giá: {e.price} --- 
                                                    Thời gian bảo hành: {e.guaranteeDuration}
                                                </option>
                                            )
                                        }
                                    </Input>
                                </FormGroup> */}
                                <hr/>
                                <FormGroup row>
                                    <Col md="12">
                                        {
                                            ((!this.state.isFix && !this.state.isSell) &&
                                                <FormText className="help-block"><span style={{color: "red"}}>Vui lòng loại dịch vụ!</span></FormText>
                                            ) 
                                        }
                                        {
                                            (this.state.isSell) && 
                                            <Label htmlFor="select">Thiết bị mua bán</Label>
                                        } 
                                        {
                                            (this.state.isFix) && 
                                            <Label htmlFor="select">Linh kiện sữa chữa / thay thế</Label>
                                        }
                                    </Col>
                                </FormGroup>
                                <CustomTable
                                        thead = {
                                            (this.state.isFix) 
                                                ? (<tr>
                                                    <th>Tên máy tính</th>
                                                    <th>Loại linh kiện</th>
                                                    <th>Giá tiền</th>
                                                    <th style={{ width: '20%' }}>Thời gian bảo hành</th>
                                                    <th style={{ width: '15%' }}>
                                                    {
                                                        (!this.props.match.params.id) &&
                                                    <Button onClick={this._addAccessory}><i className="fa fa-plus"></i></Button>
                                                        
                                                    }
                                                    </th>
                                                </tr>)
                                                : (this.state.isSell) ? 
                                                    (
                                                        <tr>
                                                        <th>Tên thiết bị</th>
                                                        <th>Loại thiết bị</th>
                                                        <th>Giá tiền</th>
                                                        <th style={{ width: '20%' }}>Thời gian bảo hành</th>
                                                        <th style={{ width: '15%' }}>
                                                        {
                                                            (!this.props.match.params.id) &&
                                                            <Button onClick={this._addDevice}><i className="fa fa-plus"></i></Button>
                                                        }
                                                        </th>
                                                        </tr>
                                                    )
                                                : {}
                                        }

                                        tbody = {
                                            (!this.props.match.params.id) 
                                                ?  (this.state.isFix) 
                                                    ? this.state.form.accessories.map((item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                        <td>
                                                            <Input value={item.computerName} onChange={(e) => this._handleAccessories(e, key)} type="select" name="computerName" id="exampleSelect">
                                                                <option value="None">Hãy chọn loại máy tính</option>
                                                                {this.state.computerNames.map((i1, id)=> <option key={id} value={i1._id}>{i1.name}</option>)}
                                                            </Input>
                                                        </td>
                                                        <td>
                                                            <Input value={item.type} onChange={(e) => this._handleAccessories(e, key)} type="select" name="type" id="exampleSelect">
                                                                    <option value="None">Hãy chọn loại thiết bị</option>
                                                                    {this.state.accessoryTypes.map((i1, id)=> <option key={id} value={i1._id}>{i1.name}</option>)}
                                                            </Input>
                                                        </td>
                                                        <td>
                                                            {   
                                                                (!item.type || !item.computerName || item.computerName == "None" || item.type == "None") &&
                                                                <p>Xin hãy chọn loại thiết bị và loại máy tính</p>
                                                                
                                                            }

                                                            {
                                                                (item.type && item.computerName && item.type != "None" && item.computerName != "None") &&
                                                                <Input value={item.price} onChange={(e) => this._handleAccessories(e, key)} type="text" name="price" id="exampleSelect">
                                                                </Input>

                                                            }
                                                        </td>
                                                        <td>
                                                            {   
                                                                (!item.type || !item.computerName || item.computerName == "None" || item.type == "None") &&
                                                                <p>Xin hãy chọn loại thiết bị và loại máy tính</p>
                                                                
                                                            }

                                                            {
                                                                (item.type && item.computerName && item.type != "None" && item.computerName != "None") &&
                                                                <Input value={item.guaranteeDuration} onChange={(e) => this._handleAccessories(e, key)} type="text" name="guaranteeDuration" id="exampleSelect">
                                                                </Input>

                                                            }
                                                        </td>

                                                        <td><Button onClick={(e) => this._deleteAccessory(e, key)}>Delete</Button></td>
                                                        </tr>
                                                    )
                                                    }) 
                                                    : (this.state.isSell) 
                                                        ? this.state.form.devices.map((item, key) => {
                                                            return (<tr key={key}>
                                                                <td>
                                                                    <Input value={item.type} onChange={(e) => this._handleDevices(e, key)} type="select" name="type" id="exampleSelect">
                                                                            <option value="None">Hãy chọn loại thiết bị</option>
                                                                            {this.state.deviceTypes.map((i1, id)=> <option key={id} value={i1._id}>{i1.name}</option>)}
                                                                    </Input>
                                                                </td>
                                                                <td>
                                                                    {   
                                                                        (!item.type || item.type == "None") &&
                                                                        <p>Xin hãy chọn loại thiết</p>
                                                                        
                                                                    }

                                                                    {
                                                                        (item.type && item.type != "None") &&
                                                                        <Input value={item.name} onChange={(e) => this._handleDevices(e, key)} type="select" name="name" id="exampleSelect">
                                                                            <option value="None">Hãy chọn thiết bị</option>
                                                                            {this.state.devices.map((i1, id)=> <option key={id} value={i1._id}>{i1.name}</option>)}
                                                                        </Input>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {   
                                                                        (!item.name || item.name == "None") &&
                                                                        <p>Xin hãy chọn thiết bị</p>
                                                                        
                                                                    }

                                                                    {
                                                                        (item.name && item.name != "None") &&
                                                                        <Input value={item.price} onChange={(e) => this._handleDevices(e, key)} type="text" name="price" id="exampleSelect">
                                                                        </Input>

                                                                    }
                                                                </td>
                                                                <td>
                                                                    {   
                                                                        (!item.name || item.name == "None") &&
                                                                        <p>Xin hãy chọn thiết bị</p>
                                                                        
                                                                    }

                                                                    {
                                                                        (item.name && item.name != "None") &&
                                                                        <Input value={item.guaranteeDuration} onChange={(e) => this._handleDevices(e, key)} type="text" name="guaranteeDuration" id="exampleSelect">
                                                                        </Input>

                                                                    }
                                                                </td>

                                                                <td><Button onClick={(e) => this._deleteAccessory(e, key)}>Delete</Button></td>
                                                            </tr>)
                                                        })
                                                        : []

                                                : (this.state.isFix) 
                                                    ? this.state.form.accessories.map((item, key) => {
                                                        return (<tr key={key}>
                                                                <td>
                                                                    {item.computerName}
                                                                </td>
                                                                <td>
                                                                    {item.type}
                                                                </td>
                                                                <td>
                                                                    {item.price}
                                                                </td>
                                                                <td>
                                                                    {item.guaranteeDuration}
                                                                </td>
                                                                <td></td>

                                                            </tr>)
                                                    })
                                                    : this.state.form.devices.map((item, key) => {
                                                        return (<tr key={key}>
                                                                <td>
                                                                    {item.type}
                                                                </td>
                                                                <td>
                                                                    {item.name}
                                                                </td>
                                                                <td>
                                                                    {item.price}
                                                                </td>
                                                                <td>
                                                                    {item.guaranteeDuration}
                                                                </td>
                                                                <td></td>

                                                            </tr>)
                                                    })
                                        }
                                        hasPagination = {false}

                                        isShow = {this.state.isFix || this.state.isSell}
                                />
                                
                            </CardBody>
                            {
                                (!this.props.match.params.id) && 
                                <CardFooter>
                                    <Button type="submit" size="sm" color="primary" disabled={this.state.isDisabled} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                    <Button type="reset" size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                </CardFooter>
                            }
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ServiceFormUI
