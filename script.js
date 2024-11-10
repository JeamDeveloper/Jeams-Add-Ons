document.addEventListener('DOMContentLoaded', () => {
    const launcherButton = document.getElementById('launcher_button');

    // URL de la imagen normal y presionada
    const normalImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true';
    const pressedImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true';

    // Variables para el archivo y el enlace de Linkvertise
    const fileUrl = "https://github.com/JeamDeveloper/Lightning-Cube/raw/1e1601e5a777ace72d251f81ff61dc84400cb57d/resources/extra/Murder%20Mystery%20Assistant%20+.mcpack";
    const linkvertiseUrl = "https://link-hub.net/249306/mmaplus-addon-mcbd";

    // Función para iniciar la descarga del archivo
    function iniciarDescarga() {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = "Murder Mystery Assistant +.mcpack";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Verificar si el usuario ha regresado de Linkvertise
    const startTime = localStorage.getItem('startTime');
    const referrer = document.referrer || ''; 

    if (startTime && referrer.includes('linkvertise')) {
        const timeSpent = (Date.now() - startTime) / 1000; // Tiempo en segundos

        if (timeSpent > 10) {
            // Esperar 1 segundo antes de iniciar la descarga automática
            setTimeout(() => {
                iniciarDescarga();
            }, 1000);
        }
        
        // Limpiar el localStorage para evitar conflictos futuros
        localStorage.removeItem('startTime');
    }

    // Cargar imagen normal y presionada
    const normalImage = new Image();
    normalImage.src = normalImageUrl;
    const pressedImage = new Image();
    pressedImage.src = pressedImageUrl;

    // Cambiar imagen cuando se pasa el ratón por encima (hover) o se toca en una pantalla táctil
    launcherButton.addEventListener('mouseenter', () => {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });

    // Cambiar imagen cuando se toca en dispositivos táctiles (touchstart)
    launcherButton.addEventListener('touchstart', () => {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });

    // Volver a la imagen normal cuando el ratón deja de estar encima o se deja de tocar
    launcherButton.addEventListener('mouseleave', () => {
        launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
    });

    // Volver a la imagen normal cuando se termina el toque en dispositivos táctiles (touchend)
    launcherButton.addEventListener('touchend', () => {
        launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
    });

    // Al hacer clic en el botón
    launcherButton.addEventListener('click', () => {
        // Guardar la hora actual en el localStorage antes de ir a Linkvertise
        localStorage.setItem('startTime', Date.now());
        // Redirigir a Linkvertise
        window.location.href = linkvertiseUrl;
    });
});