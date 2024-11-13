import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Inicializar Firebase con la configuración de Firebase
const app = initializeApp(window.getFirebaseConfig());
const db = getDatabase(app);

// Función para obtener los posts de Firebase
const fetchAllPosts = async () => {
    const container = document.getElementById("submissions-list");
    container.textContent = "Cargando...";

    try {
        // Referencia a la base de datos de submissions
        const dbRef = ref(db, "submissions");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            container.innerHTML = "";
            const postsArray = [];

            // Iteramos sobre cada categoría de submissions (como texturepacks, addons, etc.)
            snapshot.forEach((categorySnap) => {
                categorySnap.forEach((postSnap) => {
                    const postData = postSnap.val();

                    // Obtener los datos de los posts de manera consistente
                    const postName = postData?.postname || "Sin nombre";
                    const postOwner = postData?.owner || "Desconocido";
                    const postThumbnail = postData?.thumbnail || "https://via.placeholder.com/150"; // Placeholder si no hay thumbnail
                    const postDate = postData?.date || "2000-01-01"; // Aseguramos que tenga una fecha
                    const isExternalURL = postData?.isExternalURL ?? false; // Usar el valor por defecto false si no está presente
                    const externalURL = postData?.ExternalURL || ""; // Obtenemos la URL externa si existe

                    // Verificar si estamos obteniendo correctamente los datos
                    console.log(`postName: ${postName}, isExternalURL: ${isExternalURL}, ExternalURL: ${externalURL}`);

                    postsArray.push({
                        name: postName,
                        owner: postOwner,
                        thumbnail: postThumbnail,
                        date: new Date(postDate),
                        isExternalURL: isExternalURL,  // Guardamos el valor de isExternalURL correctamente
                        externalURL: externalURL       // Guardamos el valor de ExternalURL correctamente
                    });
                });
            });

            // Ordenar los posts por fecha (de más reciente a más antiguo)
            postsArray.sort((a, b) => b.date - a.date);

            // Mostrar los posts en el contenedor
            postsArray.forEach((post) => {
                const listItem = document.createElement("div");
                listItem.className = "post-item";
                listItem.setAttribute("data-id", post.name); // Asignamos el id del post (nombre de la rama)

                // Crear un elemento de imagen para el thumbnail
                const imgElement = document.createElement("img");
                imgElement.src = post.thumbnail;
                imgElement.alt = post.name;
                imgElement.className = "post-thumbnail";

                // Crear un elemento de texto para el nombre del post
                const textElement = document.createElement("span");
                textElement.className = "post-name";
                textElement.textContent = post.name;

                // Crear un contenedor para el propietario
                const ownerElement = document.createElement("span");
                ownerElement.className = "post-owner";
                ownerElement.textContent = post.owner; // Sin "Por:"

                // Agregar los elementos al listItem
                listItem.appendChild(imgElement);
                listItem.appendChild(textElement);
                listItem.appendChild(ownerElement);

                // Manejador de evento de clic para redirigir con el parámetro id
                listItem.addEventListener("click", () => {
                    // Mostrar los valores en un alert (cuadro de diálogo)
                    alert(`Clic en el post: ${post.name}\n\nisExternalURL: ${post.isExternalURL}\nexternalURL: ${post.externalURL}`);

                    // Verificar si isExternalURL es true y si existe ExternalURL
                    if (post.isExternalURL && post.externalURL) {
                        // Si es un enlace externo, redirigir a la URL externa
                        alert(`Redirigiendo a URL externa: ${post.externalURL}`);
                        window.location.href = post.externalURL; // Redirigir a la URL externa
                    } else {
                        // Si no es externo, redirigir con el parámetro id
                        const postId = listItem.getAttribute("data-id");
                        alert(`Redirigiendo al ID del post: ${postId}`);
                        window.location.href = `https://lightningcube.netlify.app/submissionview?id=${postId}`;
                    }
                });

                // Agregar el listItem al contenedor
                container.appendChild(listItem);
            });

            // Mensaje si no hay datos
            if (postsArray.length === 0) {
                container.textContent = "No se encontraron datos.";
            }
        } else {
            container.textContent = "No se encontraron datos.";
        }
    } catch (error) {
        alert("Error al obtener los datos: " + error);
        container.textContent = "No se pudo obtener los datos.";
    }
};

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchAllPosts);