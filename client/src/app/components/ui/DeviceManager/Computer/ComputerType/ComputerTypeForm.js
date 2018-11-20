import React, { Component } from 'react';
import Modal from './../../../utils/Modal'
import { Redirect } from 'react-router-dom';

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
    _id: '',
    name: '',
}

class ComputerTypeFormUI extends Component {

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
            isDisabled: true,
            isRedirect: false,
            error: {
                name: '',
            },
            nameValid: false,
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
    }

    onClear = () => {
        this.setState({
            form: { ...DEFAULT_FORM },
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
        let fieldValidationErrors = this.state.error;
        let nameValid = this.state.nameValid;

        switch(fieldName) {
          case 'name':
            nameValid = value.length > 5 && value.length < 101;
            fieldValidationErrors.name = nameValid ? '': 'Vui lòng nhập tên loại máy tính trong khoảng 6-100 ký tự!';
            break;
          
          default:
            break;
        }
        this.setState({error: fieldValidationErrors});
      }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
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
                <Redirect to="/devices/computerType" />
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
                                <strong>Thông tin loại máy tính</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <Label htmlFor="nf-username">Tên loại máy tính</Label>
                                        <Input onChange={(event) => (this.isChange(event))}
                                            value={this.state.form.name}
                                            type="username" id="nf-username" name="name" placeholder="Nhập tên loại máy tính..." autoComplete="current-password" />
                                        {this.state.error.name ? <FormText className="help-block"><span style={{ color: "red" }}>{this.state.error.name}</span></FormText> : ''}
                                    </FormGroup>
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

export default ComputerTypeFormUI
