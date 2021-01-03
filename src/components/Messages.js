import React, { Component, useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';
import firebase from '../firebase'
import { connect } from 'react-redux';
import Message from './Message';

const Messages = ({ currentUser, currentChannel = {} }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        addListeners(currentChannel.id)

        return () => unsubscribe();
    }, [currentChannel])

    const addListeners = (channelId) => {
        addMessageListener(channelId)
    }

    let unsubscribe = function(){};

    const addMessageListener = (channelId) => {
		let loadedMessages = [];
        unsubscribe = firebase.firestore().collection('messages')
            .orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						loadedMessages.unshift(change.doc.data());
					}
				});
				filterMessages(channelId, loadedMessages);
			});
	};

    const filterMessages = (channelId, loadedMessages) => {
		setMessages(
			loadedMessages.filter(
				(message) => message.channelId === channelId,
            )
        );
	};

    const displayMessages = messages => {
        return messages.length > 0 && messages.map((message, i) => (
            <Message 
                key={i} 
                message={message}
                user={currentUser} />
        ))
    }

    return (
        <div className="messages">
            <MessagesHeader />

            <div className="message-list">
                {displayMessages(messages)}
            </div>

            <MessageForm />
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    modalShow: state.modal.modalShow,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(Messages);
