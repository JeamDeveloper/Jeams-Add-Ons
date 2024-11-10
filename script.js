document.addEventListener('DOMContentLoaded', () => {
    const launcherButton = document.getElementById('launcher_button');

    // Cargar imágenes anticipadamente
    const normalImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true';
    const pressedImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true';
    
    const normalImage = new Image();
    normalImage.src = normalImageUrl;
    const pressedImage = new Image();
    pressedImage.src = pressedImageUrl;

    // Cambiar imagen sin animación ni fade
    launcherButton.addEventListener('mouseenter', () => {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });

    launcherButton.addEventListener('mouseleave', () => {
        launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
    });

    // Detectar que el usuario ha estado más de 10 segundos en la página y luego comprobar si viene desde Linkvertise
    let timeout;
    let downloadStarted = false;

    // Cuando el usuario entra a la página
    window.addEventListener('focus', () => {
        if (!downloadStarted) {
            timeout = setTimeout(() => {
                checkReferrerAndDownload();
            }, 10000); // Esperar 10 segundos
        }
    });

    // Comprobar el referrer después de 10 segundos
    function checkReferrerAndDownload() {
        if (document.referrer.includes('linkvertise')) {
            startDownload(); // Si viene de Linkvertise, comenzar la descarga
        }
    }

    // Función para iniciar la descarga
    function startDownload() {
        downloadStarted = true;
        const downloadUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/raw/1e1601e5a777ace72d251f81ff61dc84400cb57d/resources/extra/Murder%20Mystery%20Assistant%20+.mcpack';
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'Murder_Mystery_Assistant_+.mcpack'; // Nombre de archivo de la descarga
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Limpiar el DOM
    }

    // Si el usuario deja la página antes de los 10 segundos, se cancela la descarga
    window.addEventListener('blur', () => {
        clearTimeout(timeout);
    });
});