import ReactDOM from 'react-dom';
import App from './pages/App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'


const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
)