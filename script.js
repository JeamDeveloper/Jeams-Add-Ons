document.addEventListener('DOMContentLoaded', function() {
    const launcherButton = document.getElementById('launcher_button');
    
    // URL de las imágenes para el estado normal y el presionado
    const normalImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true';
    const pressedImageUrl = 'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true';
    
    // Cambiar la imagen a "presionado" cuando el dedo toque el botón
    launcherButton.addEventListener('touchstart', function() {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });
    
    // Volver a la imagen original cuando el dedo deje de tocar
    launcherButton.addEventListener('touchend', function() {
        launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
    });

    // Para que funcione cuando el usuario haga click en el botón (en dispositivos con mouse)
    launcherButton.addEventListener('mousedown', function() {
        launcherButton.style.backgroundImage = `url(${pressedImageUrl})`;
    });
    
    launcherButton.addEventListener('mouseup', function() {
        launcherButton.style.backgroundImage = `url(${normalImageUrl})`;
    });
});
