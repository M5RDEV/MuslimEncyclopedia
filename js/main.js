// API base URL
const baseURL = "https://counting-api.onrender.com";

// Buttons
let fullofflineDownload = document.getElementById("full-offline-download");
let offlineDownload = document.getElementById("offline-download");
let onlineDownload = document.getElementById("online-download");
let muslimWebsite = document.getElementById("muslimEncy-website");

offlineDownload.style.cursor = "pointer";
fullofflineDownload.style.cursor = "pointer";
onlineDownload.style.cursor = "pointer";
muslimWebsite.style.cursor = "pointer";

// API endpoints
let offlineIncrementURL = `${baseURL}/downloads/offline/increment`;
let onlineIncrementURL = `${baseURL}/downloads/online/increment`;

// Count URLs
let offlineCountURL = `${baseURL}/downloads/offline/count`;
let onlineCountURL = `${baseURL}/downloads/online/count`;

// URLs for downloads
let fullofflineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file";
let offlineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file";
let onlineURL = "https://www.mediafire.com/file/4fepk1fo2qjts8t/MuslimEncyclopedia_Lite.rar";
let muslimWebsiteURL = "https://m5rdev.github.io/MuslimEncyclopedia-online/";

// Default counters values
let fullofflineCount = 55; // Use default as API is unavailable
let offlineCount = 40;
let onlineCount = 41;
let muslimWebsiteCount = 10;

// Counters showers
let fullofflineCountShower = document.getElementById("fullofflineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");
let onlineCountShower = document.getElementById("onlineCountShower");
let muslimWebsiteCountShower = document.getElementById("muslimWebsiteCountShower");

// Fetch initial download counts using Axios GET requests
axios.get(offlineCountURL)
    .then((response) => {
        offlineCount = response.data.count;
        offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;

        // Display the initial count for full offline download
        fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
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

// muslimEncyclopedia website browse (without API increment)
muslimWebsite.addEventListener("click", () => {
    muslimWebsiteCount++;
    muslimWebsiteCountShower.innerHTML = `عدد الزيارات: ${muslimWebsiteCount}`;
    window.open(muslimWebsiteURL);
});

// Header mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuBtn = document.querySelector('.header-menu-btn');

    if (menuBtn && header) {
        menuBtn.addEventListener('click', () => {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', String(!expanded));
            header.classList.toggle('nav-open');
        });
    }
    
    // Notification box behaviour (show/hide like app notifications)
    const notification = document.getElementById('notificationBox');
    const closeBtn = document.getElementById('notificationClose');
    if (notification) {
        let showTimeout = null;
        let hideTimeout = null;
        let loopInterval = null;

        const showNotification = () => {
            notification.classList.remove('hide');
            notification.classList.add('show');
        };

        const hideNotification = () => {
            notification.classList.remove('show');
            notification.classList.add('hide');
        };

        const startLoop = () => {
            // show immediately, hide after 4s, then repeat every 6s
            showNotification();
            hideTimeout = setTimeout(hideNotification, 4000);
            loopInterval = setInterval(() => {
                showNotification();
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(hideNotification, 4000);
            }, 6000);
        };

        const stopLoop = () => {
            clearInterval(loopInterval);
            clearTimeout(hideTimeout);
            clearTimeout(showTimeout);
        };

        // start loop after DOM load
        startLoop();

        // Pause when user hovers the notification
        notification.addEventListener('mouseenter', () => {
            stopLoop();
            // ensure it's visible while hovering
            showNotification();
        });

        notification.addEventListener('mouseleave', () => {
            // resume loop after leaving
            hideTimeout = setTimeout(hideNotification, 3000);
            loopInterval = setInterval(() => {
                showNotification();
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(hideNotification, 4000);
            }, 6000);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                stopLoop();
                notification.remove();
            });
        }
    }
});
