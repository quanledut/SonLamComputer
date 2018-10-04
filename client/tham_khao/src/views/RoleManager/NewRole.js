import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import * as messages from './../../constants/MessageError'
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

class NewRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nf_id :'',
            nf_grouprole :'',
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
                nf_grouprole :this.props.editItem.nf_grouprole,
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
                nf_grouprole :'',
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
                nf_grouprole :'',
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
        this.props.saveRole(this.state);
        this.onClear();
    }

    isChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
        if(event.target.name==='nf_grouprole'){
            if(event.target.value==='' || event.target.value===null ){
              this.setState({
                grouproleError:true,
                messageErrorRole: messages.NOT_NULL
              })
            } else if(event.target.value.length > 50){
                this.setState({
                    grouproleError:true,
                    messageErrorRole:messages.MAX_VALUES
                  })
            }else{
              this.setState({
                grouproleError:false,     
                nf_grouprole: event.target.value,
                messageErrorRole:''
              })
            }
        }
        
        if(event.target.name==='select'){
            if(event.target.value==='' || event.target.value===null || event.target.value === "0"){
                this.setState({
                    selectError:true,
                    messageErrorSelect : messages.ERROR_CHOOSE
                })
            } else {
                this.setState({
                    selectError:false,
                    select:event.target.value,
                    messageErrorSelect: ''
                })
            }
        }
         if(this.state.grouproleError===false && this.state.selectError===false){
            this.setState({
              isDisabled:false
            })
         }
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/roles"/>
            )
        }
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin chung</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-grouprole">Tên nhóm quyền</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.nf_grouprole}
                                            type="username" id="nf-username" name="nf_grouprole" placeholder="Enter Group Role..." autoComplete="current-password" />
                                        {this.state.grouproleError ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.messageErrorRole}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date-input">Ngày tạo <Badge>NEW</Badge></Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.date_input}
                                            type="date" id="date-input" name="date_input" placeholder="date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="textarea-input">Mô tả</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.textarea_input}
                                            type="textarea" name="textarea_input" id="textarea-input" rows="9"
                                            placeholder="Content..." />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Trạng thái</Label>
                                        <Input 
                                            onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.select}
                                            type="select" name="select" id="select">
                                            <option value="0">Please select</option>
                                            <option value="1">Alive</option>
                                            <option value="2">Ban</option>
                                        </Input>
                                        {this.state.selectError ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.messageErrorSelect}</span></FormText> : ''} 
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
        saveRole : (role) => {
            dispatch(actions.save_role(role));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NewRole);
