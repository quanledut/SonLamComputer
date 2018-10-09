import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/usermanager';
import {Redirect} from 'react-router-dom';
import Modal from '../utils/Modal'

import {
    Badge,
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
            isDisabled:true,
            isRedirect: false
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
    }

    componentWillReceiveProps(nextProps){
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

        let {_id} = this.props
        if (_id) {
            this.props.updateUser(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Updat user success",
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
            this.props.createUser(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Create user success",
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
        if (name == 'email') {
            const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
            return !pattern.test(value);
        } else if (name == 'username') {
            return !value.match(/^[a-zA-Z0-9]+$/)
        } else {
            return value == "" || value == null
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
                                        {this.state.error.email ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your email</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Password</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.password}
                                            type="password" id="nf-password" name="password" placeholder="Enter Password.." autoComplete="current-password" />
                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                        {this.state.error.password ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your password</span></FormText> : ''}  
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Username</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.username}
                                            type="text" id="nf-username" name="username" placeholder="Enter UserName.." autoComplete="current-password" />
                                        {this.state.error.username ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your username</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-fullname">FullName</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.fullname}
                                            type="text" id="nf-fullname" name="fullname" placeholder="Enter FullName.." autoComplete="current-password" />
                                        {this.state.error.fullname ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your full name</span></FormText> : ''} 
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
                                                checked={this.state.gender === "khac"}/>
                                            <Label className="form-check-label" check htmlFor="inline-radio3">Khác</Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-phone">Số điện thoại</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.phone}
                                            type="text" id="nf-phone" name="phone" placeholder="Enter Phone.." autoComplete="current-password" />
                                        {this.state.error.phone ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your phone</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Phân quyền</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.select}
                                            type="select" name="roles" id="select">
                                            <option value="0">Please select</option>
                                            <option value="1">Option #1</option>
                                            <option value="2">Option #2</option>
                                            <option value="3">Option #3</option>
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="primary" disabled={this.state.isDisabled} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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

