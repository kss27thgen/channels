import React, { Component } from 'react';
import firebase from '../../firebase'
import { v4 } from 'uuid'
import { connect } from 'react-redux';
import { closeModal } from '../../actions';

class AddChannel extends Component {
    state = {
        channles: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.firestore().collection('channels')
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel()
        }
    }

    addChannel = () => {
        const { channelName, channelDetails, channelsRef } = this.state;
        const { displayName, photoURL } = this.props.currentUser;
        const id = v4();
        const newChannel = {
            id,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: displayName,
                avatar: photoURL
            }
        }
        channelsRef.doc(id).set(newChannel)
            .then(() => {
                this.setState({ channelName: '', channelDetails: ''});
                this.props.closeModal();
                console.log('channel added')
            })
            .catch(error => console.log(error))
    }

    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

    renderModal = () => {
        return (
            <div className="addChannel">
                <h2>チャンネル登録</h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="チャンネル名"
                        name="channelName"
                        onChange={this.handleChange}
                        />
                    <textarea
                        type="text"
                        placeholder="チャンネル概要"
                        name="channelDetails"
                        onChange={this.handleChange}
                        rows="4"
                        ></textarea>
                    <div className="buttons">
                        <button type="submit">
                            登録
                        </button>
                        <button type="button" onClick={this.props.closeModal}>
                            キャンセル
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    render() {
        return (
            <>
                {this.renderModal()}
            </>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps, { closeModal })(AddChannel);
