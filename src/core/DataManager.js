import { Component } from 'react';

import { setStorageData, storageDataSaved } from '../actions/appActions';

// import LocalStorageManager from './LocalStorageManager';

class DataManager extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      isLoading:false,
      isLoaded:false,
    }
    this.loader=null;
    this.result=null;

  }

/* ++++ React methods ++++ */

  componentDidMount() {
    this.unsubscribe=this.store.subscribe(()=>{this.onStoreChange()});
    // this.load();
    this.mounted=true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted=false;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  onStoreChange() {
    if (this.mounted) {
      let state=this.store.getState();
      // this.setState(state);
      if (state.reloadData) {
        // console.log("DataManager reloadData");
        // this.load()
      } else
      if (state.saveStorageData) {
        // console.log("DataManager saveStorageData");
        this.saveStorageData();
      }
    }
  }

  loadStorageData()
  {
    let data=this.localStorageManager.load();
    this.store.dispatch(
      setStorageData(data)
    );
  }

  saveStorageData()
  {
    // let state=this.store.getState();
    this.localStorageManager.save({
    });

    this.store.dispatch(
      storageDataSaved()
    );
  }

  render () {
    return null;
  }

}
export default DataManager;
