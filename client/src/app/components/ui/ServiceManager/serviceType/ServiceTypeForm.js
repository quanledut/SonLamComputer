import React, { Component } from 'react';
import Modal from './../../utils/Modal'
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

const DEFAULT_FORM = {
    _id :'',
    name :'',
}

class ServiceTypeFormUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {...DEFAULT_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            isDisabled:true,
            isRedirect: false
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
    }

    componentWillMount(){
        var {match} = this.props;
        if(match.params.id)
        {
            var id = match.params.id;

            this.props.getById(id, (data) => {
                this.setState({
                    ...this.state,
                    form: data
                })
            })
        }
    }

    onClear = () =>{
        this.setState({
            form: {...DEFAULT_FORM},
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },      
            isDisabled:true,
            isRedirect: false
        });
    }

    _openModal (modal) {
        this.setState({
          modal: {
            ...this.state.modal,
            ...modal,
            isOpened: true
          }
        })  
    }   
    
    _closeModal () {
        this.setState({
          modal: {
            isOpened: false,
            isLoading: false,
            title: "",
            content: ""
          }
        })
    }

    onSubmitForm =(event) =>
    {
        
        event.preventDefault();
        this._openModal({
            isLoading: true,
            isOpened: true,
            title: "Loading"
        })

        let {_id} = this.state.form
        if (_id) {
            this.props.update(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Updat success",
                        isLoading: false
                    })
                    this.setState({
                        isRedirect: true
                    })              
                } else {
                    this._openModal({
                        title: "Error",
                        content: error,
                        isLoading: false,
                      })              
                }
            })
        } else {
            this.props.create(this.state.form, (res, error) => {
                this._closeModal()
                if (res) {
                    this._openModal({
                        title: "Success",
                        content: "Create success",
                        isLoading: false
                    })
                    this.setState({
                        isRedirect: true
                    })              
                } else{
                    this._openModal({
                        title: "Error",
                        content: error,
                        isLoading: false,
                      })              
                }
            })
        }
    }

    _validate(name, value) {
        if (name === 'name') {
            return !(value.length <= 50)
        } else {
            return value === "" || value === null
        }
    }

    isChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [name] : value
            }
        });

        if (this._validate(name, value)) {
            this.setState({
                error: {
                    ...this.state.error,
                    [name]: true
                }
            })
        } else {
            delete this.state.error[name]
        }

        if (JSON.stringify(this.state.error) === JSON.stringify({})) {
            this.setState({
                isDisabled:false
              })
  
        }

        if(name === "name")
        {
            if(value === "" || value === null)
            {
                this.setState({
                    isDisabled: true
                })
            }
        }
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/services/serviceType"/>
            )
        }
        return (
            <div className="animated fadeIn">
                <Modal
                    isOpened={this.state.modal.isOpened}
                    isLoading={this.state.modal.isLoading}
                    title={this.state.modal.title}
                    content={this.state.modal.content}
                    onOkay={this._closeModal}
                    onCancel={this._closeModal} >
                </Modal>

                <Row>
                <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin loại dịch vụ</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên loại dịch vụ</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.name}
                                            type="username" id="nf-username" name="name" placeholder="Nhập tên loại dịch vụ..." autoComplete="current-password" />
                                         {this.state.error.name ? <FormText className="help-block"><span style={{color: "red"}}>Please enter valid your name</span></FormText> : ''} 
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

export default ServiceTypeFormUI
