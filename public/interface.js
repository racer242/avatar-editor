var currentFrame=0;
var frames=[];
var appInstance=null;

function onEditorAppReadyHandler(app) {

  appInstance=app;

  app.setData(
    {
      editorBounds:{
        width:1140,
        height:700,
      },

      addImagesDefaultSize:{
        width:450,
        height:450,
      },

      addImagesDefaultScale:0.5,

      minScale:0.5,
      maxScale:10,

      minRotation:0,
      maxRotation:360,

      mainImageSrc:"image.png",
      backImageSrc:"back_image.jpg",

      help1ImageSrc:"help1.svg",
      help2ImageSrc:"help2.svg",

      fbIconSrc:"fb.png",
      vkIconSrc:"vk.png",
      saveIconSrc:"save.png",

      addImagesSrc:[""],

      resultImagesSrc:[""],

      addImagesTransform:[
        ["1","0","0","1","340","169"],
        // ["0.5","0","0","0.5","115","-55"],
      ],

      editable:true,
      mimeType:"image/png",
      // mimeType:"image/jpeg",
    }
  );

}

function onEditorAppImageHandler(app) {
  var data=app.getData()
  var loadedImageCount=0
  for (var i = 0; i < data.addImagesSrc.length; i++) {
    if ((data.addImagesSrc[i])&&(data.addImagesSrc[i]!="")) {
      loadedImageCount++;
    }
  }
  console.log("onEditorAppImageHandler Loaded:",loadedImageCount);
}

function getVkUrl(purl,ptitle,pimg) {
  var url  = 'http://vk.com/share.php?';
  if (purl) {
      url += 'url=' + encodeURIComponent(purl);
  }
  if (ptitle) {
      url += '&title=' + encodeURIComponent(ptitle);
  }
  if (pimg) {
      url += '&image=' + encodeURIComponent(pimg);
  }
  url += '&noparse=true';

  return url;
};

function addUniqueToUrl(url) {
  if (url) {
    var uStr=new Date().getTime();
    if (url.indexOf("?")<0) {
      url = url+"?u="+uStr;
    } else {
      url = url+"&u="+uStr;
    }
  }
  return url;
}

function downloadLink(link) {
  link=addUniqueToUrl(link);

  let a = document.createElement('a');
  a.href = link;

  link = link.substr(link.lastIndexOf('/') + 1);
  if (link.indexOf('?')>=0) {
    link = link.substr(0,link.indexOf('?'));
  }

  a.download = link;
  a.click();
}


function onEditorAppImagesHandler(app,images,target) {
  console.log("onEditorAppImagesHandler");

  var data=app.getData();

  if ((target=="fb")||(target=="vk")) {
    var windowReference = window.open();
  }

  var xhr = new XMLHttpRequest();

  var url = "save_image.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      var publishUrl=window.location.href;
      if (publishUrl.slice(-1)!="/") publishUrl+="/";
      publishUrl+=json.url;
      var encodedUrl=escape(publishUrl);
      if (target=="fb") {
        windowReference.location = "https://www.facebook.com/sharer/sharer.php?u="+encodedUrl;
      } else
      if (target=="vk") {
        windowReference.location = getVkUrl(publishUrl,"Галерея",publishUrl);
      } else
      if (target=="ready") {
        readyHandler(publishUrl);
      } else
      if (target=="save") {
        downloadLink(publishUrl);
      }
    }
  };
  var data = JSON.stringify(
    {
      image:images[0],
      x:340,
      y:169,
      width:450,
      height:450,
      scale:1,
    }
  );
  xhr.send(data);
}

function readyHandler(url) {
  console.log("СОБЫТИЕ ОТ КНОПКИ ГОТОВО. ССЫЛКА НА КАРТИНКУ:",url);
}
