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

    // Variables para la descarga y tiempo de Linkvertise
    let hasVisitedLinkvertise = false;
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

    // Verificar si el usuario ha regresado de Linkvertise y contar el tiempo
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
        const timeSpent = (Date.now() - startTime) / 1000; // Tiempo en segundos
        if (timeSpent > 10) {
            // Iniciar la descarga si se ha pasado más de 10 segundos en Linkvertise
            iniciarDescarga();
        }
        // Limpiar el localStorage para evitar conflictos
        localStorage.removeItem('startTime');
    }

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

    // Temporizador para cambiar el texto del botón después de 25 segundos
    setTimeout(() => {
        if (!hasVisitedLinkvertise) {
            hasVisitedLinkvertise = true;
            launcherButton.innerText = "Iniciar descarga";
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`; // Mantener la imagen normal
        }
    }, 25000); // 25 segundos

    // Al hacer clic en el botón
    launcherButton.addEventListener('click', () => {
        if (launcherButton.innerText === "Iniciar descarga") {
            // Iniciar la descarga automáticamente si el botón dice "Iniciar descarga"
            iniciarDescarga();
        } else {
            // Prevenir que la imagen se cambie cuando se redirige a Linkvertise
            launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
            // Guardar la hora actual en el localStorage antes de ir a Linkvertise
            localStorage.setItem('startTime', Date.now());
            // Redirigir a Linkvertise
            window.location.href = linkvertiseUrl;
        }
    });
});