document.addEventListener('DOMContentLoaded', () => {
    const launcherButton = document.getElementById('launcher_button');

    // URL de las imágenes
    const normalImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true';
    const pressedImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true';
    const downloadImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenDownloadLauncherButton.png?raw=true';

    // Cargar imágenes
    const normalImage = new Image();
    normalImage.src = normalImageUrl;
    const pressedImage = new Image();
    pressedImage.src = pressedImageUrl;
    const downloadImage = new Image();
    downloadImage.src = downloadImageUrl;

    // Restablecer la imagen al pasar el mouse por encima
    launcherButton.addEventListener('mouseenter', () => {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });

    launcherButton.addEventListener('mouseleave', () => {
        if (launcherButton.innerText !== "Iniciar descarga") {
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
        }
    });

    // Temporizador para detectar el tiempo en Linkvertise
    let timer;
    let hasVisitedLinkvertise = false;

    // Iniciar el temporizador al cargar la página
    setTimeout(() => {
        if (!hasVisitedLinkvertise) {
            hasVisitedLinkvertise = true;
            launcherButton.innerText = "Iniciar descarga";
            launcherButton.style.backgroundImage = `url(${downloadImageUrl})`; // Cambiar a la imagen de descarga
        }
    }, 25000); // 25 segundos

    // Al hacer click en el botón
    launcherButton.addEventListener('click', () => {
        if (launcherButton.innerText === "Iniciar descarga") {
            // Iniciar la descarga automáticamente
            const fileUrl = "https://github.com/JeamDeveloper/Lightning-Cube/raw/1e1601e5a777ace72d251f81ff61dc84400cb57d/resources/extra/Murder%20Mystery%20Assistant%20+.mcpack";
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = "Murder Mystery Assistant +.mcpack";
            link.click();
        } else {
            // Ir a Linkvertise si no ha hecho click para descargar
            window.location.href = "https://link-hub.net/249306/mmaplus-addon-mcbd";
        }
    });
});