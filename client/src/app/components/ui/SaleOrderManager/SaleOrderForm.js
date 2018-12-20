import React, { Component } from 'react';
import Modal from './../utils/Modal'
import { Redirect } from 'react-router-dom';
import { CustomerFormUI } from '../../containers/services';
import { getCurrentUser } from '../../../utils';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
} from 'reactstrap';

import CustomTable from '../utils/Table'
import Select from 'react-select';

const DEFAULT_FORM = {
    _id: '',
    customer_name: null,
    staff: {
        _id: '',
        fullname: '',
    },
    accessories: [],
    devices: [],
    totalPrice: 0,
    status: false
}

class SaleOrderFormUI extends Component {

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
            devices: {},
            customers: [],
            deviceTypes: [],
            _device_id: '',
            isDisabled: true,
            isRedirect: false,
            tbody: [],
            formErrors: { totalPrice: '', customer_name: '', customer_phone: '' },
            totalPriceValid: false,
            customer_nameValid: false,
            formValid: false,
            isOpen: false
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)

        this._addDevice = this._addDevice.bind(this)
        this._handleDevices = this._handleDevices.bind(this)
    }

    componentWillMount() {
        var { match } = this.props;
        if (match.params.id) {
            var id = match.params.id;

            this.props.getById(id, (data) => {
                console.log("Edit: ", data)
                this.setState({
                    ...this.state,
                    form: {
                        ...data,
                        staff: {
                            _id: data.staff._id,
                            fullname: data.staff.fullname,
                        },
                        customer_name: {
                            value: data.customer._id,
                            label: `${data.customer.fullname}, SĐT: ${data.customer.phone}`,
                        },
                    },
                })
            })
        }
        else {
            this.props.findAllcustomer((customers, err) => {
                console.log("serviceTypes: ", customers, err)
                const currentUser = getCurrentUser();
                console.log(currentUser)
                if (!err) this.setState({
                    ...this.state,
                    customers: customers.map(i => i.user),
                    form: {
                        ...this.state.form,
                        staff: {
                            _id: currentUser._id,
                            fullname: currentUser.fullname,
                        }
                    }
                })
            });

            this._findAllDeviceTypes();

        }

    }

    componentDidUpdate() {
        this.props.findAllcustomer((customers, err) => {
            console.log("serviceTypes: ", customers, err)
            if (!err) this.setState({
                ...this.state,
                customers: customers.map(i => i.user),
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
            _device_id: '',
            isDisabled: true,
            isRedirect: false,
            formErrors: { totalPrice: '', customer_name: '' },
            totalPriceValid: false,
            customer_nameValid: false,
            formValid: false,
            isOpen: false
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

    _findAllDeviceTypes() {
        this.props.findAllDeviceTypes({
            all: true,
        }, (deviceTypes, err) => {
            if (!err) this.setState({
                ...this.state,
                deviceTypes: deviceTypes.docs
            })
        })
    }

    _findDevice(type) {
        this.props.findAllDevices({
            type,
            all: true
        }, (res, err) => {
            /*this.setState({
                ...this.state,
                devices: {
                    ...this.state.devices,
                    [type]: res
                }
            }, () => {
                console.log(this.state);
            })*/
            this.state.devices[type] = res.docs;
            console.log(this.state, res.docs);
        })
    }

    _addDevice(event) {
        event.preventDefault()
        this.setState({
            form: {
                ...this.state.form,
                devices: [
                    ...this.state.form.devices,
                    {
                        name: "None",
                        type: "None"
                    }
                ]
            }
        }, () => {
            console.log(this.state)
        })
    }

    _handleDevices = (e, key) => {
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                devices: this.state.form.devices.map((device, id) => {
                    if (id !== key) return device
                    device[name] = value

                    if (name === "type") {
                        this._findDevice(device.type)
                    } else if (name === "name") {
                        const currentDevice = this.state.devices[device.type].filter(i => i._id === value)[0]
                        return {
                            ...device,
                            price: currentDevice.price,
                            guaranteeDuration: currentDevice.guaranteeDuration
                        }
                    }

                    return device
                })
            }
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        console.log(this.state.form)
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
            return;
        }

        if (this._checkError()) {
            this._openModal({
                title: "Error",
                content: "Xin hãy nhập dữ liệu hợp lệ",
                isLoading: false,
            })
            return;
        }

        this._openModal({
            isLoading: true,
            isOpened: true,
            title: "Loading"
        })

        this.state.form.customer = this.state.form.customer_name.value;

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
            this.state.form.accessories = this.state.form.accessories.map(i => {
                return {
                    ...i,
                    computerName: this.state.computerNames.filter(i1 => i1._id === i.computerName)[0].name,
                    type: this.state.accessoryTypes.filter(i1 => i1._id === i.type)[0].name
                }
            })

            this.state.form.devices = this.state.form.devices.map(i => {
                const type = this.state.deviceTypes.filter(i1 => i1._id === i.type)[0].name;
                return {
                    ...i,
                    deviceId: this.state.devices[i.type].filter(i1 => i1._id === i.name)[0]._id,
                    name: this.state.devices[i.type].filter(i1 => i1._id === i.name)[0].name,
                    type
                }
            })

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

    _checkError() {
        let isError = false;
        let error = {};

        const isEmpty = this.state.form.devices.reduce((isNone, item) => {
            if (isNone) return isNone;
            if (item === "None") return true;
        }, false) || this.state.form.devices.length === 0
            && (this.state.form.accessories.reduce((isNone2, item2) => {
                if (isNone2) return isNone2;
                if (item2 === "None") return true;
            }, false) || this.state.form.accessories.length === 0);

        if (isEmpty) {
            isError = true
            error.roles = true
        }

        this.setState({
            error
        })

        return isError;
    }

    _validate(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let customer_nameValid = this.state.customer_nameValid;
        let totalPriceValid = this.state.totalPriceValid;

        const re = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        const regex = /^\+?(?:[0-9] ?){8,14}[0-9]$/;

        switch (fieldName) {
            case 'totalPrice':
                totalPriceValid = re.test(value);
                fieldValidationErrors.totalPrice = totalPriceValid ? '' : 'Định dạng số không đúng!';
                break;
            case 'customer_name':
                customer_nameValid = (value !== null && value !== "" && value !== "None");
                fieldValidationErrors.customer_name = customer_nameValid ? '' : ' Vui lòng chọn khách hàng!';
                break;
            default:
                break;
        }
        this.setState({ formErrors: fieldValidationErrors });
    }

    isChange = (event) => {
        console.log(event.target.value)
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        });

        if (name === "deviceChoose") {
            this.setState({
                _device_id: value
            });
        }

        this._validate(name, value);

        this.setState({
            form: {
                ...this.state.form,
                accessories: []
            }
        })
    }


    _deleteDevices = (event, i) => {
        event.preventDefault();
        this.setState({
            tbody: this.state.tbody.filter((item, id) => id !== i),
            form: {
                ...this.state.form,
                devices: this.state.form.devices.filter((item, id) => id !== i)
            }
        })
    }

    showPopUp = () => {
        this.setState({
            ...this.state,
            isOpen: true
        }
        )
    }

    onClose() {
        this.setState({
            ...this.state,
            isOpen: false
        })
    }

    handleChange = (selectedOption) => {
        this.setState({
            form: {
                ...this.state.form, customer_name: selectedOption
            }
        });
    };

    render() {
        if (this.state.isRedirect) {
            return (
                <Redirect to="/saleorders/" />
            )
        }

        const options = [];
        this.state.customers.map((e, key) => {
            var name = e.fullname + ', SĐT: ' + e.phone;
            var id = e._id;
            options.push({ value: id, label: name })
        }
        );
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
                <CustomerFormUI
                    isOpen={this.state.isOpen}
                    isClose={() => this.onClose()}
                    link={'/saleorders/new'}
                />
                <Row>
                    <Col xs="12" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Thông tin dịch vụ</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Nhân viên</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            disabled
                                            value={this.state.form.staff.fullname}
                                            type="fullname" id="nf-username" name="totalPrice" placeholder="Nhan vien" autoComplete="current-password" />
                                        {this.state.formErrors.totalPrice ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.totalPrice}</span></FormText> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Khách hàng</Label>
                                        <FormGroup row className="my-0">
                                            <Col xs="11">
                                                <Select
                                                    value={this.state.form.customer_name}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                    isDisabled={(this.props.match.params.id) ? true : false}
                                                />
                                            </Col>
                                            <Col xs="1">
                                                <Button disabled={(this.props.match.params.id) ? true : false} onClick={() => { this.showPopUp() }}><i className="fa fa-plus"></i></Button>
                                            </Col>

                                        </FormGroup>
                                        {this.state.formErrors.customer_name ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.customer_name}</span></FormText> : ''}
                                    </FormGroup>
                                    {
                                        (this.props.match.params.id)
                                        && (
                                            <FormGroup>
                                                <Label htmlFor="nf-username">Tổng tiền</Label>
                                                <Input onChange={(event) => (this.isChange(event))}
                                                    disabled={(this.props.match.params.id) ? "disabled" : ""}
                                                    value={this.state.form.totalPrice}
                                                    type="username" id="nf-username" name="totalPrice" placeholder="Nhập tổng tiền..." autoComplete="current-password" />
                                                {this.state.formErrors.totalPrice ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.formErrors.totalPrice}</span></FormText> : ''}
                                            </FormGroup>
                                        )
                                    }

                                    <hr />
                                    <FormGroup row>
                                        <Col md="12">
                                            <Label htmlFor="select">Thiết bị mua bán</Label>
                                        </Col>
                                    </FormGroup>
                                    <CustomTable
                                        thead={
                                            (!this.props.match.params.id) ?
                                                (
                                                    <tr>
                                                        <th>Loại thiết bị</th>
                                                        <th>Tên thiết bị</th>
                                                        <th>Giá tiền</th>
                                                        <th style={{ width: '20%' }}>Thời gian bảo hành</th>
                                                        <th style={{ width: '15%' }}>
                                                            {
                                                                (!this.props.match.params.id) &&
                                                                <Button onClick={this._addDevice}><i className="fa fa-plus"></i></Button>
                                                            }
                                                        </th>
                                                    </tr>
                                                ) :
                                                (
                                                    <tr>
                                                        <th>Loại thiết bị</th>
                                                        <th>Tên thiết bị</th>
                                                        <th>Giá tiền</th>
                                                        <th style={{ width: '20%' }}>Thời gian bảo hành</th>
                                                        <th style={{ width: '15%' }}>
                                                            Ngày hết hạn BH
                                                                </th>
                                                    </tr>

                                                )
                                        }

                                        tbody={
                                            (!this.props.match.params.id)
                                                ? this.state.form.devices.map((item, key) => {
                                                    console.log(this.state, item);
                                                    return (<tr key={key}>
                                                        <td>
                                                            <Input value={item.type} onChange={(e) => this._handleDevices(e, key)} type="select" name="type" id="exampleSelect">
                                                                <option value="None">Hãy chọn loại thiết bị</option>
                                                                {this.state.deviceTypes.map((i1, id) => <option key={id} value={i1._id}>{i1.name}</option>)}
                                                            </Input>
                                                        </td>
                                                        <td>
                                                            {
                                                                (!item.type || item.type == "None") &&
                                                                <p>Xin hãy chọn loại thiết bị</p>

                                                            }

                                                            {
                                                                (item.type && item.type != "None") &&
                                                                <Input value={item.name} onChange={(e) => this._handleDevices(e, key)} type="select" name="name" id="exampleSelect">
                                                                    <option value="None">Hãy chọn thiết bị</option>
                                                                    {this.state.devices[item.type] ? this.state.devices[item.type].map((i1, id) => <option key={id} value={i1._id}>{i1.name}</option>) : []}
                                                                </Input>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                (!item.name || item.name == "None") &&
                                                                <p>Xin hãy chọn thiết bị</p>

                                                            }

                                                            {
                                                                (item.name && item.name != "None") &&
                                                                <Input value={item.price} onChange={(e) => this._handleDevices(e, key)} type="text" name="price" id="exampleSelect">
                                                                </Input>

                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                (!item.name || item.name == "None") &&
                                                                <p>Xin hãy chọn thiết bị</p>

                                                            }

                                                            {
                                                                (item.name && item.name != "None") &&
                                                                <Input value={item.guaranteeDuration} onChange={(e) => this._handleDevices(e, key)} type="text" name="guaranteeDuration" id="exampleSelect">
                                                                </Input>

                                                            }
                                                        </td>

                                                        <td><Button onClick={(e) => this._deleteDevices(e, key)}>Delete</Button></td>
                                                    </tr>)
                                                })
                                                : this.state.form.devices.map((item, key) => {
                                                    const expiredDate = new Date(this.state.form.date);
                                                    expiredDate.setMonth(expiredDate.getMonth() + item.guaranteeDuration);
                                                    return (<tr key={key}>
                                                        <td>
                                                            {item.type}
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            {item.formatPrice}
                                                        </td>
                                                        <td>
                                                            {item.guaranteeDuration}
                                                        </td>
                                                        <td>
                                                            {`${expiredDate.getDate()}-${expiredDate.getMonth() + 1}-${expiredDate.getFullYear()}`}
                                                        </td>

                                                    </tr>)
                                                })
                                        }
                                        hasPagination={false}
                                    />
                                    {this.state.error.roles ? <FormText className="help-block"><span style={{ color: "red" }}>Vui lòng chọn thiết bị!</span></FormText> : ''}
                                    {
                                        (!this.props.match.params.id) &&
                                        <div>
                                            <Button type="submit" size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                            <Button type="reset" size="sm" color="danger" onClick={this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                        </div>
                                    }
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SaleOrderFormUI
