document.addEventListener("DOMContentLoaded", function() {
    // Get user agent
    var userAgent = navigator.userAgent;
    document.getElementById("userAgent").innerText = userAgent;

    // Get platform
    var platform = navigator.platform;
    document.getElementById("platform").innerText = platform;

    // Get memory (if available)
    if (navigator.deviceMemory) {
        document.getElementById("memory").innerText = navigator.deviceMemory + " GB";
    } else {
        document.getElementById("memory").innerText = "Not available";
    }
});
