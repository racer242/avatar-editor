import React, { Component } from 'react';

import mainReducer from './reducers/mainReducer'
import Container from './core/Container';

import DataManager from './core/DataManager';
import Control from './core/Control';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { appInit, setStoreData, saveImages } from './actions/appActions';

import settings from './configuration/Settings';

import './css/app.css';

const Store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.initHandler=this.initHandler.bind(this);
    this.resizeHandler=this.resizeHandler.bind(this);
  }

  updateLayout() {
    let windowInnerWidth=document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    let windowInnerHeight=document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

    this.setState({
      ...this.state,
      windowWidth:windowInnerWidth,
      windowHeight:windowInnerHeight,
    });

  }

  initHandler(event) {
    this.updateLayout();
  }

  resizeHandler(event) {
    this.updateLayout();
  }

  setData(data) {
    Store.dispatch(
      setStoreData(data)
    );
  }

  getData(data) {
    return Store.getState();
  }

  saveImages() {
    Store.dispatch(
      saveImages()
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentDidMount() {
    Store.dispatch(
      appInit(settings)
    );

    window.addEventListener("load",this.initHandler);
    window.addEventListener("resize",this.resizeHandler);

    // window.editorApp=this;
    // if (window.onEditorAppReady) {
    //   window.onEditorAppReady(this);
    // }

    this.props.onInit(this);

  }

  render() {
    return (
      <Provider store={Store}>
        <Container
          id="Container"
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          store={Store}
        >
          <DataManager
            store={Store}
          />
          <Control
            app={this}
            store={Store}
          />
        </Container>
      </Provider>
    );
  }

}

export default App;
