import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMugHot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errors: [],
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

    isFormValid = ({ email, password }) => {
        return email && password;
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.isFormValid(this.state)) {
            return;
        }

        this.setState({errors: [], loading: true})

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedUser => {
                console.log(signedUser)
            })
            .catch(error => {
                this.setState({
                    errors: this.state.errors.concat(error),
                    loading: false
                })
            })
    }


    render() {
        const {  email, password, errors, loading } = this.state;

        return (
            <div className="authPage">
                <header>
                    <FontAwesomeIcon icon={faMugHot} />
                    <h1>Login to Channels App</h1>
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
                        <button
                            className="submitButton"
                            type="submit" 
                            disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}      
                        </button> 
                    </form>

                    <footer>
                        <p>
                            Don't have an account?
                        </p>
                        <Link to="/register">
                            Register
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </footer>
                </main>
            </div>
        )

    }

}

export default Login
