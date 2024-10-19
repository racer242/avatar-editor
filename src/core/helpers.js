import MobileDetect from 'mobile-detect'
import path from "path"

export const callLater = (callback,delay = 100) => {
  return setTimeout(callback,delay);
}

export const isMobile = () => {
  var mobileDetect = new MobileDetect(window.navigator.userAgent);
  return mobileDetect.mobile();
}

export const isLocal = () => {
  return !(/^h/.test(document.location.toString()));
}

export const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

export const correctUrl = (url,assetsUrl) => {

  if (url) {
    if (url.substr(0,1)==="/") {
      if (!assetsUrl) {
        assetsUrl=".";
      }
      url=path.join(assetsUrl,url);
    }
  }

  return url;

}

export const openLink = (link) => {
  // let url=correctUrl(link)
  // console.log("??",url);
  window.open(link,"_blank")
}
