document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const usernameInput = document.getElementById("Username_input");
      const passwordInput = document.getElementById("Password_input");
      const resultDiv = document.getElementById("resultRegister");
  
      const username = usernameInput.value;
      const password = passwordInput.value;
  
      usernameInput.value = "";
      passwordInput.value = "";
  
      const data = {
        identifiant: username,
        password: password,
      };
  
      try {
        const response = await fetch("http://192.168.64.162:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Réponse du serveur:", result);
  
          document.cookie =
            "ProjetE_unique_user_token=" +
            encodeURIComponent(result.userUUID) +
            "; max-age=" +
            (7 * 24 * 60 * 60);
  
          resultDiv.textContent = "Connexion réussie!";
          resultDiv.style.color = "green";
          setTimeout(function () {
            window.location.href = "index.html";
          }, 2000);
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
  
          resultDiv.textContent = "Erreur de connexion. Veuillez réessayer.";
          resultDiv.style.color = "red";
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error.message);
  
        resultDiv.textContent = "Erreur de connexion. Veuillez réessayer.";
        resultDiv.style.color = "red";
      }
    });
  });
  