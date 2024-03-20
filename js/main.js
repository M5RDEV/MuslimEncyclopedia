
// buttons
let onlineDownload = document.getElementById("online-download");
let offlineDownload = document.getElementById("offline-download");

//url
let offlineURL = "https://download2274.mediafire.com/htwjtnnmjcigH5O-E_jQ-rhDCK5Ml6T3OgZ3A6Rb4Ymn058EaATDauiLEXM-SMgJ_g12Q7ZVmcRoZea1w8aHdQkw_sl6rfo0P_P4gUYaLkVpLeVdx6EegMdEwSgPVtySW8ndCV8xO2dhqiA4aEQYjBvnOtsIgBKXY7P5RjeislzaBr0/orhjvbyzbpb3sap/Muslim+Encolopedia.rar";
let onlineURL =  "https://download1474.mediafire.com/uu5acn1g97ogO-v9OuGYM01lJiv-VWG8gtpSVKA7gYzrKhKygdD6GS93dpIRIZEHLOfwYqkwrUvgH5hA5RQE7D1ISUoZYc1I3XfXiQC1LIxJv8XU8KcEKk9bhWMFNK-Vy92w4gM-dOUCLMZXJ-R3szin3c5EKv9l7bskbC-6OOrGR1Q/d8pk428lzfalgxa/Muslim+Encolopedia+Lite.exe";

//counters
let onlineCount = 44;
let offlineCount = 41;

//counters showers
let onlineCountShower = document.getElementById("onlineCountShower");
let offlineCountShower = document.getElementById("offlineCountShower");


//giving some styles to the links
onlineDownload.style.cursor = "pointer";
offlineDownload.style.cursor = "pointer";

// it's general for all pages
window.addEventListener("load", function(){ 
    onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
    offlineCountShower.innerHTML = `عدد التحميلات: ${offlineCount}`;
}
);




onlineDownload.addEventListener("click", function(){
    onlineCount++;
    onlineCountShower.innerHTML = `عدد التحميلات: ${onlineCount}`;
    window.open(onlineURL);
}
);

