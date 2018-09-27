import React, { Component } from 'react';
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

class NewUser extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState } });
    }

    render() {
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
                                        <Input type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email" />
                                        <FormText className="help-block">Please enter your email</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Password</Label>
                                        <Input type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password" />
                                        <FormText className="help-block">Please enter your password</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Username</Label>
                                        <Input type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password" />
                                        <FormText className="help-block">Please enter your username</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Giới tính</Label>
                                        &nbsp;
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                            <Label className="form-check-label" check htmlFor="inline-radio1">Nam</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                                            <Label className="form-check-label" check htmlFor="inline-radio2">Nữ</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                                            <Label className="form-check-label" check htmlFor="inline-radio3">Khác</Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date-input">Ngày sinh <Badge>NEW</Badge></Label>
                                        <Input type="date" id="date-input" name="date-input" placeholder="date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="textarea-input">Giới thiệu</Label>
                                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                            placeholder="Content..." />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Select</Label>
                                        <Input type="select" name="select" id="select">
                                            <option value="0">Please select</option>
                                            <option value="1">Option #1</option>
                                            <option value="2">Option #2</option>
                                            <option value="3">Option #3</option>
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NewUser;
