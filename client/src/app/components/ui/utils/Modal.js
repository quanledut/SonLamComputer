/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

class CustomModal extends React.Component {
    // componentWillReceiveProps(nextProps) {
    //     this.state.isOpened = nextProps.isOpened
    // }

    render() {
        return (
        <div>
            <Modal isOpen={this.props.isOpened} onClosed={this.props.onClosed}>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>
                    {this.props.content}
                </ModalBody>
            {!this.props.isLoading && 
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onOkay}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
                </ModalFooter>
            }
            </Modal>
        </div>
        );
    }
}

CustomModal.propTypes = {
    isOpened: PropTypes.bool,
    onClosed: PropTypes.func,
    onOkay: PropTypes.func,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string
}

CustomModal.defaultProps = {
    onClosed: ()=>{},
    onOkay: ()=>{},
    onCancel: ()=>{},
    isLoading: false,
    title: "",
    content: ""

}

export default CustomModal;