import React, { Component } from "react";

import { rotateImage, scaleImage, clearImage } from "../actions/appActions";

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.store = this.props.store;

    this.containerRefs = [];
    for (let i = 0; i < 10; i++) {
      this.containerRefs.push(React.createRef());
    }

    this.containerRef = React.createRef();
    this.state = {};

    this.scaleRange_changeHandler = this.scaleRange_changeHandler.bind(this);
    this.rotateRange_changeHandler = this.rotateRange_changeHandler.bind(this);
    this.clearButton_clickHandler = this.clearButton_clickHandler.bind(this);
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

  scaleRange_changeHandler(event) {
    let index = Number(event.target.id.substr(3));
    this.store.dispatch(scaleImage(index, event.target.value));
  }

  rotateRange_changeHandler(event) {
    let index = Number(event.target.id.substr(3));
    this.store.dispatch(rotateImage(index, event.target.value));
  }

  clearButton_clickHandler(event) {
    let index = Number(event.target.id.substr(3));
    this.store.dispatch(clearImage(index, event.target.value));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    if (this.state.addImagesSrc) {
      let indexes = [];
      for (let i = 0; i < this.state.addImagesSrc.length; i++) {
        let imageSrc = this.state.addImagesSrc[i];
        let addImageTransform = this.state.addImagesTransform[i];
        let imageTransform = this.state.imagesTransform[i];

        if (
          imageSrc &&
          imageSrc !== "" &&
          addImageTransform &&
          imageTransform
        ) {
          children.push(
            <div
              key={"ctl" + i}
              id={"ctl" + i}
              className="controlsContainer"
              ref={this.containerRefs[i]}
              style={{
                transform: `matrix(${addImageTransform})`,
                width: this.state.addImagesDefaultSize.width,
                height: this.state.addImagesDefaultSize.height,
              }}
            >
              <input
                type="range"
                id={"srn" + i}
                name={"srn" + i}
                min={this.state.minScale}
                max={this.state.maxScale}
                step="0.01"
                value={imageTransform.s}
                className="scaleRange"
                onChange={this.scaleRange_changeHandler}
              />
              <input
                type="range"
                id={"rrn" + i}
                name={"rrn" + i}
                min={this.state.minRotation}
                max={this.state.maxRotation}
                step="1"
                value={imageTransform.r}
                className="rotateRange"
                onChange={this.rotateRange_changeHandler}
              />

              <div id="hintScale" key="hintScale"></div>
              <div id="hintRotate" key="hintRotate"></div>

              {/* <div
                key={"ldb" + i}
                id={"ldb" + i}
                className="clearImageButton"
                onClick={this.clearButton_clickHandler}
              ></div> */}
            </div>
          );
        }
      }

      // if (this.state.showHelp) {
      //   switch (this.state.currentHelp) {
      //     case "help1":
      //     {
      //       children.push(
      //         <img
      //         id="help"
      //         key="help"
      //         src={this.state.help1ImageSrc}
      //         />
      //       );
      //       break;
      //     }
      //     case "help2":
      //     {
      //       children.push(
      //         <img
      //         id="help"
      //         key="help"
      //         src={this.state.help2ImageSrc}
      //         />
      //       );
      //       break;
      //     }
      //     default:

      //   }
      // }
    }

    return React.createElement(
      "div",
      { id: "Controls", style: this.props.style, ref: this.containerRef },
      children
    );
  }
}

export default Controls;
