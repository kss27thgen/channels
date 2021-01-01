
import React, { Component } from 'react';
import UserPanel from './UserPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import Channels from './Channels';


class SidePanel extends Component {
    render() {
        const { currentUser } = this.props;

        return (
            <div className="sidePanel">
                <header>
                    <FontAwesomeIcon icon={faMugHot} />
                    <h2>Channels</h2>
                </header>
                <UserPanel currentUser={currentUser} />
                <Channels />
            </div>
        );
    }
}

export default SidePanel;
