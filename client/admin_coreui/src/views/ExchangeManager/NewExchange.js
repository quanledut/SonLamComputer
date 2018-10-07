import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import * as messages from './../../constants/MessageError'
import {Redirect} from 'react-router-dom';

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

class NewService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nf_id :'',
            nf_username :'',
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
                nf_username :this.props.editItem.nf_username,
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
                nf_username :'',
                select:'',
                isDisabled:true,
            });
        }
        else
        {
            this.setState({
                nf_id : '',
                nf_username :'',
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
        this.props.saveService(this.state);
        this.onClear();
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
                usernameErrorMessage: messages.NOT_NULL,
                usernameError:true
              })
            }else{
              this.setState({
                usernameErrorMessage:'',
                usernameError:false,     
                nf_username: event.target.value
              })
            }
          }
          
          if(event.target.name==='select'){
            if(event.target.value==='' || event.target.value===null || event.target.value==='0'){
              this.setState({
                selectErrorMessage: messages.ERROR_CHOOSE,
                selectError:true
              })
            } else {
              this.setState({
                selectErrorMessage : '',
                selectError:false,
                select:event.target.value
              })
            }
         }
         if(this.state.usernameError===false && this.state.selectError===false){
            this.setState({
              isDisabled:false
            })
         }
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/services"/>
            )
        }
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin dịch vụ</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên dịch vụ</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_username}
                                            type="username" id="nf-username" name="nf_username" placeholder="Enter Service.." autoComplete="current-password" />
                                        {this.state.usernameError ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.usernameErrorMessage}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Trạng thái</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.select}
                                            type="select" name="select" id="select">
                                            <option value="0">Please select</option>
                                            <option value="1">Hoạt động</option>
                                            <option value="2">Không hoạt động</option>
                                        </Input>
                                        {this.state.selectError ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.selectErrorMessage}</span></FormText> : ''} 
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
        saveService : (service) => {
            dispatch(actions.save_service(service));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NewService);
