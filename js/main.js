const FEATURES = [
    "تسجيلات القرآن الكريم 22 قارئ للنسخة الأوفلاين و 27 للنسخة (الأونلاين)",
    "16 طابعة للمصاحف [طباعة المدينة - مصر - تونس - الأردية]",
    "الوضوء و الصلاة و سنن مهجوره و أخطأ شائعة فيهما",
    "الأذان [جاري العمل على إضافتة قريبا إن شاء الله]",
    "علامات الساعة مع شرح بسيط لك علامة",
    "أذكار الصباح و المساء ... إالخ",
    "أسماء الله الحسنى وشرح معانيها",
    "العشرة المبشرين بالجنة مع نبذه عنه",
    "جزء من السيرة النبوية",
    "مجموعة من الاحاديث",
    "الإعجاز العلمي في القرآن",
    "شرح لفضل بعض العبادات",
    "أدعية من القران الكريم",
    "نساء عظيمة في الإسلام",
    "12 فديو تعليمي",
    "الرقية الشرعية",
    "لعبة أسئلة دينية",
    "فرص ذهبيه",
    "اية وعبرة",
    "مجاني بالكامل"
];

const FEATURES_PER_PAGE = 5;
let featuresStartIndex = 0;

function createFeatureItem(feature) {
    const li = document.createElement("li");
    li.innerHTML = `
            <p>
                ${feature}
                <span>
                    <img src="./image/check.png" alt="check">
                </span>
            </p>
        `;
    return li;
}

function initFeaturesSection() {
    const featuresUl = document.getElementById("features_ul");
    const featuresMobileControls = document.getElementById("featuresMobileControls");
    const featuresPrevBtn = document.getElementById("featuresPrev");
    const featuresNextBtn = document.getElementById("featuresNext");
    const featuresPageIndicator = document.getElementById("featuresPageIndicator");

    if (!featuresUl) {
        return;
    }

    const featuresMobileMedia = window.matchMedia("(max-width: 768px)");

    const renderFeatures = () => {
        const isMobile = featuresMobileMedia.matches;
        const maxStartIndex = Math.max(0, FEATURES.length - FEATURES_PER_PAGE);

        if (!isMobile) {
            featuresStartIndex = 0;
        } else if (featuresStartIndex > maxStartIndex) {
            featuresStartIndex = maxStartIndex;
        }

        const visibleFeatures = isMobile
            ? FEATURES.slice(featuresStartIndex, featuresStartIndex + FEATURES_PER_PAGE)
            : FEATURES;

        featuresUl.innerHTML = "";
        visibleFeatures.forEach((feature) => {
            featuresUl.appendChild(createFeatureItem(feature));
        });

        if (featuresMobileControls) {
            featuresMobileControls.hidden = !isMobile;
        }

        if (isMobile && featuresPrevBtn && featuresNextBtn && featuresPageIndicator) {
            const currentPage = Math.floor(featuresStartIndex / FEATURES_PER_PAGE) + 1;
            const totalPages = Math.ceil(FEATURES.length / FEATURES_PER_PAGE);

            featuresPrevBtn.disabled = featuresStartIndex === 0;
            featuresNextBtn.disabled = featuresStartIndex >= maxStartIndex;
            featuresPageIndicator.textContent = `${currentPage} / ${totalPages}`;
        }
    };

    if (featuresPrevBtn && featuresNextBtn) {
        featuresPrevBtn.addEventListener("click", () => {
            featuresStartIndex = Math.max(0, featuresStartIndex - FEATURES_PER_PAGE);
            renderFeatures();
        });

        featuresNextBtn.addEventListener("click", () => {
            const maxStartIndex = Math.max(0, FEATURES.length - FEATURES_PER_PAGE);
            featuresStartIndex = Math.min(maxStartIndex, featuresStartIndex + FEATURES_PER_PAGE);
            renderFeatures();
        });
    }

    if (typeof featuresMobileMedia.addEventListener === "function") {
        featuresMobileMedia.addEventListener("change", renderFeatures);
    } else if (typeof featuresMobileMedia.addListener === "function") {
        featuresMobileMedia.addListener(renderFeatures);
    }

    renderFeatures();
}


function imageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

async function appendSequentialScreenshotItems(containerId, options) {
    const {
        basePath,
        altPrefix,
        maxImagesToCheck,
        maxConsecutiveMissing
    } = options;

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    let consecutiveMissing = 0;
    let hasFoundAnyImage = false;

    for (let i = 1; i <= maxImagesToCheck; i++) {
        const src = `${basePath}/${i}.png`;
        const exists = await imageExists(src);

        if (!exists) {
            consecutiveMissing += 1;

            if (hasFoundAnyImage && consecutiveMissing >= maxConsecutiveMissing) {
                break;
            }

            continue;
        }

        hasFoundAnyImage = true;
        consecutiveMissing = 0;

        const listItem = document.createElement("li");
        const img = document.createElement("img");

        img.src = src;
        img.alt = `${altPrefix} ${i}`;

        if (i >= 3) {
            img.loading = "lazy";
            img.fetchpriority = "low";
        }

        listItem.appendChild(img);
        container.appendChild(listItem);
    }
}

function initScreenshotSections() {
    appendSequentialScreenshotItems("image-list", {
        basePath: "./image/desktop",
        altPrefix: "screenshot desktop",
        maxImagesToCheck: 150,
        maxConsecutiveMissing: 15
    });

    appendSequentialScreenshotItems("screenshot-list", {
        basePath: "./image/desktop/lite version",
        altPrefix: "screenshot lite",
        maxImagesToCheck: 60,
        maxConsecutiveMissing: 10
    });
}

initFeaturesSection();
initScreenshotSections();
const DOWNLOAD_LINKS = {
    fullofflineCount: "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file",
    offlineCount: "https://www.mediafire.com/file/orhjvbyzbpb3sap/موسوعة+المسلم.rar/file",
    onlineCount: "https://www.mediafire.com/file/4fepk1fo2qjts8t/MuslimEncyclopedia_Lite.rar",
    websiteCount: "https://m5rdev.github.io/MuslimEncyclopedia-online/"
};

const COUNTER_LABELS = {
    fullofflineCount: "عدد التحميلات",
    offlineCount: "عدد التحميلات",
    onlineCount: "عدد التحميلات",
    websiteCount: "عدد الزيارات"
};

const LINK_ELEMENTS = {
    fullofflineCount: document.getElementById("full-offline-download"),
    offlineCount: document.getElementById("offline-download"),
    onlineCount: document.getElementById("online-download"),
    websiteCount: document.getElementById("muslimEncy-website")
};

const COUNTER_ELEMENTS = {
    fullofflineCount: document.getElementById("fullofflineCountShower"),
    offlineCount: document.getElementById("offlineCountShower"),
    onlineCount: document.getElementById("onlineCountShower"),
    websiteCount: document.getElementById("websiteCountShower")
};

function setCounterMessage(counterKey, message) {
    const counterElement = COUNTER_ELEMENTS[counterKey];
    if (counterElement) {
        counterElement.textContent = message;
    }
}

function setCounterValue(counterKey, value) {
    const counterElement = COUNTER_ELEMENTS[counterKey];
    const counterLabel = COUNTER_LABELS[counterKey];

    if (counterElement && counterLabel) {
        counterElement.textContent = `${counterLabel}: ${value}`;
    }
}

function getFirebaseContext() {
    const firebaseSettings = window.MUSLIM_ENCYCLOPEDIA_FIREBASE;

    if (
        !firebaseSettings ||
        !firebaseSettings.config ||
        !firebaseSettings.entries ||
        typeof window.firebase === "undefined"
    ) {
        return null;
    }

    try {
        const app = window.__muslimEncyclopediaFirebaseApp ||
            (window.firebase.apps.length ? window.firebase.app() : window.firebase.initializeApp(firebaseSettings.config));

        window.__muslimEncyclopediaFirebaseApp = app;

        return {
            database: window.firebase.database(app),
            entries: firebaseSettings.entries
        };
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        return null;
    }
}

const firebaseContext = getFirebaseContext();

function getCounterEndpoint(counterKey) {
    return firebaseContext?.entries?.[counterKey]?.endpoint || null;
}

function subscribeToCounter(counterKey) {
    const endpoint = getCounterEndpoint(counterKey);

    if (!firebaseContext || !endpoint) {
        setCounterMessage(counterKey, "العداد غير متاح حاليا");
        return;
    }

    firebaseContext.database.ref(endpoint).on(
        "value",
        (snapshot) => {
            const rawValue = Number(snapshot.val());
            const counterValue = Number.isFinite(rawValue) && rawValue >= 0 ? rawValue : 0;
            setCounterValue(counterKey, counterValue);
        },
        (error) => {
            console.error(`Failed to read counter "${counterKey}":`, error);
            setCounterMessage(counterKey, "تعذر تحميل العداد");
        }
    );
}

function incrementCounter(counterKey) {
    const endpoint = getCounterEndpoint(counterKey);

    if (!firebaseContext || !endpoint) {
        return;
    }

    firebaseContext.database.ref(endpoint).transaction(
        (currentValue) => {
            const parsedValue = Number(currentValue);
            return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue + 1 : 1;
        },
        (error) => {
            if (error) {
                console.error(`Failed to update counter "${counterKey}":`, error);
            }
        }
    );
}

Object.keys(COUNTER_ELEMENTS).forEach((counterKey) => {
    setCounterMessage(counterKey, "جاري تحميل العداد...");
    subscribeToCounter(counterKey);
});

Object.entries(LINK_ELEMENTS).forEach(([counterKey, linkElement]) => {
    if (!linkElement) {
        return;
    }

    const downloadLink = DOWNLOAD_LINKS[counterKey];

    linkElement.style.cursor = "pointer";
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";

    if (downloadLink) {
        linkElement.href = downloadLink;
    }

    linkElement.addEventListener("click", () => {
        incrementCounter(counterKey);
    });
});

// Header mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuBtn = document.querySelector('.header-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-panel');
    const mobileMenuMedia = window.matchMedia('(max-width: 768px)');

    const closeMenu = () => {
        if (!header || !menuBtn) {
            return;
        }

        header.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        if (!header || !menuBtn || !mobileMenuMedia.matches) {
            return;
        }

        header.classList.add('nav-open');
        document.body.classList.add('menu-open');
        menuBtn.setAttribute('aria-expanded', 'true');
    };

    if (menuBtn && header && mobileNav) {
        menuBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('click', (event) => {
            if (!header.classList.contains('nav-open')) {
                return;
            }

            if (!header.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        const handleViewportChange = () => {
            if (!mobileMenuMedia.matches) {
                closeMenu();
            }
        };

        if (typeof mobileMenuMedia.addEventListener === 'function') {
            mobileMenuMedia.addEventListener('change', handleViewportChange);
        } else if (typeof mobileMenuMedia.addListener === 'function') {
            mobileMenuMedia.addListener(handleViewportChange);
        }
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



