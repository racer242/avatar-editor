import React, { Component } from "react";
import AvatarEditor from "../improve/react-avatar-editor";

import { updateImage, useImage, imagesSaved } from "../actions/appActions";

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.store = this.props.store;

    this.targetRefs = [];
    this.containerRefs = [];
    for (let i = 0; i < 1; i++) {
      this.targetRefs.push(React.createRef());
      this.containerRefs.push(React.createRef());
    }

    this.containerRef = React.createRef();
    this.state = {};
    this.loadButton_clickHandler = this.loadButton_clickHandler.bind(this);
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

      if (state.saveImages) {
        let images = [];
        for (let i = 0; i < this.targetRefs.length; i++) {
          let targetRef = this.targetRefs[i];
          if (targetRef.current) {
            images.push(
              targetRef.current
                .getImageScaledToCanvas()
                .toDataURL(this.state.mimeType)
            );
          } else {
            images.push(null);
          }
        }
        this.store.dispatch(imagesSaved(images));
      }
    }
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
              key={"cnt" + i}
              id={"cnt" + i}
              className="editorImageContainer"
              ref={this.containerRefs[i]}
              style={{
                transform: `matrix(${addImageTransform})`,
                width: this.state.addImagesRealSize.width,
                height: this.state.addImagesRealSize.height,
                pointerEvents:
                  this.state.editable && this.state.publishable
                    ? "all"
                    : "none",
              }}
            >
              <div
                key="EditorCircleMask"
                className="editorCircleMask"
                style={this.state.maskMargins}
              >
                <AvatarEditor
                  ref={this.targetRefs[i]}
                  image={imageSrc}
                  containerref={this.containerRefs[i]}
                  width={
                    this.state.addImagesRealSize.width -
                    this.state.maskMargins.left -
                    this.state.maskMargins.right
                  }
                  height={
                    this.state.addImagesRealSize.height -
                    this.state.maskMargins.bottom -
                    this.state.maskMargins.top
                  }
                  border={0}
                  scale={imageTransform.s}
                  rotate={imageTransform.r}
                />
              </div>
            </div>
          );
        } else {
          children.push(
            <div
              id={"lBt" + i}
              key={"lBt" + i}
              className="loadButton"
              style={{
                transform: `matrix(${addImageTransform})`,
                width: this.state.addImagesRealSize.width,
                height: this.state.addImagesRealSize.height,
                pointerEvents: this.state.editable ? "all" : "none",
              }}
            >
              <input
                id={"inp" + i}
                type="file"
                onChange={this.loadButton_clickHandler}
                className="loadInput"
              />
            </div>
          );
        }
      }
    }

    return React.createElement(
      "div",
      { id: "Editor", style: this.props.style, ref: this.containerRef },
      children
    );
  }
}

export default Editor;
