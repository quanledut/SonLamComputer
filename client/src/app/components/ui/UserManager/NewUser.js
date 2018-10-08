import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../../actions/usermanager';
import {Redirect} from 'react-router-dom';

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

class NewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id :'',
            email :'',
            password: '',
            username :'',
            gender : '',
            created_time: '',
            address :'',
            select:'',
            phone: '',
            fullname: '',
            timeout: 300,           
            isRedirect: false,
            isDisabled:true,
        };
    }

    componentDidMount(){
        var {match} = this.props;
        if(match)
        {
            var id = match.params.id;
            this.props.getUserById(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.editItem)
        {
            this.setState({
                _id :this.props.editItem._id,
                email :this.props.editItem.email,
                password: this.props.editItem.password,
                username :this.props.editItem.username,
                gender : this.props.editItem.gender,
                created_time: this.props.editItem.created_time,
                address :this.props.editItem.address,
                roles:this.props.editItem.roles,
                phone: this.props.editItem.phone,
                fullname: this.props.editItem.fullname,
                isDisabled:false,
            })
        }else{
            this.onClear();
        }
    }

    onClear = () =>{
        this.setState({
            email :'',
            password: '',
            username :'',
            gender : '',
            created_time: '',
            address :'',
            roles:'',
            phone: '',
            fullname: '',
            isDisabled:true,
        });
    }

    onSubmitForm =(event) =>
    {
        event.preventDefault();
        this.setState({
            isRedirect: true
        });
        var {_id} = this.state;
        if(_id)
        {
            this.props.updateUser(this.state);
        }
        else
        {
            this.props.saveUser(this.state);
        }
        this.onClear();
    }

    validateEmail(email){
        const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if(result===true){
          this.setState({
            emailError:false,
            email:email
          })
        } else{
          this.setState({
            emailError:true
          })
        }
      }

    isChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
        if(event.target.name==='username'){
            if(event.target.value==='' || event.target.value===null ){
              this.setState({
                usernameError:true
              })
            } else if(!event.target.value.match(/^[a-zA-Z]+$/)){
                this.setState({
                    usernameError:true
                  })
            }else{
              this.setState({
                usernameError:false,     
                username: event.target.value
              })
            }
          }
          if(event.target.name==='email'){
           this.validateEmail(event.target.value);
          }
          if(event.target.name==='password'){
            if(event.target.value==='' || event.target.value===null){
              this.setState({
                passwordError:true
              })
            } else {
              this.setState({
                passwordError:false,
                password:event.target.value
              })
            }
         }
         if(event.target.name==='fullname'){
            if(event.target.value==='' || event.target.value===null ){
              this.setState({
                fullnameError:true
              })
            }else{
              this.setState({
                fullnameError:false,     
                fullname: event.target.value
              })
            }
          }
          if(event.target.name==='phone'){
            if(event.target.value==='' || event.target.value===null ){
              this.setState({
                phoneError:true
              })
            } else if(!event.target.value.match(/(09|01[2|6|8|9])+([0-9]{8})\b/g)){
                this.setState({
                    phoneError:true
                  })
            }else{
              this.setState({
                phoneError:false,     
                phone: event.target.value
              })
            }
          }
         if(this.state.usernameError===false && this.state.emailError===false 
            && this.state.passwordError===false && this.state.fullnameError===false
            && this.state.phoneError===false){
            this.setState({
              isDisabled:false
            })
         }
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
                <Row>
                <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin đăng nhập</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-email">Email</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.email}
                                            type="email" id="nf-email" name="email" placeholder="Enter Email.." autoComplete="email" />
                                        {this.state.emailError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your email</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Password</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.password}
                                            type="password" id="nf-password" name="password" placeholder="Enter Password.." autoComplete="current-password" />
                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                        {this.state.passwordError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your password</span></FormText> : ''}  
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Username</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.username}
                                            type="username" id="nf-username" name="username" placeholder="Enter UserName.." autoComplete="current-password" />
                                        {this.state.usernameError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your username</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">FullName</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.fullname}
                                            type="username" id="nf-username" name="fullname" placeholder="Enter FullName.." autoComplete="current-password" />
                                        {this.state.fullnameError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your full name</span></FormText> : ''} 
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
                                                checked={this.state.gender === "nam"}/>
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
                                                checked={this.state.gender === "nu"}/>
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
                                        <Label htmlFor="date-input">Ngày đăng ký <Badge>NEW</Badge></Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.created_time}
                                            type="date" id="date-input" name="created_time" placeholder="date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Số điện thoại</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.phone}
                                            type="username" id="nf-username" name="phone" placeholder="Enter Phone.." autoComplete="current-password" />
                                        {this.state.phoneError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your phone</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="textarea-input">Giới thiệu</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.address}
                                            type="textarea" name="address" id="textarea-input" rows="3"
                                            placeholder="Content..." />
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

const mapStateToProps = (state) =>
{
    return{
        editItem : state.ItemEditing,
    }
};

const mapDispatchToProps =(dispatch, props) =>{
    return {
        addUser : (user) => {
            dispatch(actions.saveUserRequest(user));
        },
        getUserById : (id) => {
            dispatch(actions.getUserByIdRequest(id));
        },
        updateUser : (user) => {
            dispatch(actions.editUserRequest(user));
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NewUser);
