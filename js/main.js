// API base URL
const baseURL = "https://counting-api.onrender.com";

// Buttons
let fullofflineDownload = document.getElementById("full-offline-download");
let offlineDownload = document.getElementById("offline-download");
let onlineDownload = document.getElementById("online-download");

offlineDownload.style.cursor = "pointer";
fullofflineDownload.style.cursor = "pointer";
onlineDownload.style.cursor = "pointer";

// API endpoints
let offlineIncrementURL = `${baseURL}/downloads/offline/increment`;
let onlineIncrementURL = `${baseURL}/downloads/online/increment`;

// Count URLs
let offlineCountURL = `${baseURL}/downloads/offline/count`;
let onlineCountURL = `${baseURL}/downloads/online/count`;

// URLs for downloads
let fullofflineURL = "https://www.mediafire.com/file/z2pz1dq1ywo5sb7/MuslimEncyclopedia.rar/file";
let offlineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/MuslimEncyclopedia.rar/file";
let onlineURL = "https://www.mediafire.com/file/d8pk428lzfalgxa/Muslim_Encyclopedia_Lite.exe/file";

// Default counters values
let fullofflineCount = 16; // Use default as API is unavailable
let offlineCount = 40;
let onlineCount = 41;

// Counters showers
let fullofflineCountShower = document.getElementById("fullofflineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");
let onlineCountShower = document.getElementById("onlineCountShower");

// Display the initial count for full offline download
fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;

// Fetch initial download counts using Axios GET requests
axios.get(offlineCountURL)
    .then((response) => {
        offlineCount = response.data.count;
        offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
    })
    .catch((error) => console.error("Error fetching offline download count:", error));

axios.get(onlineCountURL)
    .then((response) => {
        onlineCount = response.data.count;
        onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
    })
    .catch((error) => console.error("Error fetching online download count:", error));

// Handle download clicks

// Full offline download (without API increment)
fullofflineDownload.addEventListener("click", () => {
    fullofflineCount++;
    fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
    window.open(fullofflineURL);
});

// Offline download with API increment
offlineDownload.addEventListener("click", () => {
    axios.post(offlineIncrementURL, { type: "offline" })
        .then((response) => {
            offlineCount++;
            offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
            window.open(offlineURL);
        })
        .catch((error) => console.error("Error incrementing offline download count:", error));
});

// Online download with API increment
onlineDownload.addEventListener("click", () => {
    axios.post(onlineIncrementURL, { type: "online" })
        .then((response) => {
            onlineCount++;
            onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
            window.open(onlineURL);
        })
        .catch((error) => console.error("Error incrementing online download count:", error));
});
