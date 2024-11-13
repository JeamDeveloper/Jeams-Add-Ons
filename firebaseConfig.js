// Archivo: firebaseConfig.js
(function () {
    const obfuscate = (key) => key.split("").map(c => String.fromCharCode(c.charCodeAt() + 1)).join("");
    const firebaseConfig = {
        apiKey: obfuscate("AIzSyAPKImW3I6rYMZ95bY97KUo3qDLAFJF16Y"),
        authDomain: obfuscate("lightning-cube-3edce.firebaseapp.com"),
        databaseURL: obfuscate("https://lightning-cube-3edce-default-rtdb.firebaseio.com"),
        projectId: obfuscate("lightning-cube-3edce"),
        storageBucket: obfuscate("lightning-cube-3edce.appspot.com"),
        messagingSenderId: obfuscate("833313409687"),
        appId: obfuscate("1:833313409687:web:bb34600cea6aeda0c177d2"),
        measurementId: obfuscate("G-9KTSWKDJ6F")
    };

    const decodeConfig = () => {
        const decrypt = (key) => key.split("").map(c => String.fromCharCode(c.charCodeAt() - 1)).join("");
        return Object.fromEntries(Object.entries(firebaseConfig).map(([k, v]) => [k, decrypt(v)]));
    };

    window.getFirebaseConfig = decodeConfig;
})();