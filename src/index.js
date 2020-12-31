import ReactDOM from 'react-dom';
import App from './pages/App'
import './static/base.sass'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
import firebase from './firebase'
import { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser } from './actions';
import Loader from './components/Loader'

const store = createStore(rootReducer, composeWithDevTools());
class Root extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.props.history.push('/');
            }
        })
    }

    render() {
        return this.props.isLoading ? <Loader /> : (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)