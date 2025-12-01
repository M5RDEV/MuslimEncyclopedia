// Default counters values
let fullofflineCount = 50;
let offlineCount = 905;
let onlineCount = 600;
let websiteCount = 20;

// URLs for downloads
let fullofflineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file";
let offlineURL = "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file";
let onlineURL = "https://www.mediafire.com/file/4fepk1fo2qjts8t/MuslimEncyclopedia_Lite.rar";
let muslimWebsiteURL = "https://m5rdev.github.io/MuslimEncyclopedia-online/";

// Links elements IDs
let fullofflineId = document.getElementById("full-offline-download");
let offlineId = document.getElementById("offline-download");
let onlineId = document.getElementById("online-download");
let websiteId = document.getElementById("muslimEncy-website");
// Counters showers
let fullofflineCountShower = document.getElementById("fullofflineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");
let onlineCountShower = document.getElementById("onlineCountShower");
let websiteCountShower = document.getElementById("websiteCountShower");

// Guard element usage to avoid runtime errors if an element is missing
if (offlineId) offlineId.style.cursor = "pointer";
if (fullofflineId) fullofflineId.style.cursor = "pointer";
if (onlineId) onlineId.style.cursor = "pointer";
if (websiteId) websiteId.style.cursor = "pointer";

// Set href/target/rel directly on element variables (don't call getElementById with an element)

//if (fullofflineId) fullofflineId.href = fullofflineURL;
if (offlineId) offlineId.href = offlineURL;
if (onlineId) onlineId.href = onlineURL;
if (websiteId) websiteId.href = muslimWebsiteURL;

// Display initial counter values immediately (guarded)
if (fullofflineCountShower) fullofflineCountShower.innerHTML = `عدد التحميلات: ${fullofflineCount}`;
if (offlineCountShower) offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
if (onlineCountShower) onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
if (websiteCountShower) websiteCountShower.innerHTML = `عدد الزيارات: ${websiteCount}`;

function fullOfflineFun() {
    alert("النسخة الكاملة لم يتم رفعها بعد على الإنترنت. سيتم رفعها قريباً إن شاء الله.");
}

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
