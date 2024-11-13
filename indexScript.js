// Archivo: indexScript.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, child, query, orderByChild } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const app = initializeApp(window.getFirebaseConfig());
const db = getDatabase(app);

const fetchAllPosts = async () => {
    const container = document.getElementById("submissions-list");
    container.textContent = "Cargando...";

    try {
        const dbRef = ref(db, "submissions");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            container.innerHTML = "";
            const postsArray = [];

            // Iteramos por cada rama (texturepacks, addons, skinpacks, etc.)
            snapshot.forEach((categorySnap) => {
                categorySnap.forEach((postSnap) => {
                    const postData = postSnap.val();
                    const postName = postData?.postname || "Sin nombre";
                    const postDate = postData?.date || "2000-01-01"; // Aseguramos que tenga una fecha

                    postsArray.push({
                        name: postName,
                        date: new Date(postDate),
                    });
                });
            });

            // Ordenamos los posts del más reciente al más antiguo
            postsArray.sort((a, b) => b.date - a.date);

            // Mostramos los posts
            postsArray.forEach((post) => {
                const listItem = document.createElement("div");
                listItem.className = "post-item";
                listItem.textContent = post.name;
                container.appendChild(listItem);
            });

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

document.addEventListener("DOMContentLoaded", fetchAllPosts);