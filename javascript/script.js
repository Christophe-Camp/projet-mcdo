//alert("coucou");
//tableau miroir du JSON
let donnees = [];
let tabCategories = [];
let tabPanier = [];
let vProduits = document.getElementById('produits'); //vignette : là où on va déposer les vignettes des produits
let vCategories = document.getElementById('categories'); //vignette : là où on va déposer les vignettes des produits
let panierProduits = document.getElementById('panier-produits'); //vignette : là où on va déposer les vignettes des produits
let panierHeader = document.getElementById('panier-header'); //vignette : là où on va déposer les vignettes des produits


fetch('mcdo.json')
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(data) {
    donnees = data;
    creeCategorie();
    afficherCategorie();
    afficherProduit("sides");
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

    tabCategories.forEach(function(categ){

    let catTab = donnees[categ]
        
    //création d'une vignette
    let div = document.createElement('div');
    //categorie[0] pour appeler l'image du premier produit de la catégorie
    let contenu = '<img src="assets/' + catTab[0].image + '" alt="' + categ + '">';
    contenu += "<h3>'" + categ + "'</h3>";
    //rempli une nouvelle div avec le contenu
    div.innerHTML = contenu;
    vCategories.appendChild(div);


})
}

function afficherProduit(prod) {
    //vide les vignettes catégories
    vProduits.innerHTML = "";

    tabCategories.forEach(function(categ){

        let catTab = donnees[categ]

        //vérifie si on est sur la catégorie à filter
        if (categ === prod){
            for (let i = 0; i < catTab.length; i++){
            //création d'une vignette
            let div = document.createElement('div');
            //categorie[i] pour appeler chaque produit de la catégorie
            let contenu = '<img src="assets/' + catTab[i].image + '" alt="' + catTab[i].name + '">';
            contenu += "<h3>'" + catTab[i].name + "'</h3>";
            //rempli une nouvelle div avec le contenu
            div.innerHTML = contenu;
            vProduits.appendChild(div);
            }
        }
    })
}


//pour stocker les catégories
function creeCategorie() {
    Object.keys(donnees).forEach(function(categ){
        tabCategories.push(categ);
  })
}


//fonction pour ajouter un produit au panier
function ajoutProdPanier(categ, idProd){
    
    let catTab = donnees[categ]
    for (let i = 0; i < catTab.length; i++){
    if (catTab[i].id = idProd)
    //création d'une ligne de tableau tabPanier
    
    


    }
}


//fonction pour ajouter un produit au panier
function ajoutMenuPanier(menu, side, drink){
    
}


//fonction affichage du panier (base = table tabPanier)
function affichPanier(){

    if (tabPanier.length === 0){
        let headRow = document.createElement('tr');
  
        let headContenu = "<th colspan='2'>Produit</th>";
        headContenu += "<th>Description</th>";
        headContenu += "<th>Prix</th>";
        //rempli une nouvelle div avec le contenu
        headRow.innerHTML = headContenu;
        panierHeader.appendChild(headRow);
    };
    
    for (let i = 0; i < tabPanier.length; i++){
    //création d'une ligne de tableau
    let row = document.createElement('tr');
    //categorie[i] pour appeler chaque produit de la catégorie
    let contenu = '<td><img src="assets/' + tabPanier[i].image + '" alt="' + tabPanier[i].name + '"></td>';
    contenu += "<td>'" + tabPanier[i].name + "'</td>";
    contenu += "<td>'" + tabPanier[i].description + "'</td>";
    contenu += "<td>'" + tabPanier[i].price + "'</td>";
    //rempli une nouvelle div avec le contenu
    row.innerHTML = contenu;
    panierProduits.appendChild(row);
    }
}

/*

//fonction pour ajouter un produit au panier
function ajoutProdPanier(categ, prod){
    
    
    
    if (panierHeader.innerHTML === ""){
        let headRow = document.createElement('tr');
  
        let headContenu = "<th colspan='2'>Produit</th>";
        headContenu += "<th>Description</th>";
        headContenu += "<th>Prix</th>";
        //rempli une nouvelle div avec le contenu
        headRow.innerHTML = headContenu;
        panierHeader.appendChild(headRow);
    };
    
    let catTab = donnees[categ]
    for (let i = 0; i < catTab.length; i++){
    //création d'une ligne de tableau
    let row = document.createElement('tr');
    //categorie[i] pour appeler chaque produit de la catégorie
    let contenu = '<td><img src="assets/' + catTab[i].image + '" alt="' + catTab[i].name + '"></td>';
    contenu += "<td>'" + catTab[i].name + "'</td>";
    contenu += "<td>'" + catTab[i].description + "'</td>";
    contenu += "<td>'" + catTab[i].price + "'</td>";
    //rempli une nouvelle div avec le contenu
    row.innerHTML = contenu;
    panierProduits.appendChild(row);
    }
}

*/