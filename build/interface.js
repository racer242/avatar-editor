var currentFrame = 0;
var frames = [];
var appInstance = null;

function onEditorAppReadyHandler(app) {
  appInstance = app;

  app.setData({
    editorBounds: {
      width: 320,
      height: 480,
    },

    addImagesDefaultSize: {
      width: 190,
      height: 190,
    },

    addImagesRealSize: {
      width: 1024,
      height: 1024,
    },

    addImagesScale: 190 / 1024,

    maskMargins: {
      left: 20 * (1024 / 190),
      right: 12 * (1024 / 190),
      bottom: 15 * (1024 / 190),
      top: 17 * (1024 / 190),
    },

    minScale: 1,
    maxScale: 10,

    imagesTransform: [{ s: 1, r: 0 }],

    minRotation: 0,
    maxRotation: 360,

    mainImageSrc: { dark: "black.png", light: "white.png" },
    backImageSrc: { dark: "black.png", light: "white.png" },

    help1ImageSrc: "help1.svg",
    help2ImageSrc: "help2.svg",

    saveIconSrc: "save.png",

    addImagesSrc: [""],

    resultImagesSrc: [""],

    addImagesTransform: [["1", "0", "0", "1", "0", "0"]],

    editable: true,
    mimeType: "image/png",

    theme: "dark",
  });
}

function onEditorAppImageHandler(app) {
  var data = app.getData();
  var loadedImageCount = 0;
  for (var i = 0; i < data.addImagesSrc.length; i++) {
    if (data.addImagesSrc[i] && data.addImagesSrc[i] != "") {
      loadedImageCount++;
    }
  }
  console.log("onEditorAppImageHandler Loaded:", loadedImageCount);
}

function addUniqueToUrl(url) {
  if (url) {
    var uStr = new Date().getTime();
    if (url.indexOf("?") < 0) {
      url = url + "?u=" + uStr;
    } else {
      url = url + "&u=" + uStr;
    }
  }
  return url;
}

function downloadLink(link) {
  link = addUniqueToUrl(link);

  let a = document.createElement("a");
  a.href = link;

  link = link.substr(link.lastIndexOf("/") + 1);
  if (link.indexOf("?") >= 0) {
    link = link.substr(0, link.indexOf("?"));
  }

  a.download = link;
  a.click();
}

function onEditorAppImagesHandler(app, images, target) {
  console.log("onEditorAppImagesHandler");

  var data = app.getData();

  var xhr = new XMLHttpRequest();

  var url = "save_image.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      var publishUrl = window.location.href;
      if (publishUrl.slice(-1) != "/") publishUrl += "/";
      publishUrl += json.url;
      downloadLink(publishUrl);
    }
  };
  var data = JSON.stringify({
    image: images[0],
    x: 340,
    y: 169,
    width: 450,
    height: 450,
    scale: 1,
  });
  xhr.send(data);
}
