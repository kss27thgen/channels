import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChannelInfo extends Component {
    render() {
        return (
            <div>
                {this.props.currentChannel.name}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modalShow: state.modal.modalShow,
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(ChannelInfo);
