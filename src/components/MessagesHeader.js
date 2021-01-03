import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { openModal } from '../actions';

class MessagesHeader extends Component {

    openChannelInfoModal = () => {
        this.props.openModal('channel info');
    }

    render() {
        const { currentChannel } = this.props;
        return (
            <div className="messagesHeader">
                <header>
                    <div className="infoModal" onClick={this.openChannelInfoModal}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                    <div className="info">
                        <FontAwesomeIcon icon={faStar} />
                        <h2>{currentChannel.name}</h2>
                        <em>2 users</em>
                    </div>
                    <div className="input">
                        <input 
                            type="text"
                            placeholder="serach messages" />
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modalShow: state.modal.modalShow,
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps, { openModal })(MessagesHeader);
