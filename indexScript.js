// Archivo: indexScript.js
(function() {
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

    const app = initializeApp(window.getFirebaseConfig());
    const db = getDatabase(app);

    const fetchSubmissions = async () => {
        const container = document.getElementById("submissions-links");
        container.textContent = "Cargando...";
        try {
            const snapshot = await get(child(ref(db), "submissions"));
            if (snapshot.exists()) {
                container.innerHTML = "";
                let hasData = false;
                snapshot.forEach(categorySnap => {
                    categorySnap.forEach(postSnap => {
                        const postData = postSnap.val();
                        const postName = postData?.postname || "Sin nombre";
                        const listItem = document.createElement("div");
                        listItem.className = "post-name";
                        listItem.textContent = postName;
                        container.appendChild(listItem);
                        hasData = true;
                    });
                });
                if (!hasData) container.textContent = "No se encontraron datos.";
            } else {
                container.textContent = "No se encontraron datos.";
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
            container.textContent = "No se pudo obtener los datos.";
        }
    };

    document.addEventListener("DOMContentLoaded", fetchSubmissions);
})();
