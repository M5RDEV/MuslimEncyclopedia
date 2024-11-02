// API base URL
const baseURL = "https://counting-api.onrender.com";


// buttons
let fullofflineDownload = document.getElementById("full-offline-download");
let offlineDownload = document.getElementById("offline-download");
let onlineDownload = document.getElementById("online-download");


offlineDownload.style.cursor = "pointer";
fullofflineDownload.style.cursor = "pointer";
onlineDownload.style.cursor = "pointer";


// API endpoints
let fullofflineIncrementURL = `${baseURL}/downloads/fulloffline/increment`;
let offlineIncrementURL = `${baseURL}/downloads/offline/increment`;
let onlineIncrementURL = `${baseURL}/downloads/online/increment`;


// Count Url
let fullofflineCountURL = `${baseURL}/downloads/fulloffline/count`;
let offlineCountURL = `${baseURL}/downloads/offline/count`;
let onlineCountURL = `${baseURL}/downloads/online/count`;


// URLs for downloads
let fullofflineURL = "#";
let offlineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/MuslimEncyclopedia.rar/file";
let onlineURL = "https://www.mediafire.com/file/d8pk428lzfalgxa/Muslim_Encyclopedia_Lite.exe/file";


// Default counters values
let fullofflineCount = 15;
let offlineCount = 40;
let onlineCount = 41;


// Counters showers
let fullofflineCountShower = document.getElementById("fullofflineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");
let onlineCountShower = document.getElementById("onlineCountShower");


// Fetch initial download counts using Axios GET requests
// Check if fullofflineCountURL is available and update count if possible
axios.get(fullofflineCountURL)
    .then((response) => {
        fullofflineCount = response.data.count;
        fullofflineCountShower.innerHTML = `/n عدد التحميلات: ${fullofflineCount}`;
    })
    .catch((error) => {
        console.warn("Full offline download count endpoint not available. Using default count:", fullofflineCount);
        fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
    });

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



// Handle download click

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
