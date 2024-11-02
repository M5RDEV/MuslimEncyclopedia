// buttons
let onlineDownload = document.getElementById("online-download");
let fullofflineDownload = document.getElementById("full-offline-download");
let offlineDownload = document.getElementById("offline-download");

onlineDownload.style.cursor = "hand";
offlineDownload.style.cursor = "hand";
fullofflineDownload.style.cursor = "hand";

// API base URL
const baseURL = "https://counting-api.onrender.com";

// API endpoints
let onlineIncrementURL = `${baseURL}/downloads/online/increment`;
let offlineIncrementURL = `${baseURL}/downloads/offline/increment`;
let fullofflineIncrementURL = `${baseURL}/downloads/fulloffline/increment`;
let onlineCountURL = `${baseURL}/downloads/online/count`;
let offlineCountURL = `${baseURL}/downloads/offline/count`;
let fullofflineCountURL = `${baseURL}/downloads/fulloffline/count`;

// URLs for downloads
let offlineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/MuslimEncyclopedia.rar/file";
let fullofflineURL = "https://www.mediafire.com/file/z2pz1dq1ywo5sb7/MuslimEncyclopedia.rar/file";
let onlineURL = "https://www.mediafire.com/file/d8pk428lzfalgxa/Muslim_Encyclopedia_Lite.exe/file";

// Default counters values
let onlineCount = 41;
let offlineCount = 40;
let fullofflineCount = 15;

// Counters showers
let onlineCountShower = document.getElementById("onlineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");
let fullofflineCountShower = document.getElementById("fullofflineCountShower");

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

// Check if fullofflineCountURL is available and update count if possible
axios.get(fullofflineCountURL)
    .then((response) => {
        fullofflineCount = response.data.count;
        fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
    })
    .catch((error) => {
        console.warn("Full offline download count endpoint not available. Using default count:", fullofflineCount);
        fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
    });

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

// Handle full offline download click
fullofflineDownload.addEventListener("click", () => {
    axios.post(fullofflineIncrementURL, { type: "fulloffline" })
        .then((response) => {
            fullofflineCount++;
            fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
            window.open(fullofflineURL);
        })
        .catch((error) => console.error("Error incrementing full offline download count:", error));
});
