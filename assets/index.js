let video = document.querySelector(".video");
let create = document.querySelector(".create");

const KEY_API = "AIzaSyCDxIoCLCi8IVHD420gFP1ogq1KMdwB41U";
const HREF_API_CHANNEL = "https://www.googleapis.com/youtube/v3/channels";

function clickButon(e) {
  let valueInput = document.querySelector(".valueInput");
  let id = getChannelId(valueInput.value);

  let result = JSON.parse(
    httpGet(
      `${HREF_API_CHANNEL}?part=
    contentDetails,
    contentOwnerDetails,
    id,
    localizations,
    snippet,
    statistics,
    status,
    topicDetails&id=${id}&key=` + KEY_API
    )
  );
  view(result);
  console.clear();
  console.log("Code By Trung ");
}

function view(result) {
  if (!result["items"]) {
    window.alert(
      "Xin lỗi , Mik không tìm thấy API của channel bạn \n Vui lòng nhập đúng format \n https://www.youtube.com/channel/_id của bạn_ \n Thanks !"
    );
    setTimeout(() => console.clear(), 1000);
  }
  document.querySelector(".sub").textContent =
    result["items"][0]["statistics"]["subscriberCount"];
  document.querySelector(".view").textContent =
    result["items"][0]["statistics"]["viewCount"];
  document.querySelector(".video").textContent =
    result["items"][0]["statistics"]["videoCount"];
  document.querySelector(".create").textContent =
    result["items"][0]["snippet"]["publishedAt"];
  document
    .querySelector(".img>img")
    .setAttribute(
      "src",
      result["items"][0]["snippet"]["thumbnails"]["high"].url
    );
  document.title = result["items"][0]["snippet"]["title"];
  document.body.style.background =
    "url('https://photo7n.gracg.com/323253_1_7b9cb4cefb400d54ff65cb519c5ddb10.jpg?imageMogr2/auto-orient/thumbnail/1200x/blur/1x0/quality/98')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPositionY = "center";

  document.querySelector('head').insertAdjacentHTML('beforeend' , `<link rel="shortcut icon" href="${result["items"][0]["snippet"]["thumbnails"]["high"].url}" type="image/x-icon">`)
}

function httpGet(url) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function getChannelId(url) {
  const stringStart = "https://www.youtube.com/channel/";
  if (url.startsWith(stringStart)) {
    let id = url.substr(stringStart.length, url.length);
    return id;
  } else {
    window.alert(
      "Vui lòng nhập đúng format \n https://www.youtube.com/channel/_id của bạn_"
    );
  }
}
