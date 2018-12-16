import React, { Component } from 'react';
import Modal from './../../../utils/Modal'
import { Redirect } from 'react-router-dom';

import {
    Button,
    Card,
    CardImg,
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
    _id: '',
    name: '',
    deviceType: '',
    description: '',
    image_url: '',
    amount: 0,
    price: 0,
    guaranteeDuration: 0,
    inputPrice:0
}

class DeviceNameFormUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: { ...DEFAULT_FORM },
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },
            deviceTypes: [],
            computerNames: [],
            isDisabled: true,
            isRedirect: false,
            formErrors: { name: '', deviceType: '', amount: '', price: '', guaranteeDuration: '', inputPrice:'' },
            nameValid: false,
            deviceTypeValid: false,
            amountValid: false,
            priceValid: false,
            inputPriceValid: false,
            guaranteeDurationValid: false,
            formValid: false
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
    }

    componentWillMount() {
        var { match } = this.props;
        if (match.params.id) {
            var id = match.params.id;

            this.props.getById(id, (data) => {
                this.setState({
                    ...this.state,
                    form: data
                })
            })
        }
        this.props.findAlldeviceType({
            all: true
        }, (deviceTypes, err) => {
            console.log(deviceTypes, err)
            if (!err) this.setState({
                ...this.state,
                deviceTypes: deviceTypes.docs
            })
        });
    }

    onClear = () => {
        this.setState({
            form: { ...DEFAULT_FORM },
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },
            isDisabled: true,
            isRedirect: false,
            formErrors: { name: '', deviceType: '', amount: '', price: '', guaranteeDuration: '', inputPrice:'' },
            nameValid: false,
            deviceTypeValid: false,
            amountValid: false,
            inputPriceValid: false,
            priceValid: false,
            guaranteeDurationValid: false,
            formValid: false
        });
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

    onSubmitForm = (event) => {

        event.preventDefault();
        this._openModal({
            isLoading: true,
            isOpened: true,
            title: "Loading"
        })

        for (let name in this.state.form) {
            this._validate(name, this.state.form[name])
        }

        var check = true;
        for (let name in this.state.formErrors) {
            if (this.state.formErrors[name] !== "") {
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
            let { _id } = this.state.form
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
                    } else {
                        this._openModal({
                            title: "Error",
                            content: error,
                            isLoading: false,
                        })
                    }
                })
            }
        }
    }

    _validate(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let deviceTypeValid = this.state.deviceTypeValid;
        let amountValid = this.state.amountValid;
        let priceValid = this.state.priceValid;
        let inputPriceValid = this.state.inputPriceValid;
        let guaranteeDurationValid = this.state.guaranteeDurationValid;

        const re = /^\$?[0-9]+(\.[0-9][0-9])?$/;

        switch (fieldName) {
            case 'deviceType':
                deviceTypeValid = (value !== null && value !== "");
                fieldValidationErrors.deviceType = deviceTypeValid ? '' : 'Vui lòng chọn loại thiết bị!';
                break;
            case 'amount':
                amountValid = value > 0;
                if (!amountValid) {
                    fieldValidationErrors.amount = amountValid ? '' : 'Vui lòng nhập số lượng!';
                } else {
                    amountValid = re.test(value);
                    fieldValidationErrors.amount = amountValid ? '' : 'Định dạng số không đúng!';
                }
                break;
            case 'inputPrice':
                inputPriceValid = re.test(value);
                fieldValidationErrors.inputPrice = inputPriceValid ? '' : 'Định dạng số không đúng!';
                break;
            case 'price':
                priceValid = value > 0;
                if (!priceValid) {
                    fieldValidationErrors.price = priceValid ? '' : 'Vui lòng nhập giá thiết bị!';
                } else {
                    priceValid = re.test(value);
                    fieldValidationErrors.price = priceValid ? '' : 'Định dạng số không đúng!';
                }
                break;
            case 'name':
                nameValid = value.length > 2 && value.length <= 100;
                fieldValidationErrors.name = nameValid ? '' : ' Vui lòng nhập tên thiết bị trong khoảng 3-100 ký tự!';
                break;
            case 'guaranteeDuration':
                guaranteeDurationValid = value > 0;
                if (!guaranteeDurationValid) {
                    fieldValidationErrors.guaranteeDuration = guaranteeDurationValid ? '' : 'Vui lòng nhập thời gian bảo hành!';
                } else {
                    guaranteeDurationValid = re.test(value);
                    fieldValidationErrors.guaranteeDuration = guaranteeDurationValid ? '' : 'Định dạng số không đúng!';
                }
                break;
            default:
                break;
        }
        this.setState({ formErrors: fieldValidationErrors });
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name == "image_url") {
            console.log(event.target.files)
            console.log(event.target.file)
            return;
        }


        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        });

        this._validate(name, value);
    }

    render() {
        if (this.state.isRedirect) {
            return (
                <Redirect to="/devices/device" />
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
                                <strong>Thông tin loại thiết bị</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="select">Tên thiết bị</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.name}
                                            type="username" id="nf-username" name="name" placeholder="Nhập tên thiết bị..." autoComplete="current-password" />
                                        {this.state.formErrors.name ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.name}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="select">Loại thiết bị</Label>
                                        <Input
                                            onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.deviceType}
                                            type="select" name="deviceType" id="select">
                                            <option value="">---Chọn---</option>
                                            {
                                                this.state.deviceTypes.map((e, id) =>
                                                    <option key={id} value={e._id}>{e.name}</option>
                                                )
                                            }
                                        </Input>
                                        {this.state.formErrors.deviceType ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.deviceType}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Mô tả</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.description}
                                            type="username" id="nf-username" name="description" placeholder="Nhập mô tả..." autoComplete="current-password" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Giá nhập</Label>
                                        <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.inputPrice}
                                            type="username" id="nf-username" name="inputPrice" placeholder="Nhập giá vôn..." autoComplete="current-password" />
                                         {this.state.formErrors.inputPrice ? <FormText className="help-block"><span style={{color: "red"}}>{this.state.formErrors.inputPrice}</span></FormText> : ''} 
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Giá bán</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.price}
                                            type="username" id="nf-username" name="price" placeholder="Nhập giá bán..." autoComplete="current-password" />
                                        {this.state.formErrors.price ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.price}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Số lượng</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.amount}
                                            type="username" id="nf-username" name="amount" placeholder="Nhập số tiền..." autoComplete="current-password" />
                                        {this.state.formErrors.amount ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.amount}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Link ảnh</Label>
                                        <Input
                                            // value={this.state.form.image_url}
                                            onChange={(event) => (this.isChange(event))}
                                            type="file" name="image_url"
                                        />
                                        {
                                            (this.state.form.image_url) &&
                                            (
                                                <Card>
                                                    <CardImg src={this.state.form.image_url} />
                                                </Card>
                                            )
                                        }
                                        {/* <Input onChange = {(event) => (this.isChange(event))} 
                                            value = {this.state.form.image_url}
                                            type="username" id="nf-username" name="image_url" placeholder="Nhập link ảnh..." autoComplete="current-password" />
                                         {this.state.error.image_url ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''}  */}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Thời gian bảo hành</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.guaranteeDuration}
                                            type="username" id="nf-username" name="guaranteeDuration" placeholder="Nhập thời gian bảo hành..." autoComplete="current-password" />
                                        {this.state.formErrors.guaranteeDuration ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.guaranteeDuration}</span></FormText> : ''}
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                {/* <Button type="submit" size="sm" color="primary" disabled={this.state.isDisabled} onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button> */}
                                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger" onClick={this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DeviceNameFormUI
