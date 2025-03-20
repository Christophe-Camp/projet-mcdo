//alert("coucou");
//tableau miroir du JSON
let donnees = [];
let tabCategories = [];
let vProduits = document.getElementById('produits'); //vignette : là où on va déposer les vignettes des produits
let vCategories = document.getElementById('categories'); //vignette : là où on va déposer les vignettes des produits

fetch('mcdo.json')
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(data) {
    donnees = data;
    creeCategorie();
    afficherCategorie();
  })
  .catch(function(error) {
    console.error("Erreur lors du chargement du fichier JSON :", error);
  });

  //Fonctions pour les modales

  //Fonction ouverture de modale
  //Besoin de créer classes hidden et show
function ouvrPage(page){
    if (page.classList.contains("hidden")){
        page.classList.remove("hidden");
        page.classList.add("show");
    }
}
  //Fonction fermeture de modale
  function fermPage(page){
    if (page.classList.contains("show")){
        page.classList.remove("show");
        page.classList.add("hidden");
    }
}

function afficherCategorie() {
    //vide les vignettes catégories
    vCategories.innerHTML = "";


    //création d'une vignette
    let div = document.createElement('div');
    //categorie[0] pour appeler l'image du premier produit de la catégorie
    console.log(donnees.burgers[0].name);
    let contenu = '<img src="assets/' + donnees.burgers[0].image + '" alt="burger">';
    contenu += "<h3>burgers</h3>";
    //rempli une nouvelle div avec le contenu
    div.innerHTML = contenu;
    vCategories.appendChild(div);



    //Duplique pour chaque 

    div = document.createElement('div');
    contenu = '<img src="assets/' + donnees.sides[0].image + '" alt="sides">';
    contenu += "<h3>sides</h3>";
    div.innerHTML = contenu;
    vCategories.appendChild(div);

    div = document.createElement('div');
    contenu = '<img src="assets/' + donnees.drinks[0].image + '" alt="drinks">';
    contenu += "<h3>drinks</h3>";
    div.innerHTML = contenu;
    vCategories.appendChild(div);


    div = document.createElement('div');
    contenu = '<img src="assets/' + donnees.desserts[0].image + '" alt="Desserts">';
    contenu += "<h3>Desserts</h3>";
    div.innerHTML = contenu;
    vCategories.appendChild(div);


    div = document.createElement('div');
    contenu += '<img src="assets/' + donnees.menus[0].image + '" alt="menus">';
    contenu += "<h3>menus</h3>";
    div.innerHTML = contenu;
    vCategories.appendChild(div);


    div = document.createElement('div');
    contenu = '<img src="assets/' + donnees.happyMeal[0].image + '" alt="happymeal">';
    contenu += "<h3>happyMeal</h3>";
    div.innerHTML = contenu;
    vCategories.appendChild(div);


}

function creeCategorie() {
    Object.keys(donnees).forEach(function(categ){
        tabCategories.push(categ);
  })
}




/*

function afficherCategorie() {
    //vide les vignettes catégories
    vCategories.innerHTML = "";
    tabCategories.forEach(function(categ){
        //création d'une vignette
        let div = document.createElement('div');
        //categorie[0] pour appeler l'image du premier produit de la catégorie
        let contenu = '<img src="assets/images/categories/' + donnees.categ[0].image + '" alt="' + categ + '">';
        contenu += "<h3>" + categ + "</h3>";
        //rempli une nouvelle div avec le contenu
        div.innerHTML = contenu;
        vCategories.appendChild(div);
  })
}

*/