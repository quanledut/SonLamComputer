import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Modal from '../utils/Modal'
import { FormErrors } from '../utils/FormErrors'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        fullname: '',
      },
      modal: {
        isOpened: false,
        isLoading: false,
        title: '',
        content: ''
      },
      redirect: false,
      formErrors: { username: '', fullname: '', email: '', password: '', repeatPassword: '' },
      usernameValid: false,
      fullnameValid: false,
      emailValid: false,
      passwordValid: false,
      repeatPasswordValid: false,
      formValid: false
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._reset = this._reset.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }

  _onInputChange = (e) => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        //     [e.target.name]: e.target.value
        form: {
          ...this.state.form,
          [name]: value
        }
      },
      () => { this.validateField(name, value) }
    )
  }

  _reset(e) {
    e.preventDefault()
    this.setState({
      form: {
        username: "",
        fullname: "",
        email: "",
        password: "",
        repeatPassword: "",
      }
    })
  }

  _openModal(modal) {
    this.setState({
      modal: {
        ...this.state.modal,
        ...modal,
        isOpened: true
      }
    })
  }

  _closeModal() {
    this.setState({
      modal: {
        isOpened: false,
        isLoading: false,
        title: "",
        content: ""
      }
    })
  }

  _submit(e) {
    e.preventDefault()
    const { username, fullname, email, password } = this.state.form

    this._openModal({
      isLoading: true,
      isOpened: true,
      title: "Loading"
    })

    for (let name in this.state.form) {
      this.validateField(name, this.state.form[name])
    }

    var check = true;
    for (let name in this.state.formErrors) {
      if (this.state.formErrors[name] !== '') {
        check = false;
      }
    }

    if (!check) {
      this._openModal({
        title: "Error",
        content: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
        isLoading: false,
      })
    }
    else {
      this.props.submit(username, fullname, email, password, (res, err) => {
        this._closeModal()

        if (err) {
          console.log('register error!', err)
          this._openModal({
            title: "Error",
            content: err,
            isLoading: false,
          })
        } else if (res) {
          console.log('register success!')
          this._openModal({
            title: "Success",
            content: "Register Success",
            isLoading: false
          })
          this.props.history.push("/login")
        }
      })
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let fullnameValid = this.state.fullnameValid;
    let repeatPasswordValid = this.state.repeatPasswordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Vui lòng nhập đúng định dạng email!';
        break;
      case 'password':
        passwordValid = value.length >= 6 && value.length <= 50;
        fieldValidationErrors.password = passwordValid ? '' : 'Vui lòng nhập password trong khoảng 6-50 ký tự!';
        if (this.state.form.repeatPassword) {
          value === this.state.form.repeatPassword ? repeatPasswordValid = true : repeatPasswordValid = false;
          fieldValidationErrors.repeatPassword = repeatPasswordValid ? '' : 'Vui lòng nhập chính xác mật khẩu!';
        }
        break;
      case 'username':
        usernameValid = value.length >= 6 && value.length <= 50;
        fieldValidationErrors.username = usernameValid ? '' : ' Vui lòng nhập username trong khoảng 6-50 ký tự!';
        break;
      case 'fullname':
        fullnameValid = value.length >= 6 && value.length <= 50;
        fieldValidationErrors.fullname = fullnameValid ? '' : ' Vui lòng nhập fullname trong khoảng 6-50 ký tự!';
        break;
      case 'repeatPassword':
        value === this.state.form.password ? repeatPasswordValid = true : repeatPasswordValid = false;
        fieldValidationErrors.repeatPassword = repeatPasswordValid ? '' : 'Vui lòng nhập chính xác mật khẩu!';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
    });
  }

  _login(e) {
    e.preventDefault();
    window.location.href = '#/login';
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Modal
          isOpened={this.state.modal.isOpened}
          isLoading={this.state.modal.isLoading}
          title={this.state.modal.title}
          content={this.state.modal.content}
          onOkay={this._closeModal}
          onCancel={this._closeModal}
        >
        </Modal>
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
                        value={this.state.form.username} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Fullname"
                        autoComplete="fullname"
                        name="fullname"
                        onChange={this._onInputChange}
                        value={this.state.form.fullname} />
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
                        value={this.state.form.email} />
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
                        value={this.state.form.password}
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
                        value={this.state.form.repeatPassword} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <FormErrors formErrors={this.state.formErrors} />
                    </InputGroup>
                    <Row>
                      <Col xs="12" sm="6">
                        <Button type="submit" onClick={this._submit} color="success" block active>Create Account</Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button onClick={this._login} color="primary" block>Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
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
