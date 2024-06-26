// buttons
let onlineDownload = document.getElementById("online-download");
let offlineDownload = document.getElementById("offline-download");

onlineDownload.style.cursor = "pointer";
offlineDownload.style.cursor = "pointer";

// API base URL
const baseURL = "https://counting-api.onrender.com";

// API endpoints
let onlineIncrementURL = `${baseURL}/downloads/online/increment`;
let offlineIncrementURL = `${baseURL}/downloads/offline/increment`;
let onlineCountURL = `${baseURL}/downloads/online/count`;
let offlineCountURL = `${baseURL}/downloads/offline/count`;

// URLs for downloads
let offlineURL = "https://download2271.mediafire.com/r01nurbmvhdgYUriI0vRqjAWCL-J0U9QiQgB0rcWao09Ex_60b_vIc6rWiQoeoTYl7Ogc6fkUTpQySW-YG-6eXSq-sZLwdHk7YSU_kNfKYVNHj02jL9WbUYAdI1iTOgRTwB8ejQLHD6Zs-rPDtZ7YCR6gcEWNxPWosWOTbOkmgAPq5g/orhjvbyzbpb3sap/Muslim+Encolopedia.rar";
let onlineURL = "https://download1323.mediafire.com/seubp20s9osgzmWfSz9SZiGjENPIL-D9XuG9oC3nosymiQKR2tfAje4_d99UqQdl5r7uIVo6dbgQoBu3k9vM53kfA9xU44oeW9qyQA4W_J8Ve2AKASRKkj3kx5BHi-q4yyRZwNgNahmngQCJwpemMdNU4v8OdyrbA-uindqh0lIb3w/d8pk428lzfalgxa/Muslim+Encolopedia+Lite.exe";

// Default counters values
let onlineCount = 41;
let offlineCount = 40;

// Counters showers
let onlineCountShower = document.getElementById("onlineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");



// Fetch initial download counts using Axios GET requests
axios.get(onlineCountURL)
  .then((response) => {
    onlineCount = response.data.count;
    onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
  })
  .catch((error) => console.error("Error fetching online download count:", error));

axios.get(offlineCountURL)
  .then((response) => {
    offlineCount = response.data.count;
    offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
  })
  .catch((error) => console.error("Error fetching offline download count:", error));

// Handle online download click
onlineDownload.addEventListener("click", () => {
  axios.post(onlineIncrementURL, { type: "online" })
    .then((response) => {
      onlineCount++;
      onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
      window.open(onlineURL);
    })
    .catch((error) => console.error("Error incrementing online download count:", error));
});

// Handle offline download click
offlineDownload.addEventListener("click", () => {
  axios.post(offlineIncrementURL, { type: "offline" })
    .then((response) => {
      offlineCount++;
      offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
      window.open(offlineURL);
    })
    .catch((error) => console.error("Error incrementing offline download count:", error));
});



