import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase'

class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        messagesRef: firebase.firestore().collection('messages'),
        errors: []
    }
    

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createMessage = () => {
        const { uid, displayName, photoURL } = this.props.currentUser
        const message = {
            content: this.state.message,
            timestamp: new Date(),
            channelId: this.props.currentChannel.id,
            user: {
                id: uid,
                name: displayName,
                avatar: photoURL
            }
        }
        return message;
    }

    sendMessage = event => {
        event.preventDefault();
        const { message, messagesRef } = this.state;

        if (message) {
            this.setState({ loading: true })
            messagesRef.add(this.createMessage())
            .then(() => {
                this.setState({loading: false, message: '', errors: []})
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(error)
                })
            })
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message'})
            })
        }
    }

    render() {

        return (
            <form className="messageForm">
                <input 
                    type="text"
                    name="message"
                    value={this.state.message}
                    placeholder="write your message.."
                    onChange={this.handleChange} />
                <div className="buttons">
                    <button 
                        type="submit"
                        disabled={this.state.loading}
                        onClick={this.sendMessage}
                        >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        {this.state.loading ? '投稿中...' : '投稿する'}
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faCamera} />
                        ファイルアップロード
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    modalShow: state.modal.modalShow,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(MessageForm);
