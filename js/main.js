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
let offlineURL = "https://download2274.mediafire.com/htwjtnnmjcigH5O-E_jQ-rhDCK5Ml6T3OgZ3A6Rb4Ymn058EaATDauiLEXM-SMgJ_g12Q7ZVmcRoZea1w8aHdQkw_sl6rfo0P_P4gUYaLkVpLeVdx6EegMdEwSgPVtySW8ndCV8xO2dhqiA4aEQYjBvnOtsIgBKXY7P5RjeislzaBr0/orhjvbyzbpb3sap/Muslim+Encolopedia.rar";
let onlineURL = "https://download1320.mediafire.com/1cp55iga5jqgETbl24gGVyP_HKWN5M-3IrgnhPOfmm3P-dxhnfVzsX0kzP2wr3RDTR4obu7KPSOqDCA8fOBowmX5_waXJ-H4Nx63bLndT7PZp8gKgiBrPTLFwMoDH2Km2i4hEaXWnZnsc5-EXkSx3hkePOWVgELcBBiY2MRXLeIBvYI/d8pk428lzfalgxa/Muslim+Encolopedia+Lite.exe";

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



