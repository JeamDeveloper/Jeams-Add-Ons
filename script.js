document.addEventListener('DOMContentLoaded', () => {
    const launcherButton = document.getElementById('launcher_button');
    const downloadUrl = "https://github.com/JeamDeveloper/Lightning-Cube/raw/1e1601e5a777ace72d251f81ff61dc84400cb57d/resources/extra/Murder%20Mystery%20Assistant%20+.mcpack";

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

    // Manejo del evento de click para el botón de descarga
    launcherButton.addEventListener('click', () => {
        // Preguntar si desea descargar el archivo
        if (confirm("¿Quieres descargar el archivo Murder Mystery Assistant +?")) {
            // Después de 10 segundos de estar en la página de Linkvertise, comenzar la descarga
            setTimeout(() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = downloadUrl;
                downloadLink.download = 'Murder Mystery Assistant +.mcpack';
                downloadLink.click();
            }, 10000); // 10 segundos
        }
    });
});