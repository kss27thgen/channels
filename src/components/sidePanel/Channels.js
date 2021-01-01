import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal, setCurrentChannel } from '../../actions';
import firebase from '../../firebase'

class Channels extends Component {
    state = {
        channels: [],
        chnannelsRef: firebase.firestore().collection('channels'),
        firstLoad: true,
        activeChannel: '',
        unsubscribe: null
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    addListeners = () => {
        let loadedChannels = [];
        const unsubscribe = this.state.chnannelsRef.onSnapshot(snapShot => {
            snapShot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    loadedChannels.push(change.doc.data())
                }
                this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
            })
        })
        this.setState({ unsubscribe })
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel)
            this.setActiveChannel(firstChannel)
        }
        this.setState({ firstLoad: false })
    }

    handleOpenModal = () => {
        this.props.openModal('add channel')
    }

    displayChannels = channels => {
        return channels.length > 0 && channels.map(channel => (
            <b
                key={channel.id}
                name={channel.name}
                className={`${channel.id === this.state.activeChannel && 'active'}`}
                onClick={() => this.changeChannel(channel)}>
                # {channel.name}
            </b>
        ))
    }
    
    changeChannel = channel => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
    }

    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id })
    }

    render() {
        const { channels } = this.state;

        return (
            <section className="channels">
                <div className="upper">
                    <h3>
                        チャンネル
                        ({ channels.length })
                    </h3>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={this.handleOpenModal} />
                </div>
                <div className="bottom">
                    {this.displayChannels(channels)}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    modalShow: state.modal.modalShow,
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps, {openModal, setCurrentChannel })(Channels);
