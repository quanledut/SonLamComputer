import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Modal from '../utils/Modal'
import * as notifications from '../../../constants/Notifications'

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
    _id :'',
    email :'',
    password: '',
    username :'',
    gender : '',
    address :'',
    select:'',
    phone: '',
    fullname: '',
}


class UserFormUI extends Component {
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
            roles: [],
            isDisabled:true,
            isRedirect: false,
            formErrors: {email: '',password: '',username: '', gender:'',select:'',fullname:'',phone:''},
            emailValid: false,
            passwordValid: false,
            usernameValid: false,
            genderValid: false,
            selectValid: false,
            fullnameValid: false,
            phoneValid: false,
            formValid: false
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
                    form: data
                })
            })
        }
        this.props.findAllRoles((roles, err) => {
            console.log(roles, err)
            if (!err) this.setState({
                ...this.state,
                roles
            })
        })
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
            isDisabled:true,
            isRedirect: false,
            formErrors: {email: '',password: '',username: '', gender:'',select:'',fullname:'',phone:''},
            emailValid: false,
            passwordValid: false,
            usernameValid: false,
            genderValid: false,
            selectValid: false,
            fullnameValid: false,
            phoneValid: false,
            formValid: false
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
                        content: notifications.ERROR_EDIT,
                        isLoading: false,
                      })              
                }
            })
        } else {
            this.props.createUser(this.state.form, (res, error) => {
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
                        content: notifications.ERROR_NEW,
                        isLoading: false,
                      })              
                }
            })
        }
    }

    _validate(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let genderValid = this.state.genderValid;
        let selectValid = this.state.selectValid;
        let fullnameValid = this.state.fullnameValid;
        let phoneValid = this.state.phoneValid;

        const sdt = /^\+?(?:[0-9] ?){8,14}[0-9]$/;
        const email_check = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const reg_username = /^[a-zA-Z0-9]+$/;

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
          case 'password':
            passwordValid = value.length >6 && value.length <= 50;
            fieldValidationErrors.password = passwordValid ? '': ' Vui lòng nhập mật khẩu trong khoảng 6-50 ký tự!';
            break;
          case 'username':
            usernameValid = value.length >6 && value.length <= 50;
            if(!usernameValid)
            {
                fieldValidationErrors.username = usernameValid ? '': ' Vui lòng nhập tài khoản trong khoảng 6-50 ký tự!';
            }else
            {
                usernameValid = value.match(/^[a-zA-Z0-9]+$/);
                fieldValidationErrors.username = usernameValid ? '': ' Vui lòng không nhập ký tự đặc biệt!';
            }
            break;
          case 'fullname':
            fullnameValid = value.length > 6 && value.length <= 50;
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
          case 'select':
            selectValid = (value !== null && value !== "");
            fieldValidationErrors.select = selectValid ? '' : 'Vui lòng chọn phân quyền!';
            break;
          
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        selectValid: selectValid,
                        phoneValid: phoneValid,
                        genderValid: genderValid,
                        fullnameValid: fullnameValid,
                        usernameValid: usernameValid,
                        passwordValid: passwordValid,
                        emailValid: emailValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.selectValid && this.state.phoneValid && 
                        this.state.genderValid && this.state.fullnameValid && this.state.usernameValid &&
                        this.state.passwordValid && this.state.emailValid
                    });
      }

    // _validate(name, value) {
    //     if (name === 'email') {
    //         const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    //         return !pattern.test(value);
    //     } else if (name === 'username') {
    //         return !value.match(/^[a-zA-Z0-9]+$/)
    //     } else {
    //         return value === "" || value === null
    //     }
    // }


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


        // if (JSON.stringify(this.state.error) === JSON.stringify({})) {
        //     this.setState({
        //         isDisabled:false
        //       })
  
        // }
    }

    render() {
        if(this.state.redirect)
        {
            return(
                <Redirect to="/usermanager"/>
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
                                <strong>Thông tin đăng nhập</strong>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.onSubmitForm}>
                                    <FormGroup>
                                        <Label htmlFor="nf-email">Email</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.email}
                                            type="email" id="nf-email" name="email" placeholder="Enter Email.." autoComplete="email" />
                                        {this.state.formErrors.email ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.email}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Mật khẩu</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.password}
                                            type="password" id="nf-password" name="password" placeholder="Enter Password.." autoComplete="current-password" />
                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                        {this.state.formErrors.password ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.password}</span></FormText> : ''}  
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên đăng nhập</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.username}
                                            type="text" id="nf-username" name="username" placeholder="Enter UserName.." autoComplete="current-password" />
                                        {this.state.formErrors.username ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.username}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-fullname">Tên người dùng</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.fullname}
                                            type="text" id="nf-fullname" name="fullname" placeholder="Enter FullName.." autoComplete="current-password" />
                                        {this.state.formErrors.fullname ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.fullname}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Giới tính</Label>
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
                                        <FormGroup check inline>
                                            <Input 
                                                className="form-check-input" 
                                                type="radio" 
                                                id="inline-radio3" 
                                                name="gender" 
                                                value="khac" 
                                                onChange = {(event) => (this.isChange(event))} 
                                                checked={this.state.form.gender === "khac"}/>
                                            <Label className="form-check-label" check htmlFor="inline-radio3">Khác</Label>
                                        </FormGroup>
                                        {this.state.formErrors.gender ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.gender}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-phone">Số điện thoại</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.phone}
                                            type="text" id="nf-phone" name="phone" placeholder="Enter Phone.." autoComplete="current-password" />
                                        {this.state.formErrors.phone ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.phone}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Phân quyền</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.select}
                                            type="select" name="roles" id="select">
                                            {
                                                this.state.roles.map((e, id) => 
                                                    <option key={id} value={e._id}>{e.name}</option>
                                                )
                                            }
                                        </Input>
                                        {this.state.formErrors.select ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.select}</span></FormText> : ''} 
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="primary" disabled={!this.state.formValid} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserFormUI