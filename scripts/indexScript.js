// Obtener la configuración de Firebase descifrada desde firebaseConfig.js
const firebaseConfig = window.getFirebaseConfig();

// Inicializar Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Inicializar Firebase con la configuración descifrada
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para cargar los ítems desde Firebase
function loadItems() {
    // Referencia a los datos en la base de datos
    const submissionsRef = ref(db, 'submissions'); // Aquí 'submissions' es el nodo donde están tus ítems

    // Obtener los datos
    get(submissionsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const items = snapshot.val();
            const submissionsList = document.getElementById('submissions-list');
            
            // Iterar sobre los ítems y mostrarlos
            Object.keys(items).forEach((categoryKey) => {
                const category = items[categoryKey]; // Esto es el objeto de cada categoría (addons, texturepacks, etc.)
                
                Object.keys(category).forEach((itemKey) => {
                    const item = category[itemKey];
                    const postname = item.postname;
                    const thumbnail = item.thumbnail;
                    const owner = item.owner;

                    // El 'categoryKey' o 'itemKey' es la rama (branch)
                    const branch = categoryKey;

                    // Crear un nuevo elemento de la lista
                    const listItem = document.createElement('a');
                    listItem.classList.add('submission-item');
                    listItem.href = '#';
                    listItem.textContent = postname;
                    listItem.setAttribute('data-branch', branch); // Establecer la rama del ítem
                    listItem.setAttribute('data-thumbnail', thumbnail);
                    listItem.setAttribute('data-owner', owner);
                    listItem.setAttribute('data-postname', postname);

                    // Añadir el ítem a la lista
                    submissionsList.appendChild(listItem);
                });
            });
        } else {
            console.log("No se encontraron ítems.");
        }
    }).catch((error) => {
        console.error("Error al obtener los datos de Firebase:", error);
    });
}

// Llamar a la función para cargar los ítems
loadItems();

// Añadir un evento de clic a los ítems de la lista
document.getElementById('submissions-list').addEventListener('click', function(event) {
    const item = event.target;
    if (item.classList.contains('submission-item')) {
        event.preventDefault();

        // Obtener los datos del ítem
        const branchName = item.getAttribute('data-branch');
        const thumbnail = item.getAttribute('data-thumbnail');
        const owner = item.getAttribute('data-owner');
        const postname = item.getAttribute('data-postname');

        // Redirigir a la página itemview con los parámetros en la URL
        window.location.href = `https://lightningcube.netlify.app/itemview?branch=${branchName}&thumbnail=${encodeURIComponent(thumbnail)}&owner=${encodeURIComponent(owner)}&postname=${encodeURIComponent(postname)}`;
    }
});