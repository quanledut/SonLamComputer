import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {FormErrors} from '../utils/FormErrors'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      formErrors: {username: '',email: '', password: '',repeatPassword: ''},
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      repeatPasswordValid: false,
      formValid: false
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._submit = this._submit.bind(this)
  }

  _onInputChange = (e) => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      () => { this.validateField(name, value)}
    )
  }

  _submit (e) {
    e.preventDefault()
    const { username, email, password} = this.state
    this. props.submit(username, email, password, (res, err) => {
      if(err) {
          console.log('register error!')
      } else if (res) {
          console.log('register success!')
          this.props.history.push("/login")
      }
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let repeatPasswordValid = this.state.repeatPasswordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Vui lòng nhập đúng định dạng email!';
        break;
      case 'password':
        passwordValid = value.length >= 6 && value.length <= 50;
        fieldValidationErrors.password = passwordValid ? '': 'Vui lòng nhập password trong khoảng 6-50 ký tự!';
        break;
      case 'username':
        usernameValid = value.length >= 6 && value.length <= 50;
        fieldValidationErrors.username = usernameValid ? '': ' Vui lòng nhập username trong khoảng 6-50 ký tự!';
        break;
      case 'repeatPassword':
        this.state.repeatPassword === this.state.password ? repeatPasswordValid = true: repeatPasswordValid = false;
        fieldValidationErrors.repeatPassword = repeatPasswordValid ? '': 'Vui lòng nhập chính xác mật khẩu!';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    usernameValid: usernameValid,
                    repeatPasswordValid: repeatPasswordValid
                  }, this.validateForm);
  }

  validateForm() {
    console.log(this.state.emailValid, this.state.passwordValid , 
      this.state.usernameValid , this.state.repeatPasswordValid)
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && 
                    this.state.usernameValid && this.state.repeatPasswordValid});
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="text" 
                        placeholder="Username" 
                        autoComplete="username" 
                        name="username" 
                        onChange={this._onInputChange} 
                        value={this.state.username} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="text" 
                        placeholder="Email" 
                        autoComplete="email" 
                        name="email" 
                        onChange={this._onInputChange} 
                        value={this.state.email} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        autoComplete="new-password" 
                        name="password" 
                        onChange={this._onInputChange} 
                        value={this.state.password} 
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="password" 
                        placeholder="Repeat password" 
                        autoComplete="new-password" 
                        name="repeatPassword" 
                        onChange={this._onInputChange} 
                        value={this.state.repeatPassword} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <FormErrors formErrors={this.state.formErrors} />
                    </InputGroup>
                    <Button onClick={this._submit} color="success" block disabled={!this.state.formValid}>Create Account</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  submit: PropTypes.func.isRequired
}

export default withRouter(Register);