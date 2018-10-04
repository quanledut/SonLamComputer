import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._submit = this._submit.bind(this)
  }

  _onInputChange = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  _submit (e) {
    e.preventDefault()
    const { username, email, password, repeatPassword } = this.state
    this.props.submit(
      username,
      email,
      password,
      repeatPassword
    )
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
                        onChange={this._onInputChange} />
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
                        onChange={this._onInputChange} />
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
                        onChange={this._onInputChange} />
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
                        onChange={this._onInputChange} />
                    </InputGroup>
                    <Button onClick={this._submit} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
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
