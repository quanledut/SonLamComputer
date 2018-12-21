import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Modal from '../utils/Modal'
import { FormErrors } from '../utils/FormErrors'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
        password: ''
      },
      modal: {
        isOpened: false,
        isLoading: false,
        title: '',
        content: ''
      },
      redirect: false,
      formErrors: { username: '', password: '' },
      usernameValid: false,
      passwordValid: false,
      formValid: false
    }

    this._reset = this._reset.bind(this)
    this._onChangeInput = this._onChangeInput.bind(this)
    this._submit = this._submit.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }

  _reset(e) {
    e.preventDefault()
    this.setState({
      form: {
        username: '',
        password: ''
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
        title: '',
        content: ''
      }
    })
  }


  _submit(e) {
    e.preventDefault()
    const { username, password } = this.state.form

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

      this.props.submit(username, password, (res, err) => {
        this._closeModal()
        if (err) {
          this._openModal({
            title: "Error",
            content: err,
            isLoading: false,
          })
        } else if (res) {
          this._openModal({
            title: "Success",
            content: "Login Success",
            isLoading: false
          })

        }
      })
    }
  }

  _onChangeInput(e) {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    },
      () => { this.validateField(name, value) }
    )
  }

  componentWillReceiveProps(nextProps) {
    nextProps.history.push("/")
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length > 0;
        fieldValidationErrors.password = passwordValid ? '' : 'Vui lòng nhập password!';
        break;
      case 'username':
        usernameValid = value.length > 0;
        if (!usernameValid) {
          fieldValidationErrors.username = usernameValid ? '' : ' Vui lòng nhập username!';
        } else {
          usernameValid = value.match(/^[a-zA-Z0-9]+$/);
          fieldValidationErrors.username = usernameValid ? '' : ' Vui lòng không nhập ký tự đặc biệt!';
        }
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors
    });
  }

  render() {
    const { history } = this.props
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
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this._submit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this._onChangeInput}
                          value={this.state.form.username} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this._onChangeInput}
                          value={this.state.form.password} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <FormErrors formErrors={this.state.formErrors} />
                      </InputGroup>
                      <Row>
                        <Col xs="6" sm="6">
                          <Button type="submit" onClick={this._submit} color="primary" block active>Login</Button>
                        </Col>
                        <Col xs="6" sm="6">
                          <Button onClick={() => history.push("/register")} color="success" block>Register Now!</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  submit: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  token: PropTypes.string
}

export default withRouter(Login);
