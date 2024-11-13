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

                    // Obtener los nuevos childkeys: postname, owner, thumbnail
                    const postName = postData?.postname || "Sin nombre";
                    const postOwner = postData?.owner || "Desconocido";
                    const postThumbnail = postData?.thumbnail || "https://via.placeholder.com/150"; // Placeholder si no hay thumbnail
                    const postDate = postData?.date || "2000-01-01"; // Aseguramos que tenga una fecha

                    postsArray.push({
                        name: postName,
                        owner: postOwner,
                        thumbnail: postThumbnail,
                        date: new Date(postDate),
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
                    const postId = listItem.getAttribute("data-id"); // Obtener el id del post
                    window.location.href = `https://lightningcube.netlify.app/submissionview?id=${postId}`; // Redirigir con el parámetro id
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
        console.error("Error al obtener datos:", error);
        container.textContent = "No se pudo obtener los datos.";
    }
};

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchAllPosts);