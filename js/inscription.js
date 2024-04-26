document.addEventListener("DOMContentLoaded", function () {
    const submitRegisterButton = document.getElementById("SubmitRegister");
    const loginButton = document.getElementById("loginButton2");
  
    submitRegisterButton.addEventListener("click", submitRegister);
  
    loginButton.addEventListener("click", function () {
      window.location.href = "connexion.html";
    });
  
    function submitRegister() {
      const usernameInput = document.getElementById("Username_input");
      const passwordInput = document.getElementById("Password_input");
      const resultDiv = document.getElementById("resultRegister");
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!username || !password) {
        resultDiv.innerHTML = "Veuillez remplir les deux champs";
        return;
      }
  
      const xhr = new XMLHttpRequest();
      const url = 'http://192.168.64.162:3000/register';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          usernameInput.value = '';
          passwordInput.value = '';
  
          console.log(xhr.responseText);
  
          if (xhr.status == 201) {
            resultDiv.innerHTML = 'Création de compte réussie';
            console.log('Utilisateur créé avec succès.');
            resultDiv.style.color = 'green';
          } else if (xhr.status == 400) {
            resultDiv.innerHTML = "Nom d'utilisateur déjà pris";
            console.error('Erreur lors de la création de l\'utilisateur.');
          } else {
            resultDiv.innerHTML = "Une erreur s'est produite, veuillez réessayer plus tard";
            console.error('Erreur lors de la création de l\'utilisateur.');
          }
        }
      };
  
      const data = {
        identifiant: username,
        password: password
      };
  
      xhr.send(JSON.stringify(data));
    }
  });
  