import React, { Component } from 'react';
import Modal from '../../../utils/Modal'
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
    computerName:'',
    type:'',
    description:'',
    image_url:'',
    amount:0,
    price:0,
    guaranteeDuration:0
}

class AccessoryNameFormUI extends Component {

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
            types: [],
            computerNames: [],
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
        this.props.findAllComputerName({
            all: true
        }, (computerNames, err) => {
            console.log(computerNames, err)
            if (!err) this.setState({
                ...this.state,
                computerNames: computerNames.docs
            })
        });
        this.props.findAllaccessoryType({
            all: true
        }, (types, err) => {
            console.log(types, err)
            if (!err) this.setState({
                ...this.state,
                types: types.docs
            })
        });
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
            console.log(this.state.form);
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
        const re = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        if (name === 'computerName') {
            return !(value !== null && value !== "")
        }
        if (name === 'type') {
            return !(value !== null && value !== "")
        }
        if (name === 'price') {
            return !(re.test(value)) && (value > 0)
        }
        if (name === 'amount') {
            return !(re.test(value) && (value > 0))
        }
        if (name === 'guaranteeDuration') {
            return !(re.test(value) && (value > 0))
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
        else{
            this.setState({
                isDisabled:true
              })
        }
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/devices/accessory"/>
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
                                <strong>Thông tin loại thiết bị sữa chữa / thay thế</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                            <Label htmlFor="select">Tên máy tính</Label>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.computerName}
                                                type="select" name="computerName" id="select">
                                                    <option value="None">---Chọn---</option>
                                                    {this.state.computerNames.map((e, id) => 
                                                        <option key={id} value={e._id}>{e.name}</option>
                                                    )}
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label htmlFor="select">Loại linh kiện</Label>
                                            <Input 
                                                onChange = {(event) => (this.isChange(event))} 
                                                value = {this.state.form.type}
                                                type="select" name="type" id="select">
                                                <option value="None">---Chọn---</option>
                                                {
                                                    this.state.types.map((e, id) => 
                                                        <option key={id} value={e._id}>{e.name}</option>
                                                    )
                                                }
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Mô tả</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.description}
                                            type="username" id="nf-username" name="description" placeholder="Nhập mô tả..." autoComplete="current-password" />
                                         {this.state.error.description ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Giá bán</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.price}
                                            type="username" id="nf-username" name="price" placeholder="Nhập giá bán..." autoComplete="current-password" />
                                         {this.state.error.price ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Số tiền</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.amount}
                                            type="username" id="nf-username" name="amount" placeholder="Nhập số tiền..." autoComplete="current-password" />
                                         {this.state.error.amount ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Link ảnh</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.image_url}
                                            type="username" id="nf-username" name="image_url" placeholder="Nhập link ảnh..." autoComplete="current-password" />
                                         {this.state.error.image_url ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Thời gian bảo hành</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.guaranteeDuration}
                                            type="username" id="nf-username" name="guaranteeDuration" placeholder="Nhập thời gian bảo hành..." autoComplete="current-password" />
                                         {this.state.error.guaranteeDuration ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''} 
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

export default AccessoryNameFormUI
