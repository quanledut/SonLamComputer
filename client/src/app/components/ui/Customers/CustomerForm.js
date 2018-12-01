import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Modal from '../utils/Modal'
import * as notifications from '../../../constants/Notifications'
import CustomTable from '../utils/Table'

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
} from 'reactstrap';

const DEFAULT_FORM = {
    _id: '',
    email :'',
    customer_no: '',
    gender : '',
    address :'',
    phone: '',
    fullname: '',
    date:''
}

class CustomerFormUI extends Component {
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
            formErrors: {email: '', gender:'',fullname:'',phone:'',address:''},
            emailValid: false,
            genderValid: false,
            fullnameValid: false,
            phoneValid: false,
            addressValid: false
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
            this.props.getUserById(id, (data) => {
                this.setState({
                    ...this.state,
                    form: data,
                    isEdit: true
                })
            })
        }
    }

    onClear = () =>{
        this.setState({
            form: {...DEFAULT_FORM},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            formErrors: {email: '',address : '', gender:'',fullname:'',phone:''},
            emailValid: false,
            genderValid: false,
            fullnameValid: false,
            phoneValid: false,
            addressValid: false
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
        for (let name in this.state.form) {
            this._validate(name, this.state.form[name])
        }

        var check = true;
        for (let name in this.state.formErrors) {
            if (this.state.formErrors[name] !== "") {
                check = false;
            }
        }

        if (!check) {
            this._openModal({
                title: "Error",
                content: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
                isLoading: false,
            })
            return;
        }

        this._openModal({
            isLoading: true,
            isOpened: true,
            title: "Loading"
        })

        let {_id} = this.state.form
        if (_id) {
            this.props.updateUser(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: notifications.SUCCESS_EDIT,
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
                        content: notifications.SUCCESS_NEW,
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

    _validate(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let addressValid = this.state.addressValid;
        let genderValid = this.state.genderValid;
        let fullnameValid = this.state.fullnameValid;
        let phoneValid = this.state.phoneValid;

        const sdt = /^\+?(?:[0-9] ?){8,14}[0-9]$/;
        const email_check = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;

        switch(fieldName) {
          case 'email':
            emailValid = value.length >0;
            if(!emailValid)
            {
                fieldValidationErrors.email = emailValid ? '': ' Vui lòng nhập email!';
            }else
            {
                emailValid = email_check.test(value);
                fieldValidationErrors.email = emailValid ? '': ' Vui lòng nhập đúng định dạng email!';
            }
            break;
          case 'fullname':
            fullnameValid = value.length > 0;
            fieldValidationErrors.fullname = fullnameValid ? '': 'Vui lòng nhập tên người dùng trong khoảng 6-50 ký tự!';
            break;
          case 'gender':
            genderValid = (value !== null && value !== "");
            fieldValidationErrors.gender = genderValid ? '' : 'Vui lòng chọn giới tính!';
            break;
          case 'phone':
            phoneValid = (value.length > 0);
            if(!phoneValid)
            {
                fieldValidationErrors.phone = phoneValid ? '': 'Vui lòng nhập số điện thoại!';
            }else
            {
                phoneValid = sdt.test(value);
                fieldValidationErrors.phone = phoneValid ? '': 'Định dạng số điện thoại không đúng!';
            }
            break;

          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors});
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

        this._validate(name, value)
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/customers"/>
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
                                    <strong>Thông tin khách hàng</strong>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.onSubmitForm}>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="nf-customer_no">Mã khách hàng</Label>
                                                <Input 
                                                    onChange = {(event) => (this.isChange(event))} 
                                                    value = {this.state.form.customer_no}
                                                    type="text" id="nf-customer_no" name="customer_no" placeholder="Mã mặc định" 
                                                    disabled/>
                                            </FormGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-fullname">Tên khách hàng</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.fullname}
                                                type="text" id="nf-fullname" name="fullname" placeholder="Enter FullName.." autoComplete="current-customer_no" />
                                            {this.state.formErrors.fullname ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.fullname}</span></FormText> : ''} 
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-phone">Số điện thoại</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.phone}
                                                type="text" id="nf-phone" name="phone" placeholder="Enter Phone.." autoComplete="current-customer_no" />
                                            {this.state.formErrors.phone ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.phone}</span></FormText> : ''} 
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-phone">Ngày sinh</Label>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.date}
                                                type="date" 
                                                id="date-input" 
                                                name="date" 
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-username">Địa chỉ</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.address}
                                                type="text" id="nf-username" name="address"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-email">Email</Label>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.email}
                                                type="email" id="nf-email" name="email"/>
                                            {this.state.formErrors.email ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.email}</span></FormText> : ''} 
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Giới tính</Label>
                                            {this.state.formErrors.gender ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.gender}</span></FormText> : ''} 
                                            &nbsp;
                                            <FormGroup check inline>
                                                <Input 
                                                    className="form-check-input" 
                                                    type="radio" id="inline-radio1" 
                                                    name="gender" value="nam" 
                                                    onChange = {(event) => (this.isChange(event))} 
                                                    checked={this.state.form.gender === "nam"}/>
                                                <Label className="form-check-label" check htmlFor="inline-radio2">Nam</Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    id="inline-radio2" 
                                                    name="gender" 
                                                    value="nu" 
                                                    onChange = {(event) => (this.isChange(event))} 
                                                    checked={this.state.form.gender === "nu"}/>
                                                <Label className="form-check-label" check htmlFor="inline-radio2">Nữ</Label>
                                            </FormGroup>
                                        </FormGroup>
                                        
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                    <Button size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                </CardFooter>
                            </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CustomerFormUI