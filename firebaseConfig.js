// Archivo: firebaseConfig.js
(function(){
    const obfuscar = (clave) => clave.split('').map(c => String.fromCharCode(c.charCodeAt() + 1)).join('');
    const firebaseConfig = {
        apiKey: obfuscar("AIzSyAPKImW3I6rYMZ95bY97KUo3qDLAFJF16Y"),
        authDomain: obfuscar("lightning-cube-3edce.firebaseapp.com"),
        databaseURL: obfuscar("https://lightning-cube-3edce-default-rtdb.firebaseio.com"),
        projectId: obfuscar("lightning-cube-3edce"),
        storageBucket: obfuscar("lightning-cube-3edce.appspot.com"),
        messagingSenderId: obfuscar("833313409687"),
        appId: obfuscar("1:833313409687:web:bb34600cea6aeda0c177d2"),
        measurementId: obfuscar("G-9KTSWKDJ6F")
    };

    const decodeConfig = () => {
        const descifrar = (clave) => clave.split('').map(c => String.fromCharCode(c.charCodeAt() - 1)).join('');
        return Object.fromEntries(
            Object.entries(firebaseConfig).map(([k, v]) => [k, descifrar(v)])
        );
    };

    window.getFirebaseConfig = decodeConfig;
})();
