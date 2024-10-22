import React, { Component } from "react";

import EditorPlace from "../components/EditorPlace.js";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = this.props.store;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState(state);
    }
  }

  render() {
    let children = [];
    children.push(this.props.children);

    children.push(
      <EditorPlace
        store={this.store}
        key="EditorPlace"
        style={{
          right: this.state.sideMenu ? this.state.sideMenu.width : 0,
          top: this.state.topMenu ? this.state.topMenu.height : 0,
        }}
      />
    );

    return React.createElement("div", { id: "Container" }, children);
  }
}

export default Container;
