class LocalStorageManager {

  constructor(props) {
    this.name=props.name;
  }

  set(name,value) {
    // console.log("Set local storage variable: ",name,"to",value);
    window.localStorage.setItem(name,value);
    return true;
  }

  clear() {
    // console.log("Clear data in local storage.");
    window.localStorage.clear();
    return true;
  }

  load() {
    // console.log("Load data from local storage.");
    let dataJson = window.localStorage.getItem(this.name);
    dataJson=JSON.parse(dataJson);
    return dataJson;
  }

  save(data) {
    // console.log("Save data from local storage.");

    data=JSON.stringify(data);

    window.localStorage.setItem(this.name,data);
    return true;
  }


}
export default LocalStorageManager;
