import React, { Component } from 'react';
import Modal from './../utils/Modal'
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
    Input,
    Label,
    Row,
} from 'reactstrap';

import CustomTable from '../utils/Table'

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

class PaymentFormUI extends Component {

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
            isRedirect: false,
            tbody: [],
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
            this.setState({
                form : {
                    ...this.state.form,
                    status: true
                }
            });
              
            this.props.updateStatus(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Thanh toán thành công!",
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
        }
    }

    onClear = () =>{
        this.props.history.push("/payments");
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/payments"/>
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
                                <strong>Chi tiết thanh toán</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Mã khách hàng</Label>
                                        <Input value = {this.state.form.customer_id_card}
                                            type="username" id="nf-username" name="customer_id_card" autoComplete="current-password" readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên khách hàng</Label>
                                        <Input value = {this.state.form.customer_name}
                                            type="username" id="nf-username" name="customer_name" autoComplete="current-password" readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">User Khách hàng</Label>
                                            <Input value = {this.state.form.customer}
                                                type="username" id="nf-username" name="customer" autoComplete="current-password" readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">Loại dịch vụ</Label>
                                            <Input 
                                                value = {this.state.form.serviceType}
                                                type="username" id="nf-username" name="serviceType" autoComplete="current-password" readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tổng tiền</Label>
                                        <Input value = {this.state.form.totalPrice}
                                            type="username" id="nf-username" name="totalPrice" autoComplete="current-password" readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date-input">Ngày dịch vụ</Label>
                                        <Input value = {this.state.form.date}
                                            type="date" id="date-input" name="date" placeholder="date" readOnly/>
                                    </FormGroup>
                                </Form>
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên máy tính</th>
                                            <th>Loại thiết bị</th>
                                            <th>Giá tiền</th>
                                            <th style={{ width: '20%' }}>Thời gian bảo hành</th>
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
                                            </tr>
                                        )
                                    })}
                                    hasPagination = {false}
                                />
                            </CardBody>
                            <CardFooter>
                                {this.state.form.status ? null
                                    :
                                    <Button type="submit" size="sm" color="primary" 
                                        onClick={this.onSubmitForm}>
                                        <i className="fa fa-dot-circle-o"></i> 
                                        Thanh toán
                                    </Button>
                                    
                                }
                                <Button type="reset" size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Trở về</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PaymentFormUI
