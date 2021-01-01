import React, { Component } from 'react';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';
import firebase from '../firebase'
import { connect } from 'react-redux';
import Message from './Message';

class Messages extends Component {
    state = {
        messagesRef: firebase.firestore().collection('messages'),
        chnannelsRef: firebase.firestore().collection('channels'),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messages: [],
        messagesLoading: true
    }

    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListeners(channel.id)
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId)
    }

    addMessageListener = channelId => {
        console.log(channelId)
        let loadtedMessages = [];
        const unsubscribe = this.state.chnannelsRef.doc(channelId).collection('messages').onSnapshot(snapShot => {
            snapShot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    loadtedMessages.push(change.doc.data())
                }
                this.setState({
                    messages: loadtedMessages,
                    messagesLoading: false
                })
            })
        })
    }


    displayMessages = messages => {
        return messages.length > 0 && messages.map(message => (
            <Message 
                key={message.timestamp} 
                message={message}
                user={this.state.user} />
        ))
    }

    render() {
        const { messagesRef, messages } = this.state;

        return (
            <div className="messages">
                <MessagesHeader />

                {this.displayMessages(messages)}

                <MessageForm
                    messagesRef={messagesRef}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    modalShow: state.modal.modalShow,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(Messages);
