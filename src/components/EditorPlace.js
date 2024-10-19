import React, { Component } from "react";
import Editor from "./Editor.js";
import Controls from "./Controls.js";

import {
  saveImages,
  setStoreData,
  clearHelp,
  useImage,
} from "../actions/appActions";

class EditorPlace extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.ref = React.createRef();
    this.containerRef = React.createRef();
    this.editorRef = React.createRef();

    this.state = {
      editorScale: 0.15,
      editorX: 0,
      editorY: 0,
    };

    this.loadButton_clickHandler = this.loadButton_clickHandler.bind(this);

    this.publishSaveButton_clickHandler =
      this.publishSaveButton_clickHandler.bind(this);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateBounds(
      this.ref.current.clientWidth,
      this.ref.current.clientHeight
    );
  }

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
    }
  }

  updateBounds(width, height) {
    if (this.lastWidth !== width || this.lastHeight !== height) {
      if (this.state.editorBounds) {
        this.lastWidth = width;
        this.lastHeight = height;
        let bounds = this.state.editorBounds;
        let editorScale = Math.min(
          width / bounds.width,
          height / bounds.height
        );
        let editorX = (width - bounds.width * editorScale) / 2 / editorScale;
        let editorY = (height - bounds.height * editorScale) / 2 / editorScale;
        this.setState({
          ...this.state,
          editorScale,
          editorX,
          editorY,
        });
      }
    }
  }

  publish(target) {
    this.store.dispatch(setStoreData({ publishable: false }));
    setTimeout(() => {
      this.store.dispatch(setStoreData({ publishable: true }));
    }, this.state.republishInterval);
    this.store.dispatch(saveImages(target));
  }

  loadButton_clickHandler(event) {
    let index = Number(event.target.id.substr(3));
    let file = event.target.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = ((theIndex, store) => {
        return (e) => {
          this.store.dispatch(useImage(index, e.target.result));
        };
      })(index, this.store);
      reader.readAsDataURL(file);
    }
  }

  publishSaveButton_clickHandler(event) {
    this.publish("save");
  }

  mouseDownHandler() {
    this.store.dispatch(clearHelp());
  }

  render() {
    let children = [];
    children.push(this.props.children);

    let loadedImageCount = 0;
    if (this.state.addImagesSrc) {
      for (let i = 0; i < this.state.addImagesSrc.length; i++) {
        if (this.state.addImagesSrc[i] && this.state.addImagesSrc[i] != "") {
          loadedImageCount++;
        }
      }
    }

    children.push(
      <div
        id="EditorContainer"
        key="EditorContainer"
        ref={this.containerRef}
        style={{
          width: this.state.editorBounds ? this.state.editorBounds.width : 0,
          height: this.state.editorBounds ? this.state.editorBounds.height : 0,
          transform: `scale(${this.state.editorScale}) translateX(${this.state.editorX}px) translateY(${this.state.editorY}px)`,
        }}
      >
        <img id="BackImage" key="BackImage" src={this.state.backImageSrc} />
        <Editor
          id="Editor"
          key="Editor"
          scale={this.state.editorScale}
          store={this.props.store}
          ref={this.editorRef}
          style={{
            width: this.state.editorBounds ? this.state.editorBounds.width : 0,
            height: this.state.editorBounds
              ? this.state.editorBounds.height
              : 0,
          }}
        />
        <img
          id="MainImage"
          key="MainImage"
          src={this.state.mainImageSrc}
          style={{
            opacity: this.state.editable ? 0.9 : 1,
          }}
        />
        <Controls
          id="Controls"
          key="Controls"
          scale={this.state.editorScale}
          store={this.props.store}
          ref={this.editorRef}
          style={{
            display: this.state.editable ? "block" : "none",
            width: this.state.editorBounds ? this.state.editorBounds.width : 0,
            height: this.state.editorBounds
              ? this.state.editorBounds.height
              : 0,
          }}
        />
      </div>
    );

    let imageSrc = this.state.addImagesSrc ? this.state.addImagesSrc[0] : null;
    let addImageTransform = this.state.addImagesTransform
      ? this.state.addImagesTransform[0]
      : null;
    let imageTransform = this.state.imagesTransform
      ? this.state.imagesTransform[0]
      : null;

    children.push(
      <div
        id="buttonContainer"
        key="bditorContainer"
        style={{
          width: this.state.editorBounds ? this.state.editorBounds.width : 0,
          height: this.state.editorBounds ? this.state.editorBounds.height : 0,
          transform: `scale(${this.state.editorScale}) translateX(${this.state.editorX}px) translateY(${this.state.editorY}px)`,
        }}
      >
        <div id="loadButton" key="loadButton" className="loadButton">
          <input
            id="inp0"
            type="file"
            onChange={this.loadButton_clickHandler}
            className="loadInput"
          />
          {imageSrc && imageSrc !== "" ? "Заменить фото" : "Выбрать фото"}
        </div>

        <div
          id="saveButton"
          key="saveButton"
          className={
            "publishButton" +
            (this.state.publishable &&
            this.state.editable &&
            imageSrc &&
            imageSrc !== "" &&
            addImageTransform &&
            imageTransform
              ? " active"
              : " inactive")
          }
          onClick={this.publishSaveButton_clickHandler}
        >
          <img src={this.state.saveIconSrc} width="60" height="60" />
        </div>
      </div>
    );

    return React.createElement(
      "div",
      {
        id: "EditorPlace",
        style: this.props.style,
        ref: this.ref,
        onMouseDown: this.mouseDownHandler,
      },
      children
    );
  }
}

export default EditorPlace;
