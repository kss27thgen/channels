import moment from 'moment';
import React, { Component } from 'react';


class Message extends Component {

    isOwnMessage = (message, user) => {
        return message.user.id === user.uid && 'messageOfMine'
    }

    timeFromNow = timestamp => moment(timestamp).fromNow();

    render() {
        const { message, user } = this.props;
        return (
            <div className="message">
                <div className="avatar">
                    <img src={message.user.avatar} alt="avatar" />
                </div>
                <div className="right">
                    <div className="upper">
                        <div className="name">{message.user.name}</div>
                        <div className="time">{this.timeFromNow(message.timestamp.toDate())}</div>
                    </div>
                    <div>
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
