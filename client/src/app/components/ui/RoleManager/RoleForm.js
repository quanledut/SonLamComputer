import React, { Component } from 'react';
import Modal from './../utils/Modal'
import { Redirect } from 'react-router-dom';

import CustomTable from '../utils/Table'

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

const DEFAULT_FORM = {
    _id: '',
    name: '',
    policies: []
}

class RoleFormUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: { ...DEFAULT_FORM },
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },
            roles: [],
            isDisabled: true,
            isRedirect: false,
            collections: [],
            permissions: [],
            tbody: [],
            error: {
                name: '',
            },
            nameValid: false,
        };

        this.onClear = this.onClear.bind(this)
        this.isChange = this.isChange.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this._deletePolicy = this._deletePolicy.bind(this)
    }

    componentWillMount() {
        var { match } = this.props;
        if (match.params.id) {
            var id = match.params.id;

            this.props.findById(id, (data) => {
                console.log(data)
                this.setState({
                    ...this.state,
                    isDisabled: false,
                    form: data
                })
            })
        }
        this.props.findCollectionNames((data, error) => {
            this.setState({
                collections: data.collections,
                permissions: data.permissions
            })

        })
    }

    onClear = () => {
        let id_edit = '';
        if(this.props.match.params.id)
        {
            id_edit = this.props.match.params.id;
        }
        this.setState({
            form: { ...DEFAULT_FORM, _id: id_edit },
            error: {},
            modal: {
                isOpened: false,
                isLoading: false,
                title: "",
                content: ""
            },
            isDisabled: true,
            isRedirect: false,
            error: {
                name: '',
            },
            nameValid: false,
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

    _isPoliciesValid() {
        let collectionNames = []
        if (this.state.form.policies.length < 1) return false;
        for (let i = 0; i < this.state.form.policies.length; i++) {
            let policy = this.state.form.policies[i]
            if (policy.collectionName === "None") return false
            if (collectionNames.indexOf(policy.collectionName) !== -1) return false
            collectionNames.push(policy.collectionName)
        }
        return true
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
        for (let name in this.state.error) {
            if (this.state.error[name] !== "") {
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
            if (!this._isPoliciesValid()) {
                this._openModal({
                    isLoading: false,
                    isOpened: true,
                    title: "Error",
                    content: "Vui lòng phân quyền cho các bảng!"
                })
                return;
            }
            var { match } = this.props;
            if (match.params.id) {
                console.log(this.state.form)
                this.props.update(this.state.form, (res, error) => {
                    this._closeModal()
                    if (res) {
                        this._openModal({
                            title: "Success",
                            content: "Update success",
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
        let fieldValidationErrors = this.state.error;
        let nameValid = this.state.nameValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length > 0 && value.length < 101;
                fieldValidationErrors.name = nameValid ? '' : 'Vui lòng nhập tên quyền!';
                break;

            default:
                break;
        }
        this.setState({ error: fieldValidationErrors });
    }

    _deletePolicy = (event, i) => {
        event.preventDefault();
        this.setState({
            tbody: this.state.tbody.filter((item, id) => id !== i),
            form: {
                ...this.state.form,
                policies: this.state.form.policies.filter((item, id) => id !== i)
            }
        })
    }

    _handlePolicies = (e, key) => {
        this.setState({
            form: {
                ...this.state.form,
                policies: this.state.form.policies.map((policy, id) => {
                    if (id !== key) return policy
                    if (e.target.name === "collectionName") {
                        policy[e.target.name] = e.target.value
                        return policy
                    } else {
                        policy[e.target.name] = !policy[e.target.name]
                        return policy
                    }

                })
            }
        })
    }

    _addPolicy = (event) => {
        const key = this.state.tbody.length
        event.preventDefault()
        this.setState({
            form: {
                ...this.state.form,
                policies: [
                    ...this.state.form.policies,
                    {
                        collectionName: "None",
                        ...this.state.permissions.reduce((obj, i) => {
                            obj[i] = false
                            return obj
                        }, {})
                    }
                ]
            }
        })
        // this.setState({
        //     tbody: [
        //         ...this.state.tbody,
        //         <tr key={this.state.tbody.length}>
        //             <td>
        //                 <Input value={this.state.form.policies[key].collectionName} onChange={(e) => this._handlePolicies(e, key)} type="select" name="collectionName" id="exampleSelect">
        //                     <option value="None">Hãy chọn bảng</option>
        //                     {this.state.collections.map((item, id)=> <option key={id} value={item}>{item}</option>)}
        //                 </Input>
        //             </td>
        //             {
        //                 this.state.permissions.map((item, id) =>
        //                     <td key={id}>
        //                         <FormGroup check>
        //                             <Input onChange={(e) => this._handlePolicies(e, key)} type="checkbox" name={item} checked={this.state.form.policies[key][item]}/>
        //                         </FormGroup>
        //                     </td>)
        //             }
        //             <td><Button onClick={(e) => this._deletePolicy(e, key)}>Delete</Button></td>
        //         </tr>
        //     ]
        // })
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
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
                isDisabled: false
            })

        }
    }


    render() {
        if (this.state.isRedirect) {
            return (
                <Redirect to="/roles" />
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
                                <strong>Thông tin quyền</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên quyền</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.name}
                                            type="username" id="nf-username" name="name" placeholder="Nhập tên quyền..." autoComplete="current-password" />
                                        {this.state.error.name ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.error.name}</span></FormText> : ''}
                                    </FormGroup>
                                    <CustomTable
                                        thead={
                                            <tr>
                                                <th>Tên bảng</th>
                                                {this.state.permissions.map((item, id) => <th key={id}>{item}</th>)}
                                                <td><Button onClick={this._addPolicy}><i className="fa fa-plus"></i></Button></td>
                                            </tr>
                                        }

                                        tbody={this.state.form.policies.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <Input value={item.collectionName} onChange={(e) => this._handlePolicies(e, key)} type="select" name="collectionName" id="exampleSelect">
                                                            <option value="None">Hãy chọn bảng</option>
                                                            {this.state.collections.map((item, id) => <option key={id} value={item}>{item}</option>)}
                                                        </Input>
                                                    </td>
                                                    {
                                                        this.state.permissions.map((permission, id) => {
                                                            let disabled = false;
                                                            if (permission == 'isRead' && (item.collectionName == 'Device' || item.collectionName == 'DeviceType')) {
                                                                item[permission] = true;
                                                                disabled = true;
                                                            }

                                                            return (
                                                                <td key={id}>
                                                                    <FormGroup check>
                                                                        <Input onChange={(e) => this._handlePolicies(e, key)} type="checkbox" name={permission} checked={item[permission]} disabled={disabled ? true : false} />
                                                                    </FormGroup>
                                                                </td>
                                                            )
                                                        }
                                                        )
                                                    }
                                                    <td><Button onClick={(e) => this._deletePolicy(e, key)}>Delete</Button></td>
                                                </tr>
                                            )
                                        })}
                                        hasPagination={false}
                                    />
                                    <Button type="submit" size="sm" color="primary" onClick={this.onSubmitForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                    <Button type="reset" size="sm" color="danger" onClick={this.onClear}><i className="fa fa-ban"></i> Reset</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RoleFormUI
