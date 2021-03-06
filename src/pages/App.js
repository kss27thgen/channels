import React, { Component } from 'react'
import ColorPanel from '../components/ColorPanel'
import SidePanel from '../components/sidePanel/SidePanel'
import Messages from '../components/Messages'
import MetaPanel from '../components/MetaPanel'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { openModal } from '../actions'
class App extends Component {

    render() {
        return (
            <div className="appPage">
                <SidePanel currentUser={this.props.currentUser} />
                <Messages currentChannel={this.props.currentChannel} />
                <Modal />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    modalShow: state.modal.modalShow,
    currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps, { openModal })(App)
