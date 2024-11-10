document.addEventListener('DOMContentLoaded', () => {
    const launcherButton = document.getElementById('launcher_button');

    // URL de la imagen normal y presionada
    const normalImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true';
    const pressedImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true';
    
    // Cargar imagen normal y presionada
    const normalImage = new Image();
    normalImage.src = normalImageUrl;
    const pressedImage = new Image();
    pressedImage.src = pressedImageUrl;

    // Cambiar imagen cuando se pasa el ratón por encima (hover) o se toca en una pantalla táctil
    launcherButton.addEventListener('mouseenter', () => {
        if (launcherButton.innerText !== "Iniciar descarga") {
            launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
        }
    });

    // Cambiar imagen cuando se toca en dispositivos táctiles (touchstart)
    launcherButton.addEventListener('touchstart', () => {
        if (launcherButton.innerText !== "Iniciar descarga") {
            launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
        }
    });

    // Volver a la imagen normal cuando el ratón deja de estar encima o se deja de tocar
    launcherButton.addEventListener('mouseleave', () => {
        if (launcherButton.innerText !== "Iniciar descarga") {
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
        }
    });

    // Volver a la imagen normal cuando se termina el toque en dispositivos táctiles (touchend)
    launcherButton.addEventListener('touchend', () => {
        if (launcherButton.innerText !== "Iniciar descarga") {
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
        }
    });

    // Variables para el seguimiento de la visita a Linkvertise
    let hasVisitedLinkvertise = false;

    // Temporizador para 25 segundos desde la carga de la página
    setTimeout(() => {
        if (!hasVisitedLinkvertise) {
            hasVisitedLinkvertise = true;
            launcherButton.innerText = "Iniciar descarga";
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`; // Mantener la imagen normal
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
            // Prevenir que la imagen se cambie cuando se redirige a Linkvertise
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
            // Ir a Linkvertise si el texto del botón no es "Iniciar descarga"
            window.location.href = "https://link-hub.net/249306/mmaplus-addon-mcbd";
        }
    });
});