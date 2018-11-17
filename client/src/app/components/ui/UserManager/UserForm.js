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
    password: '',
    retype_password: '',
    username :'',
    gender : '',
    // address :'',
    // select:'',
    phone: '',
    fullname: '',
    roles: [],
}

const DEFAULT_PASSWORD_FORM = {
    _id: '',
    oldPassword: '',
    confirmPassword: '',
    newPassword: ''
}


class UserFormUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {...DEFAULT_FORM},
            passwordForm: {...DEFAULT_PASSWORD_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            roles: [],
            isRedirect: false,
            isEdit: false,
            isChangePassword: false,
            formErrors: {email: '',password: '',username: '', gender:'',select:'',fullname:'',phone:'',retype_password:''},
            emailValid: false,
            passwordValid: false,
            usernameValid: false,
            genderValid: false,
            selectValid: false,
            fullnameValid: false,
            phoneValid: false,
            retype_passwordValid:false,
            formValid: true
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this._addRole = this._addRole.bind(this)
        this._deleteRole = this._deleteRole.bind(this)
    }

    componentWillMount(){
        var {match} = this.props;
        console.log(match.params);
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

        if(match.params.isChangePassword === "1") {
            this.setState({
                ...this.state,
                passwordForm: {
                    ...this.state.passwordForm,
                    _id: match.params.id
                },
                isChangePassword: true
            }, () => {
                console.log("in change password")
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
            passwordForm: {...DEFAULT_PASSWORD_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            isDisabled:true,
            isRedirect: false,
            formErrors: {email: '',password: '',username: '', gender:'',select:'',fullname:'',phone:'',retype_password:''},
            emailValid: false,
            passwordValid: false,
            usernameValid: false,
            genderValid: false,
            selectValid: false,
            fullnameValid: false,
            phoneValid: false,
            retype_passwordValid: false,
            formValid: true
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
      
    _checkError() {
        let isError = false;
        let error = {};
        console.log(this.state.passwordForm);
        if (this.state.isChangePassword) {
            for (let name in this.state.passwordForm) {
                console.log(name);
                if (name === "_id") continue;
                if (name === "confirmPassword") {
                    if (this.state.passwordForm.newPassword !== this.state.passwordForm.confirmPassword) {
                        error.notMatch = true
                        isError = true
                    }
                } else {
                    if (this._validate(name, this.state.passwordForm[name])) {
                        error[name] = true
                        isError = true;
                    }
                }
            }

            console.log(error);

            this.setState({
                error
            })
    
            return isError;    
        }

        for (let name in this.state.form) {
            if (name === "_id" || name === "phone" || name === "address") continue;
            if (name === "retype_password") {
                if (this.state.isEdit) continue;
                if (this.state.form[name] !== this.state.form.password) {
                    error.notMatch = true
                    isError = true
                }
            } else if (name === "roles") {
                const isRolesEmpty = this.state.form.roles.reduce((isNone, item) => {
                    if (isNone) return isNone;
                    if (item === "None") return true;
                }, false) || this.state.form.roles.length === 0;
                                
                if (isRolesEmpty) {
                    isError = true
                    error.roles = true
                }        
            } else {
                if (this._validate(name, this.state.form[name])) {
                    error[name] = true
                    isError = true;
                }
            }
        }

        console.log(error);

        this.setState({
            error
        })

        return isError;
    }

    onSubmitForm =(event) =>
    {
        event.preventDefault();
        if (this._checkError()) {
            this._openModal({
                title: "Error",
                content: "Xin hãy nhập dữ liệu hợp lệ",
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
        if (_id && !this.state.isChangePassword) {
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
        } else if (this.state.isChangePassword) {
            this.props.changePassword(this.state.passwordForm, (res, error) => {
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
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let genderValid = this.state.genderValid;
        let selectValid = this.state.selectValid;
        let fullnameValid = this.state.fullnameValid;
        let phoneValid = this.state.phoneValid;
        let retype_passwordValid = this.state.retype_passwordValid;

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
          case 'password':
            passwordValid = value.length >5 && value.length <= 50;
            fieldValidationErrors.password = passwordValid ? '': ' Vui lòng nhập mật khẩu trong khoảng 6-50 ký tự!';
            if(this.state.form.retype_password.length > 0)
            {
                this.state.form.retype_password === value ? retype_passwordValid = true: retype_passwordValid = false;
                fieldValidationErrors.retype_password = retype_passwordValid ? '': 'Vui lòng nhập chính xác mật khẩu!';
            }
            break;
          case 'username':
            usernameValid = value.length >5 && value.length <= 50;
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
          case 'retype_password':
          console.log(this.state.form.retype_password)
          console.log(this.state.form.password)
            value === this.state.form.password ? retype_passwordValid = true: retype_passwordValid = false;
            fieldValidationErrors.retype_password = retype_passwordValid ? '': 'Vui lòng nhập chính xác mật khẩu!';
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
                        emailValid: emailValid,
                        retype_passwordValid: retype_passwordValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.phoneValid && 
                        this.state.genderValid && this.state.fullnameValid && this.state.usernameValid &&
                        this.state.passwordValid && this.state.emailValid && this.state.retype_passwordValid
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
    }


    onChangePassword(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            passwordForm: {
                ...this.state.passwordForm,
                [name] : value
            }
        });

    }


    _handleRole(e, key) {
        this.setState({
            form: {
                ...this.state.form,
                roles: this.state.form.roles.map((item, id) => {
                    if (id !== key) return item;
                    console.log(item, id, e.target.value);
                    item = e.target.value
                    return item;
                })
            }
        })
    }

    _addRole(event) {
        event.preventDefault();
        this.setState({
            form: {
                ...this.state.form,
                roles: [
                    ...this.state.form.roles,
                    "None"
                ]
            }
        })
    }

    _deleteRole(event, i) {
        event.preventDefault();
        this.setState({
            form: {
                ...this.state.form,
                roles: this.state.form.roles.filter((item, id) => id  !== i)
            }
        })

    }

    render() {
        if(this.state.isRedirect)
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
                        {
                            !this.state.isChangePassword &&
                            (<Card>
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
                                        
                                        {
                                            !this.state.isEdit && 
                                            (
                                                <FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="nf-password">Password</Label>
                                                        <Input 
                                                            onChange = {(event) => (this.isChange(event))} 
                                                            value = {this.state.form.password}
                                                            type="password" id="nf-password" name="password" placeholder="Enter Password.." />
                                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                                        {this.state.formErrors.password ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.password}</span></FormText> : ''}  
                
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="nf-password">Nhập lại Password</Label>
                                                        <Input 
                                                            onChange = {(event) => (this.isChange(event))} 
                                                            value = {this.state.form.retype_password}
                                                            type="password" id="nf-type-password" name="retype_password" placeholder="Re-type Password.." />
                                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                                        {this.state.formErrors.retype_password ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.retype_password}</span></FormText> : ''}  
                                                    </FormGroup>
                                                </FormGroup>
                                            )
                                        }

    
                                        <FormGroup>
                                            <Label htmlFor="nf-username">Username</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.username}
                                                type="text" id="nf-username" name="username" placeholder="Enter UserName.." autoComplete="current-password" />
                                            {this.state.formErrors.username ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.username}</span></FormText> : ''} 
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-fullname">Họ tên</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.fullname}
                                                type="text" id="nf-fullname" name="fullname" placeholder="Enter FullName.." autoComplete="current-password" />
                                            {this.state.formErrors.fullname ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.fullname}</span></FormText> : ''} 
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
                                            <FormGroup check inline>
                                                <Input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    id="inline-radio3" 
                                                    name="gender" 
                                                    value="khac" 
                                                    onChange = {(event) => (this.isChange(event))} 
                                                    checked={this.state.gender === "khac"}/>
                                                <Label className="form-check-label" check htmlFor="inline-radio3">Khác</Label>
                                            </FormGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nf-phone">Số điện thoại</Label>
                                            <Input onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.phone}
                                                type="text" id="nf-phone" name="phone" placeholder="Enter Phone.." autoComplete="current-password" />
                                            {this.state.formErrors.phone ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.phone}</span></FormText> : ''} 
                                        </FormGroup>
                                        {this.state.error.roles ? <FormText className="help-block"><span style={{color: "red"}}>Xin hãy nhập quyền hợp lệ</span></FormText> : ''} 
                                        <CustomTable 
                                            thead = {
                                                <tr>
                                                    <th>Quyền</th>
                                                    <td><Button onClick={this._addRole}><i className="fa fa-plus"></i></Button></td>
                                                </tr>
                                            }
    
                                            tbody = {this.state.form.roles.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            <Input value={item} onChange={(e) => this._handleRole(e, key)} type="select" name="collectionName" id="exampleSelect">
                                                                <option value="None">Hãy chọn quyền</option>
                                                                {this.state.roles.map((r, id)=> <option key={id} value={r._id}>{r.name}</option>)}
                                                            </Input>
                                                        </td>
                                                        <td><Button onClick={(e) => this._deleteRole(e, key)}>Delete</Button></td>
                                                    </tr>
                                                )
                                            })}
                                            hasPagination = {false}
                                    />
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    {/* <Button size="sm" color="primary" disabled={this.state.isDisabled} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button> */}
                                    <Button size="sm" color="primary" disabled={!this.state.formValid} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                    <Button size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                </CardFooter>
                            </Card>)
                        }
                        {
                            this.state.isChangePassword && 
                            
                                (<Card>
                                    <CardHeader>
                                        <strong>Sửa mật khẩu</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <Form onSubmit={this.onChangePassword}>
                                            <FormGroup>
                                                        <FormGroup>
                                                            <Label htmlFor="nf-password">Mật khẩu cũ</Label>
                                                            <Input 
                                                                onChange = {(event) => (this.onChangePassword(event))} 
                                                                value = {this.state.passwordForm.oldPassword}
                                                                type="password" id="nf-password" name="oldPassword" placeholder="Old Password.." />
                                                            {/* <FormText className="help-block">Please enter your password</FormText> */}
                                                            {this.state.error.oldPassword ? <FormText className="help-block"><span style={{color: "red"}}>Xin hãy nhập password hợp lệ</span></FormText> : ''}  
                    
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label htmlFor="nf-password">Mật khẩu mới</Label>
                                                            <Input 
                                                                onChange = {(event) => (this.onChangePassword(event))} 
                                                                value = {this.state.passwordForm.newPassword}
                                                                type="password" id="nf-type-password" name="newPassword" placeholder="New Password.." />
                                                            {/* <FormText className="help-block">Please enter your password</FormText> */}
                                                            {this.state.error.newPassword ? <FormText className="help-block"><span style={{color: "red"}}>Xin hãy nhập password hợp lệ</span></FormText> : ''}  
                                                            {this.state.error.notMatch ? <FormText className="help-block"><span style={{color: "red"}}>Nhập lại mật khẩu không trùng khớp</span></FormText> : ''}  

                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label htmlFor="nf-password">Nhập lại mật khẩu</Label>
                                                            <Input 
                                                                onChange = {(event) => (this.onChangePassword(event))} 
                                                                value = {this.state.passwordForm.confirmPassword}
                                                                type="password" id="nf-type-password" name="confirmPassword" placeholder="Confirm Password.." />
                                                            {/* <FormText className="help-block">Please enter your password</FormText> */}
                                                        </FormGroup>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                    <CardFooter>
                                        <Button size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                        <Button size="sm" color="danger" onClick = {this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                    </CardFooter>
                                </Card>)
                            
                        }
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserFormUI