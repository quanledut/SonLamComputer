import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';
import {Redirect} from 'react-router-dom';
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
            isRedirect: false
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

    isChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
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
                                        <FormText className="help-block">Please enter your email</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-password">Password</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_password}
                                            type="password" id="nf-password" name="nf_password" placeholder="Enter Password.." autoComplete="current-password" />
                                        <FormText className="help-block">Please enter your password</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Username</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_username}
                                            type="username" id="nf-username" name="nf_username" placeholder="Enter UserName.." autoComplete="current-password" />
                                        <FormText className="help-block">Please enter your username</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Giới tính</Label>
                                        &nbsp;
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio1" name="inline_radios" value="option1" />
                                            <Label className="form-check-label" check htmlFor="inline-radio1">Nam</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio2" name="inline_radios" value="option2" />
                                            <Label className="form-check-label" check htmlFor="inline-radio2">Nữ</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio3" name="inline_radios" value="option3" />
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
                                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
