import { isMobile, isLocal } from "../core/helpers";

const settings = {
  assetsUrl: ".",
  localStoreName: "appState_221024",

  isMobile: isMobile(),
  isLocal: isLocal(),

  editorBounds: {
    width: 0,
    height: 0,
  },

  addImagesDefaultSize: {
    width: 500,
    height: 500,
  },

  addImagesRealSize: {
    width: 500,
    height: 500,
  },

  addImagesScale: 1,

  maskMargins: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  addImagesDefaultScale: 0.5,

  mainImageSrc: "",
  addImagesSrc: [""],
  addImagesTransform: [["1", "0", "0", "1", "0", "0"]],

  resultImagesSrc: [""],

  mainImageSrc: {},
  backImageSrc: {},

  help1ImageSrc: "",
  help2ImageSrc: "",

  currentHelp: "help1",
  showHelp: true,

  minScale: 1,
  maxScale: 20,

  minRotation: 0,
  maxRotation: 360,

  imagesTransform: [{ s: 1, r: 0 }],

  editable: true,
  publishable: true,

  republishInterval: 5000,
  theme: "dark",
  showOpacity: false,

  mimeType: "image/png",
};

export default settings;
