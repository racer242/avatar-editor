let mainReducerController = (state = {}, action) => {
  // console.log("mainReducer",action);

  switch (action.type) {
    case "CLEAR_HELP": {
      let showHelp = state.showHelp;

      if (state.currentHelp == "help2") {
        showHelp = false;
      }

      return {
        ...state,
        currentHelp: "",
        showHelp,
      };
    }

    case "USE_IMAGE": {
      let addImagesSrc = state.addImagesSrc.concat();
      addImagesSrc[action.index] = action.src;

      let imagesTransform = state.imagesTransform.concat();
      // imagesTransform[action.index].s=2;

      return {
        ...state,
        addImagesSrc,
        imagesTransform,
        imageChanged: true,
        currentHelp: "help2",
      };
    }

    case "ROTATE_IMAGE": {
      let imagesTransform = state.imagesTransform.concat();
      imagesTransform[action.index].r = action.rotation;
      return {
        ...state,
        imagesTransform,
      };
    }

    case "SCALE_IMAGE": {
      let imagesTransform = state.imagesTransform.concat();
      imagesTransform[action.index].s = action.scale;
      return {
        ...state,
        imagesTransform,
      };
    }

    case "CLEAR_IMAGE": {
      let addImagesSrc = state.addImagesSrc.concat();
      addImagesSrc[action.index] = null;
      return {
        ...state,
        addImagesSrc,
        imageChanged: true,
      };
    }

    case "SAVE_IMAGES": {
      return {
        ...state,
        saveImages: true,
        target: action.target,
      };
    }

    case "IMAGES_SAVED": {
      return {
        ...state,
        resultImagesSrc: action.images,
        saveImages: false,
        imagesSaved: true,
      };
    }

    case "APP_INIT": {
      return {
        ...state,
        ...action.data,
      };
    }

    case "SET_STORE_DATA": {
      return {
        ...state,
        ...action.data,
        loaded: true,
      };
    }

    case "CLEAR_ACTION": {
      return {
        ...state,
        action: null,
        imageChanged: false,
        imagesSaved: false,
      };
    }

    case "RESET_ACTION": {
      console.log("?????", state.imagesTransform);

      let imagesTransform = [{ s: 1, r: 0 }];
      return {
        ...state,
        imagesTransform,
      };
    }

    default:
      return state;
  }
};

const mainReducer = (state = {}, action) => {
  if (action.extraAction) {
    state = mainReducer(state, action.extraAction);
  }

  state = mainReducerController(state, action);

  return state;
};

export default mainReducer;
