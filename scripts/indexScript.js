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
    const submissionsRef = ref(db, 'submissions'); // 'submissions' es el nodo donde están tus ítems

    // Obtener los datos
    get(submissionsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const items = snapshot.val();
            const submissionsList = document.getElementById('submissions-list');
            submissionsList.innerHTML = ''; // Limpiar el contenido antes de cargar los nuevos ítems

            // Iterar sobre las categorías (addons, texturepacks, etc.)
            Object.keys(items).forEach((categoryKey) => {
                const category = items[categoryKey]; // Esto es el objeto de cada categoría (addons, texturepacks, etc.)
                
                Object.keys(category).forEach((itemKey) => {
                    const item = category[itemKey];
                    const postname = item.postname;

                    // La rama es la clave de la categoría (ej. texturepack)
                    const branch = categoryKey;

                    // Crear un nuevo elemento de la lista que solo muestra el postname
                    const listItem = document.createElement('a');
                    listItem.classList.add('submission-item');
                    listItem.href = `https://lightningcube.netlify.app/itemview?branch=${branch}&postname=${postname}`;
                    listItem.textContent = postname; // Solo mostrar el postname

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