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


const DEFAULT_FORM = {
    _id :'',
    customer_name:'',
    customer:'',
    devices:[],
    serviceType:'',
    customer_id_card:'',
    date:'',
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
            serviceTypes: [],
            customers: [],
            _device_id:'',
            isDisabled:true,
            isRedirect: false,
            tbody: []
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
    }

    componentWillMount(){
        var {match} = this.props;
        if(match.params.id)
        {
            var id = match.params.id;

            this.props.getById(id, (data) => {
                this.setState({
                    ...this.state,
                    form: data
                })
            })
        }
        this.props.findAlldevices({
            all: true
        }, (devices, err) => {
            console.log("devices: ", devices.docs, err)
            if (!err) this.setState({
                ...this.state,
                devices: devices.docs
            })
        });
        this.props.findAllServiceType((serviceTypes, err) => {
            console.log("serviceTypes: ", serviceTypes.docs, err)
            if (!err) this.setState({
                ...this.state,
                serviceTypes: serviceTypes.docs
            })
        });
        this.props.findAllcustomer((customers, err) => {
            console.log(customers, err)
            if (!err) this.setState({
                ...this.state,
                customers
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
        if (name === 'devices') {
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
        if (name === 'customer_id_card') {
            return !(value !== null && value !== "")
        }
    }

    isChange = (event) =>
    {
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

        if(name === 'customer')
        {
            if(value !== null && value !== "" && value !== "None")
            {
                this.props.findCustomerByID(value,(customer, err) => {
                    console.log(customer, err)
                    if (!err) this.setState({
                        form: {
                            ...this.state.form,
                            customer_name : customer.username,
                            customer_id_card: customer._id
                        } 
                    })
                });
            }
            else
            {
                this.setState({
                    form: {
                        ...this.state.form,
                        customer_name : "",
                        customer_id_card: ""
                    },
                    isDisabled:true
                });
            }
        }
    }

    addDevice = (event, id) =>
    {
        event.preventDefault()
        this.props.findDeviceByID(id,(_devices, err) => {
            console.log("Devices: ", _devices)
            if (!err) this.setState({
                form: {
                    ...this.state.form,
                    devices: [
                        ...this.state.form.devices,
                        {
                            computerName: _devices.computerName.name,
                            deviceType: _devices.deviceType.name,
                            guaranteeDuration: _devices.guaranteeDuration,
                            price: _devices.price,
                        }
                    ]
                }
            })
        });
    }

    _deletePolicy = (event, i) => {
        event.preventDefault();
        this.setState({
            tbody: this.state.tbody.filter((item, id) =>  id !== i),
            form: {
                ...this.state.form,
                devices: this.state.form.devices.filter((item, id) => id  !== i)
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
                                        <Label htmlFor="nf-username">Mã khách hàng</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.customer_id_card}
                                            type="username" id="nf-username" name="customer_id_card" placeholder="Nhập mã khách hàng..." autoComplete="current-password" />
                                         {this.state.error.customer_id_card ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên khách hàng</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.customer_name}
                                            type="username" id="nf-username" name="customer_name" placeholder="Nhập tên khách hàng..." autoComplete="current-password" />
                                         {this.state.error.customer_name ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">User Khách hàng</Label>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.customer}
                                                type="select" name="customer" id="select">
                                                    <option value="None">---Chọn---</option>
                                                    {this.state.customers.map((e, id) => 
                                                        <option key={id} value={e._id}>{e.username}</option>
                                                    )}
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">Loại dịch vụ</Label>
                                            <Input 
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
                                            value = {this.state.form.totalPrice}
                                            type="username" id="nf-username" name="totalPrice" placeholder="Nhập tổng tiền..." autoComplete="current-password" />
                                         {this.state.error.totalPrice ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date-input">Ngày dịch vụ</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.date}
                                            type="date" id="date-input" name="date" placeholder="date" />
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
                                            this.state.devices.map((e, id) => 
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
                                    <Label htmlFor="select">Thiết bị</Label>
                                        <InputGroup>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state._device_id}
                                                type="select" name="deviceChoose" id="select">
                                                <option value="None">---Chọn---</option>
                                                {
                                                    this.state.devices.map((e, id) => 
                                                        <option key={id} value={e._id}>
                                                            Tên: {e.computerName.name} --- 
                                                            Loại: {e.deviceType.name} --- 
                                                            Giá: {e.price} --- 
                                                            Thời gian bảo hành: {e.guaranteeDuration}
                                                        </option>
                                                    )
                                                }
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                            <Button type="button" color="primary" onClick = {(e) => this.addDevice(e,this.state._device_id)}>Add</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên máy tính</th>
                                            <th>Loại thiết bị</th>
                                            <th>Giá tiền</th>
                                            <th style={{ width: '20%' }}>Thời gian bảo hành</th>
                                            <th style={{ width: '15%' }}>Hành động</th>
                                        </tr>
                                    }

                                    tbody = {this.state.form.devices.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>
                                                    {item.computerName}
                                                </td>
                                                <td>
                                                    {item.deviceType}
                                                </td>    
                                                <td>
                                                    {item.price}
                                                </td>  
                                                <td>
                                                    {item.guaranteeDuration}
                                                </td>  
                                                <td><Button onClick={(e) => this._deletePolicy(e, key)}>Delete</Button></td>
                                            </tr>
                                        )
                                    })}
                                    hasPagination = {false}
                                />
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" disabled={this.state.isDisabled} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ServiceFormUI
