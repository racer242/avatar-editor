function onEditorAppReadyHandler(app) {
  app.setData({
    // Настройки положения редактора:
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

    // Настройки слайдеров
    minScale: 1,
    maxScale: 10,
    imagesTransform: [{ s: 1, r: 0 }],
    minRotation: 0,
    maxRotation: 360,

    // Настройки картинок
    mainImageSrc: { dark: "black.png", light: "white.png" },
    theme: "dark",
  });
}

// Служебная функция - делает уникальный URL
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

// Служебная функция - стартует скачивание
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

// Обработчик события загрузки картинки.
// Здесь можно сохранить аватар на диск или на сервер
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

// Обработчик события сохранения.
// Здесь можно сохранить аватар на диск или на сервер
function onEditorAppImagesHandler(app, images, target) {
  console.log("onEditorAppImagesHandler");

  var data = app.getData();
  photoCanvas = images[0];
  var photoContext = photoCanvas.getContext("2d");
  clearCircle(851 / 2, 851 / 2, 851 / 2);

  //Обрезать круг аватара
  function clearCircle(x, y, radius) {
    photoContext.save();
    photoContext.globalCompositeOperation = "destination-in";
    photoContext.beginPath();
    photoContext.arc(x, y, radius, 0, 2 * Math.PI, false);
    photoContext.fill();
    photoContext.restore();
  }

  var avatarCanvas = document.createElement("canvas");
  var avatarContext = avatarCanvas.getContext("2d");
  avatarCanvas.width = 1024;
  avatarCanvas.height = 1024;

  avatarContext.drawImage(
    photoCanvas,
    data.maskMargins.left,
    data.maskMargins.top
  );

  //Наложить на аватар оверлей
  overlayAvatar();
  function overlayAvatar() {
    overlayimage = new Image();
    overlayimage.src = data.theme === "dark" ? "black.png" : "white.png";
    overlayimage.onload = function () {
      avatarContext.drawImage(overlayimage, 0, 0);
      saveAvatar();
      // uploadAvatar();
    };
  }

  //Сохранить аватар на диск
  function saveAvatar() {
    var image = avatarCanvas.toDataURL();
    var aDownloadLink = document.createElement("a");
    aDownloadLink.download = "avatar.png";
    aDownloadLink.href = image;
    aDownloadLink.click();
  }

  //Сохранить загрузить аватар на сервер
  function uploadAvatar() {
    var image = avatarCanvas.toDataURL();
    var data = JSON.stringify({
      image: image,
    });
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
    xhr.send(data);
  }
}
