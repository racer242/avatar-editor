export const clearHelp = () => {
  return {
    type: "CLEAR_HELP",
  };
};

export const useImage = (index, src) => {
  return {
    type: "USE_IMAGE",
    index,
    src,
  };
};

export const clearImage = (index) => {
  return {
    type: "CLEAR_IMAGE",
    index,
  };
};

export const rotateImage = (index, rotation) => {
  return {
    type: "ROTATE_IMAGE",
    index,
    rotation,
  };
};

export const scaleImage = (index, scale) => {
  return {
    type: "SCALE_IMAGE",
    index,
    scale,
  };
};

export const clearAction = () => {
  return {
    type: "CLEAR_ACTION",
  };
};

export const resetAction = () => {
  return {
    type: "RESET_ACTION",
  };
};

export const saveImages = (target) => {
  return {
    type: "SAVE_IMAGES",
    target: target,
  };
};

export const imagesSaved = (images) => {
  return {
    type: "IMAGES_SAVED",
    images,
  };
};

export const appInit = (data) => {
  return {
    type: "APP_INIT",
    data: {
      ...data,
    },
  };
};

export const setStoreData = (data) => {
  return {
    type: "SET_STORE_DATA",
    data: {
      ...data,
    },
  };
};

export const loadStoreDataError = (data) => {
  return {
    type: "LOAD_STORE_DATA_ERROR",
    data: {
      ...data,
      dataLoaded: false,
      reloadData: false,
      loadDataError: true,
    },
  };
};

export const reloadStoreData = () => {
  return {
    type: "RELOAD_STORE_DATA",
    data: {
      dataLoaded: false,
      reloadData: true,
      loadDataError: false,
    },
  };
};

export const waitingForReloadStoreData = () => {
  return {
    type: "WAITING_FOR_RELOAD_STORE_DATA",
    data: {
      dataLoaded: false,
    },
  };
};

export const setAppData = (data) => {
  return {
    type: "SET_APP_DATA",
    data,
  };
};

export const setStorageData = (data) => {
  return {
    type: "SET_STORAGE_DATA",
    data,
  };
};

export const saveStorageData = () => {
  return {
    type: "SAVE_STORAGE_DATA",
    data: {
      saveStorageData: true,
      dataForStorageChanged: null,
    },
  };
};

export const storageDataSaved = () => {
  return {
    type: "STORAGE_DATA_SAVED",
    data: {
      saveStorageData: false,
    },
  };
};

export const opacityOnAction = () => {
  return {
    type: "OPACITY_ON_ACTION",
  };
};

export const opacityOffAction = () => {
  return {
    type: "OPACITY_OFF_ACTION",
  };
};
