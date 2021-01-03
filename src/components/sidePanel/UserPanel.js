import React, { Component } from 'react';
import firebase from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

class UserPanel extends Component {
    state = {
        dropdownOpen: false,
        user: this.props.currentUser,
        user2: firebase.auth().currentUser
    }


    toggleDropdown = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('sign out'))
    }

    render() {
        const { photoURL, displayName } = this.state.user2;
        return (
            <section className="userPanel">
                <div className="dropdown">
                    <h3 onClick={this.toggleDropdown}>
                        <img src={photoURL} alt="avatar"/>
                        {this.state.user.displayName}
                        {this.state.dropdownOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                    </h3>
                    {this.state.dropdownOpen && (
                        <ul>
                            <li>
                                アバター変更
                            </li>
                            <li onClick={this.handleSignout}>
                                ログアウト
                            </li>
                        </ul>
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default UserPanel;
