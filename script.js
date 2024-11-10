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
        console.log('Página en foco, esperando 10 segundos...'); // Depuración
        if (!downloadStarted) {
            timeout = setTimeout(() => {
                checkReferrerAndDownload();
            }, 10000); // Esperar 10 segundos
        }
    });

    // Comprobar el referrer después de 10 segundos
    function checkReferrerAndDownload() {
        console.log('Verificando referrer...'); // Depuración
        console.log('Referrer:', document.referrer); // Ver el valor del referrer
        if (document.referrer.includes('linkvertise')) {
            askForDownload(); // Si viene de Linkvertise, mostrar la confirmación
        } else {
            console.log('No proviene de Linkvertise'); // Depuración
        }
    }

    // Mostrar el cuadro de confirmación antes de iniciar la descarga
    function askForDownload() {
        const userConfirmed = confirm("¿Quieres descargar el archivo 'Murder Mystery Assistant +'?");
        if (userConfirmed) {
            startDownload(); // Iniciar la descarga si el usuario acepta
        } else {
            console.log("Descarga cancelada."); // Depuración si el usuario cancela
        }
    }

    // Función para iniciar la descarga
    function startDownload() {
        downloadStarted = true;
        console.log('Iniciando descarga...'); // Depuración
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