// On récupère les éléments HTML
const erreur = document.getElementById("erreur");
const nombreAllumettes = document.getElementById("nombreAllumettes");
let nombreAllumettesUtilisateur = document.getElementById("allumettes-utilisateur");
const allumettesImageConteneur = document.getElementById("allumettes-image-conteneur");
const valeurSaisie = document.getElementById("valeur-saisie");
const nombreJoueur = document.getElementById("nombre-joueur");
const messageMultiJoueur = document.getElementById("message-multi-joueur");
const messageGagneOuPerdu = document.getElementById("message-gagne-ou-perdu");
const allumettesImage = document.getElementById("allumettes-image");
const erreurAllumettes = document.getElementById("erreur-allumettes");

let nombreAllumettesTotal = 50; // Nombre d'allumettes au départ

// Génère et insère 50 images d'allumettes
for (let i = 0; i < 50; i++) {
    const img = document.createElement("img");
    img.src = "images/freepik__background__45453.png";
    img.alt = "Allumette";
    img.classList.add("allumettes");
    allumettesImageConteneur.appendChild(img);
  }
  

  function supprimerLesImagesAllumettes(nombreARetirer) {
  const totalImages = allumettesImageConteneur.children.length;

  for (let i = totalImages - 1; i >= totalImages - nombreARetirer && i >= 0; i--) {
    allumettesImageConteneur.removeChild(allumettesImageConteneur.children[i]);
  }

  // Si le total est zéro, supprime tout le reste (au cas où)
  if (nombreAllumettesTotal <= 0) {
    while (allumettesImageConteneur.firstChild) {
      allumettesImageConteneur.removeChild(allumettesImageConteneur.firstChild);
    }
  }
}


// Vérifie la victoire ou la défaite
function gagneOuPerdu() {
  // Vérifie que le nombre d'allumettes restantes soit supérieur ou égal à 0 pour savoir si l'utilisateur a gagné ou perdu
  if (nombreAllumettesTotal === 0 && allumettesImageConteneur.children.length === 0) {
    messageGagneOuPerdu.innerHTML = "Vous avez gagné !";
 
  } else if (nombreAllumettesTotal > 0){
      messageGagneOuPerdu.innerHTML = "Continuez le jeu !";
      
  } else {
    messageGagneOuPerdu.innerHTML = "Vous avez perdu !";
    
  }
}

function retirerAllumettes(nombreARetirer) {
  // Vérifie que le nombre d'allumettes retirées est comprise entre 1 et 6
  if (nombreARetirer < 1 || nombreARetirer > 6) {
    erreur.innerHTML = "Vous pouvez seulement retirer entre 1 et 6 allumettes.";
    return nombreAllumettesTotal; // Retourne le nombre actuel si erreur
  }

  // Vérifie que le nombre d'allumettes retirées ne dépasse pas le nombre total
  if (nombreARetirer > nombreAllumettesTotal) {
    erreurAllumettes.innerHTML = "Vous ne pouvez pas retirer plus d'allumettes que vous en avez.";
    return nombreAllumettesTotal; // Retourne le nombre actuel si erreur
  } else { 
    erreurAllumettes.innerHTML = ""
  }

  // Supprime les images correspondantes
  supprimerLesImagesAllumettes(nombreARetirer);
  setTimeout(() => {
    gagneOuPerdu();
}, 10); // Petite pause pour garantir la mise à jour visuelle.


  // Mise à jour du nombre total d'allumettes et du message
  nombreAllumettesTotal -= nombreARetirer;
  
  nombreAllumettes.innerHTML = `${nombreAllumettesTotal} allumettes restantes`;

  // Vérifie que le joueur ne puisse pas retirer plus d'allumettes que le nombre d'allumettes restantes
  nombreAllumettesUtilisateur = nombreARetirer;

  return nombreAllumettesTotal;
}
  
  // Fonction de validation pour le bouton
  function validerRetrait() {
    const nombreARetirer = parseInt(valeurSaisie.value, 10);
  
    if (isNaN(nombreARetirer) || nombreARetirer < 1 || nombreARetirer > 6) {
      messageMultiJoueur.innerHTML = "Vous pouvez seulement retirer un nombre entre 1 et 6 allumettes.";
    } else {
      messageMultiJoueur.innerHTML = ""; // Réinitialise le message d'erreur
      retirerAllumettes(nombreARetirer);
    }
  }
  
  // Écouteur d'événement pour le bouton
  document.getElementById("retirer-allumettes").addEventListener("click", validerRetrait);


function multiJoueurs() {
  const multiPlayers = parseInt(nombreJoueur.value, 10);

  if (isNaN(multiPlayers) || multiPlayers < 1 || multiPlayers > 5) {
      messageMultiJoueur.innerHTML = "Veuillez choisir un nombre de joueurs entre 1 et 5.";
  } else {
      messageMultiJoueur.innerHTML = "";
      messageMultiJoueur.innerHTML = `Il y a ${multiPlayers} joueur(s).`;
  }
}

multiJoueurs();

// Écouteur d'événement pour détecter les changements dans la saisie
nombreJoueur.addEventListener("input", multiJoueurs);




