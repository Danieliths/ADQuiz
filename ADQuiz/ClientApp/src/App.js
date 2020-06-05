import React, { Component } from 'react';
import { Route, Router  } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { createBrowserHistory } from 'history';
import { AddQuestion } from './components/AddQuestion';
import { Quiz } from './components/Quiz';
import { authenticationService } from './Helpers'
import './custom.css'

export const history = createBrowserHistory();
export default class App extends Component {
  static displayName = App.name;
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
        };
    }
    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        this.setState({ currentUser: authenticationService.currentUserValue })
    }


  render () {
        const { currentUser } = this.state;
      return (
        <Layout>
              {currentUser ?
                  <Route exact path='/' component={Quiz} /> :
                  <Route exact path='/' component={Login} />
              }
        <Router history={history}></Router>
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/addquestion' component={AddQuestion} />
		<Route exact path='/quiz' component={Quiz} />
        </Layout>
    );
  }
}
