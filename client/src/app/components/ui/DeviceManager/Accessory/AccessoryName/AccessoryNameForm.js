import React, { Component } from 'react';
import Modal from '../../../utils/Modal'
import { Redirect } from 'react-router-dom';
import CustomTable from '../../../utils/Table';

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
    CardImg,
} from 'reactstrap';

const DEFAULT_FORM = {
    _id: '',
    type: '',
    description: '',
    image_url: '',
    amount: 0,
    price: 0,
    guaranteeDuration: 0,
    inputPrice: 0
}

class AccessoryNameFormUI extends Component {

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
            types: [],
            import: [],
            export: [],
            isDisabled: true,
            isRedirect: false,
            formErrors: { type: '', amount: '', price: '', guaranteeDuration: '', inputPrice: '' },
            typeValid: false,
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
        this.props.findAllaccessoryType({
            all: true
        }, (types, err) => {
            console.log(types, err)
            if (!err) this.setState({
                ...this.state,
                types: types.docs
            })
        });

        this.props.getImportById(id, (data) => {
          this.setState({
            ...this.state,
            import: data
          })
        })

        this.props.getExportById(id, (data) => {
          this.setState({
            ...this.state,
            export: data
          })
        })

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
            formErrors: { type: '', amount: '', price: '', guaranteeDuration: '', inputPrice: '' },
            typeValid: false,
            amountValid: false,
            priceValid: false,
            inputPriceValid: false,
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
        console.log(this.state.form)
        var check = true;
        for (let name in this.state.formErrors) {
            if (this.state.formErrors[name] !== "") {
                check = false;
            }
        }

        if (!check) {
            this._openModal({
                title: "Thông báo",
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
        let typeValid = this.state.typeValid;
        let amountValid = this.state.amountValid;
        let priceValid = this.state.priceValid;
        let inputPriceValid = this.state.inputPriceValid;
        let guaranteeDurationValid = this.state.guaranteeDurationValid;

        const re = /^\$?[0-9]+(\.[0-9][0-9])?$/;

        switch (fieldName) {
            case 'type':
                typeValid = (value !== null && value !== "" && value !== "None");
                fieldValidationErrors.type = typeValid ? '' : 'Vui lòng chọn loại linh kiện!';
                break;
            case 'amount':
                console.log(value)
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
                    fieldValidationErrors.price = priceValid ? '' : 'Vui lòng nhập giá linh kiện!';
                } else {
                    priceValid = re.test(value);
                    fieldValidationErrors.price = priceValid ? '' : 'Định dạng số không đúng!';
                }
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
                <Redirect to="/devices/accessory" />
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
                                <strong>Thông tin linh kiện</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="select">Loại linh kiện</Label>
                                        <Input
                                            onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.type}
                                            type="select" name="type" id="select">
                                            <option value="None">---Chọn---</option>
                                            {
                                                this.state.types.map((e, id) =>
                                                    <option key={id} value={e._id}>{e.name}</option>
                                                )
                                            }
                                        </Input>
                                        {this.state.formErrors.type ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.type}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Mô tả</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.description}
                                            type="username" id="nf-username" name="description" placeholder="Nhập mô tả..." autoComplete="current-password" />
                                    </FormGroup>
                                    {(this.props.match.params.id) ? '' :
                                        <FormGroup>
                                            <Label htmlFor="nf-username">Giá nhập</Label>
                                            <Input onChange={(event) => (this.isChange(event))}
                                                value={this.state.form.inputPrice}
                                                type="username" id="nf-username" name="inputPrice" placeholder="Nhập giá vốn..." autoComplete="current-password" />
                                            {this.state.formErrors.inputPrice ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.inputPrice}</span></FormText> : ''}
                                        </FormGroup>
                                    }

                                    <FormGroup>
                                        <Label htmlFor="nf-username">Giá bán</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.price}
                                            disabled={(this.props.match.params.id) ? true : false}
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
                                    {/* <FormGroup>
                                        <Label htmlFor="nf-username">Link ảnh</Label>
                                        <Input
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
                                    </FormGroup> */}
                                    {/* <FormGroup>
                                        <Label htmlFor="nf-username">Link ảnh</Label>
                                        <Input onChange = {(event) => (this.isChange(event))}
                                            value = {this.state.form.image_url}
                                            type="username" id="nf-username" name="image_url" placeholder="Nhập link ảnh..." autoComplete="current-password" />
                                         {this.state.error.image_url ? <FormText className="help-block"><span style={{color: "red"}}>Vui lòng nhập đúng định dạng!</span></FormText> : ''}
                                    </FormGroup> */}
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Thời gian bảo hành</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.guaranteeDuration}
                                            type="username" id="nf-username" name="guaranteeDuration" placeholder="Nhập thời gian bảo hành..." autoComplete="current-password" />
                                        {this.state.formErrors.guaranteeDuration ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.guaranteeDuration}</span></FormText> : ''}
                                    </FormGroup>
                                    {
                                  (this.props.match.params.id) && (
                                    <div>
                                      <Label htmlFor="select">Lịch sử nhập kho</Label>
                                      <CustomTable
                                        thead = {
                                            <tr>
                                                <th>Ngày nhập</th>
                                                <th>Số lượng</th>
                                                <th>Giá nhập</th>
                                            </tr>
                                        }

                                        tbody = {this.state.import.map((item, key) => {
                                          return (
                                            <tr key>
                                              <td>
                                                <a>{item.createdAt}</a>
                                              </td>
                                              <td>
                                                <a>{item.amount}</a>
                                              </td>
                                              <td>
                                                <a>{item.price}</a>
                                              </td>
                                            </tr>
                                          )
                                        })}

                                        hasPagination = {false} />
                                    </div>
                                  )
                                }

                                {
                                  (this.props.match.params.id) && (
                                    <div>
                                      <Label htmlFor="select">Lịch sử xuất kho</Label>
                                        <CustomTable
                                          thead = {
                                              <tr>
                                                  <th>Ngày nhập</th>
                                                  <th>Số lượng</th>
                                                  <th>Giá bán</th>
                                              </tr>
                                          }

                                          tbody = {this.state.export.map((item, key) => {
                                            return (
                                              <tr key>
                                                <td>
                                                  <a>{item.createdAt}</a>
                                                </td>
                                                <td>
                                                  <a>{item.amount}</a>
                                                </td>
                                                <td>
                                                  <a>{item.price}</a>
                                                </td>
                                              </tr>
                                            )
                                          })}

                                          hasPagination = {false} />
                                    </div>
                                  )
                                }
                                </Form>
                            </CardBody>
                            <CardFooter>
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

export default AccessoryNameFormUI
