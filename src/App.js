import { ThemeProvider } from 'styled-components'
import React, { Component } from 'react';

import { Provider } from 'mobx-react'
import { observer, } from 'mobx-react'

import AppStore from './store'
import colors from 'tailwindcss/colors'
import "@fortawesome/fontawesome-free/css/all.css";



import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Header from './Header'
import Search from './Search'
import Pricing from './Pricing' // <--- Add this line  
import Sidebar from './Components/Sidebar/Sidebar';
// import HeaderStats from './Components/Headers/HeaderStats';

import Dashboard from './Dashboard'

import Tool from './Core/Tool'
import Chat from './Core/Chat'

import Login from './Login/Login'

import Body from './Profile'
import LoginSuccess from './Login/Success'

import MyDocument from './Document/index'


import './App.scss'

if (!window.store) {
  window.store = new AppStore();
}



@observer
class App extends Component {
  state = {
    showSidebar: true
  };
  handleShowSidebarChange = () => {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }));
  };
  render() {
    return (
      <ThemeProvider theme={colors}>
        <Provider store={window.store}>
          <Router>
            {window.store.redirect ? <Redirect to={window.store.redirect} /> : null}
            {window.store.isLoggedIn ? <>
              {window.store.profile.status? <>  {/*  Logged in with plan */}

                <Header onShowSidebarChange={this.handleShowSidebarChange} />
                <div className="bg-blueGray-100 flex justify-between">
                  <div>
                    {this.state.showSidebar && <Sidebar />}
                  </div>
                  <div style={{width: this.state.showSidebar ? "calc(100vw - 257px)" :"100vw"}}>
                    <Switch>
                      <Route path="/login" exact>
                        <Redirect to="/" />
                      </Route>
                      <Route path="/" exact component={Dashboard} />
                      <Route path="/search" exact component={Search} />
                      <Route path="/ai/" >
                        <Switch>
                          <Route path="/ai/code/debugging" component={Chat} />
                          <Route component={Tool} />
                        </Switch>
                      </Route>
                      <Route path="/my-profile" component={Body} />
                      <Route path="/signup/failed" component={Body} />
                      <Route path="/signup/success" component={LoginSuccess} />
                      <Route path="/document" component={MyDocument} store={window.store} />
                    </Switch>
                  </div>
                </div>
              </> : <> {/* Logged in but no plan */}
                <Switch>
                  <Route path="/signup/success" component={LoginSuccess} />
                  <Route>
                    <Pricing />
                  </Route>
                </Switch>
              </>} </> : <> {/*  Not Logged In */}
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/login" />
                </Route>
                <Route path="/" component={Login} />
              </Switch>
            </>}
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App