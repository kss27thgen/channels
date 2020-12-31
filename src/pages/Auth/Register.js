import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMugHot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import md5 from 'md5'

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        loading: false,
        errors: [],
        usersRef: firebase.firestore().collection('users')
    }

    isFormValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all fields' }
            this.setState({ errors: errors.concat(error) })
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error  ={ message: 'Password is Invalid' }
            this.setState({ errors: errors.concat(error) })
            return false;
        } else {
            return true;
        }
    }

    isPasswordValid = ({ password, passwordConf }) => {
        if (password.length < 6 || passwordConf.length < 6) {
            return false;
        } else if (password !== passwordConf) {
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConf }) => {
        return !username.length || !email.length || !password.length || !passwordConf.length 
    }

    displayErrors = errors => errors.map((error, i) => (
        <p key={i}>{error.message}</p>
    ))

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.isFormValid()) {
            return;
        }

        this.setState({errors: [], loading: true})

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser)
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log('user saved')
                        this.setState({ loading: false })
                    })
                })
                .catch(error => {
                    this.setState({ errors: this.state.errors.concat(error), loading: false})
                })
            })
            .catch(error => {
                this.setState({ errors: this.state.errors.concat(error), loading: false })
            })
    }

    saveUser = createdUser => {
        return this.state.usersRef.doc(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    render() {
        const { username, email, password, passwordConf, errors, loading } = this.state;

        return (
            <div className="authPage">
                <header>
                    <FontAwesomeIcon icon={faMugHot} />
                    <h1>Register for Channels App</h1>
                </header>
                <main>
                    <form onSubmit={this.handleSubmit}>
                        {errors.length > 0 && (
                            <div className="error">
                                <b>Error</b>
                                {this.displayErrors(errors)}
                            </div>
                        )}
                        <input 
                            name="username"
                            type="text"
                            value={username}
                            placeholder="username"
                            onChange={this.handleChange} />
                        <input 
                            name="email"
                            type="email"
                            value={email}
                            placeholder="email"
                            className={this.handleInputError(errors, 'email')}
                            onChange={this.handleChange} />
                        <input 
                            name="password"
                            type="password"
                            value={password}
                            placeholder="password"
                            className={this.handleInputError(errors, 'password')}
                            onChange={this.handleChange} />
                        <input 
                            name="passwordConf"
                            type="password"
                            value={passwordConf}
                            placeholder="password confirmation"
                            className={this.handleInputError(errors, 'password')}
                            onChange={this.handleChange} />

                        <button
                            className="submitButton"
                            type="submit" 
                            disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}      
                        </button> 
                    </form>

    
                    <footer>
                        <p>
                            Already have an account?
                        </p>
                        <Link to="/login">
                            Login
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </footer>
                </main>
            </div>
        )

    }

}

export default Register
