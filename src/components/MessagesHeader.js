import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class MessagesHeader extends Component {
    render() {
        return (
            <div className="messagesHeader">
                <header>
                    <div className="info">
                        <FontAwesomeIcon icon={faStar} />
                        <h2>Channel</h2>
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

export default MessagesHeader;
