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

    // Al presionar el botón, redirigir al enlace de Linkvertise
    launcherButton.addEventListener('click', () => {
        window.location.href = 'https://link-hub.net/249306/mmaplus-addon-mcbd';
    });

    // Lógica de detección de tiempo en la página de Linkvertise
    let linkvertiseExitTime = 0;
    const downloadUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/raw/1e1601e5a777ace72d251f81ff61dc84400cb57d/resources/extra/Murder%20Mystery%20Assistant%20+.mcpack';

    // Detectar si el visitante viene de un enlace de Linkvertise
    const referer = document.referrer.toLowerCase();
    const isFromLinkvertise = referer.includes("linkvertise");

    if (isFromLinkvertise) {
        linkvertiseExitTime = Date.now();
    }

    // Verificar después de 10 segundos si el visitante se quedó mucho tiempo en la página de Linkvertise
    setInterval(() => {
        if (isFromLinkvertise && linkvertiseExitTime !== 0) {
            const currentTime = Date.now();
            const timeSpent = (currentTime - linkvertiseExitTime) / 1000; // tiempo en segundos
            if (timeSpent >= 10) {
                // Mostrar diálogo para la descarga
                const userConfirmed = confirm('¿Quieres descargar el archivo Murder Mystery Assistant +?');
                if (userConfirmed) {
                    window.location.href = downloadUrl; // Iniciar la descarga
                }
            }
        }
    }, 1000); // Comprobar cada segundo
});