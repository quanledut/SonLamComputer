import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';
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
            nf_id :'',
            nf_email :'',
            nf_password: '',
            nf_username :'',
            inline_radios : '',
            date_input: '',
            textarea_input :'',
            select:'',
            timeout: 300,           
            isRedirect: false,
            isDisabled:true,
        };
    }

    componentWillMount(){
        if(!this.props.isNewUser &&this.props.editItem && this.props.editItem.nf_id !== null)
        {
            this.setState({
                nf_id :this.props.editItem.nf_id,
                nf_email :this.props.editItem.nf_email,
                nf_password: this.props.editItem.nf_password,
                nf_username :this.props.editItem.nf_username,
                inline_radios : this.props.editItem.inline_radios,
                date_input: this.props.editItem.date_input,
                textarea_input :this.props.editItem.textarea_input,
                select:this.props.editItem.select,
                isDisabled:false,
            })
        }else{
            this.onClear();
        }
    }

    onClear = () =>{
        if(!this.props.isNewUser)
        {
            this.setState({
                nf_email :'',
                nf_password: '',
                nf_username :'',
                inline_radios : '',
                date_input: '',
                textarea_input :'',
                select:'',
                isDisabled:true,
            });
        }
        else
        {
            this.setState({
                nf_id : '',
                nf_email :'',
                nf_password: '',
                nf_username :'',
                inline_radios : '',
                date_input: '',
                textarea_input :'',
                select:'',
                isDisabled:true,
            });
        }
    }

    onSubmitForm =(event) =>
    {
        event.preventDefault();
        this.setState({
            isRedirect: true
        });
        this.props.saveUser(this.state);
        this.onClear();
    }

    validateEmail(email){
        const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if(result===true){
          this.setState({
            emailError:false,
            nf_email:email
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
        if(event.target.name==='nf_username'){
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
                nf_username: event.target.value
              })
            }
          }
          if(event.target.name==='nf_email'){
           this.validateEmail(event.target.value);
          }
          if(event.target.name==='nf_password'){
            if(event.target.value==='' || event.target.value===null){
              this.setState({
                passwordError:true
              })
            } else {
              this.setState({
                passwordError:false,
                nf_password:event.target.value
              })
            }
         }
         if(this.state.usernameError===false && this.state.emailError===false 
            && this.state.passwordError===false){
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
                                            value = {this.state.nf_email}
                                            type="email" id="nf-email" name="nf_email" placeholder="Enter Email.." autoComplete="email" />
                                        {this.state.emailError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your email</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Password</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_password}
                                            type="password" id="nf-password" name="nf_password" placeholder="Enter Password.." autoComplete="current-password" />
                                        {/* <FormText className="help-block">Please enter your password</FormText> */}
                                        {this.state.passwordError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your password</span></FormText> : ''}  
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Username</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_username}
                                            type="username" id="nf-username" name="nf_username" placeholder="Enter UserName.." autoComplete="current-password" />
                                        {this.state.usernameError ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your username</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Giới tính</Label>
                                        &nbsp;
                                        <FormGroup check inline>
                                            <Input 
                                                className="form-check-input" 
                                                type="radio" id="inline-radio1" 
                                                name="inline_radios" value="nam" 
                                                onChange = {(event) => (this.isChange(event))} 
                                                checked={this.state.inline_radios === "nam"}/>
                                            <Label className="form-check-label" check htmlFor="inline-radio2">Nam</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input 
                                                className="form-check-input" 
                                                type="radio" 
                                                id="inline-radio2" 
                                                name="inline_radios" 
                                                value="nu" 
                                                onChange = {(event) => (this.isChange(event))} 
                                                checked={this.state.inline_radios === "nu"}/>
                                            <Label className="form-check-label" check htmlFor="inline-radio2">Nữ</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input 
                                                className="form-check-input" 
                                                type="radio" 
                                                id="inline-radio3" 
                                                name="inline_radios" 
                                                value="khac" 
                                                onChange = {(event) => (this.isChange(event))} 
                                                checked={this.state.inline_radios === "khac"}/>
                                            <Label className="form-check-label" check htmlFor="inline-radio3">Khác</Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date-input">Ngày sinh <Badge>NEW</Badge></Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.date_input}
                                            type="date" id="date-input" name="date_input" placeholder="date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="textarea-input">Giới thiệu</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.textarea_input}
                                            type="textarea" name="textarea_input" id="textarea-input" rows="9"
                                            placeholder="Content..." />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Select</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.select}
                                            type="select" name="select" id="select">
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
        isNewUser : state.isNewUser
    }
};

const mapDispatchToProps =(dispatch, props) =>{
    return {
        saveUser : (user) => {
            dispatch(actions.save_user(user));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NewUser);
