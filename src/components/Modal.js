import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import ChannelInfo from './ChannelInfo';
import AddChannel from './sidePanel/AddChannel';

class Modal extends Component {
    
    renderModalContent = (content) => {
        switch(content) {
            case 'add channel':
                return <AddChannel />
            case 'channel info':
                return <ChannelInfo />
            default:
                return 
        }
    }   

    render() {
        return (
            <div className={`modalWrap ${this.props.modalShow && 'show'}`}>
                <div className="overlay" onClick={() => this.props.closeModal()}>
                </div>
                <div className="modal">
                    {this.renderModalContent(this.props.content)}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modalShow: state.modal.modalShow,
    content: state.modal.content
})

export default connect(mapStateToProps, { closeModal })(Modal);
