//alert("coucou");
//tableau miroir du JSON
let donnees = [];
let tabCategories = [];
let tabPanier = [];
let vProduits = document.getElementById('produits'); //vignette : là où on va déposer les vignettes des produits
let vCategories = document.getElementById('categories'); //vignette : là où on va déposer les vignettes des catégories
let panierProduits = document.getElementById('panierProduits'); //ligne panier
let panierHeader = document.getElementById('panierHeader'); //header panier
let pageCategories = document.getElementById('pageCategories');
let pageProduits = document.getElementById('pageProduits');
let pagePaiement = document.getElementById('pagePaiement');
let prixTotal = document.getElementById('prixTotal');
let btnRetour = document.getElementById('btnRetour');
let btnAbandon = document.getElementById('abandonner');
let btnValide = document.getElementById('valider');
let titrePage = document.getElementById('titrePage');
let h1 = document.querySelector('h1');
let backPage = "";
let newPage = "";


let totalPanier = 0;

fetch('mcdo.json')
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(data) {
    donnees = data;
    creeCategorie();
    afficherCategorie();
    //afficherProduit("sides");
  })
  .catch(function(error) {
    console.error("Erreur lors du chargement du fichier JSON :", error);
  });

  //Fonctions pour les modales

  //Fonction ouverture de modale
  //Besoin de créer classes d-none et d-block
function ouvrPage(page){
    if (page.classList.contains("d-none")){
        page.classList.remove("d-none");
        page.classList.add("d-block");
        //backPage = newPage;
        //newPage = page;
    }
}
  //Fonction fermeture de modale
  function fermPage(page){
    if (page.classList.contains("d-block")){
        page.classList.remove("d-block");
        page.classList.add("d-none");
    }
}

function fermOuv(pOuverte, pRetour){
    fermPage(pOuverte);
    ouvrPage(pRetour);
    titrePage.innerText = "";
    if (pRetour = "pageCategories"){
        h1.classList.remove('invisible');
        h1.classList.add('visible');
    } 
}

function afficherCategorie() {
    backPage = newPage;
    //vide les vignettes catégories
    vCategories.innerHTML = "";

    tabCategories.forEach(function(categ){

        let catTab = donnees[categ]
            
        //création d'une vignette clicable
        let div = document.createElement('div');
        div.classList.add("col-4");
        //categorie[0] pour appeler l'image du premier produit de la catégorie
        let contenu = "<button onclick='afficherProduit(" + '"' + categ + '"' + ")'>";
        contenu += '<img src="assets/' + catTab[0].image + '" alt="' + categ + '">';
        contenu += "<h3>" + categ + "</h3>";
        contenu += "</button>";
        //rempli une nouvelle div avec le contenu
        div.innerHTML = contenu;
        vCategories.appendChild(div);
    })
    newPage = pageCategories;
}


function voirDetails(id){
    console.log(id);
}

function afficherProduit(prod) {
    backPage = pageCategories;
    fermPage(pageCategories);
    ouvrPage(pageProduits);

    // mise à jour du bouton retour
    let btn = document.createElement('button');
    btnRetour.innerHTML = "";
    btn.innerHTML = "<button id='retour' class='btn' onclick = 'fermOuv(newPage, backPage)'>Retour</button>";
    btnRetour.appendChild(btn);
    titrePage.classList.remove('d-none');
    titrePage.classList.add('d-block');
    titrePage.innerText = prod;
    h1.classList.add('invisible');

    //vide les vignettes catégories
    vProduits.innerHTML = "";
    tabCategories.forEach(function(categ){

        let catTab = donnees[categ];
        //vérifie si on est sur la catégorie à filter
        if (categ === prod){
            for (let i = 0; i < catTab.length; i++){
            //création d'une vignette
            let div = document.createElement('div');
            div.classList.add("col-4");
            //categorie[i] pour appeler chaque produit de la catégorie (vignette clicable)

            let contenu = "<button onclick='ajoutProdPanier(" + '"' + categ + '"' + "," + catTab[i].id + "," + "false" + ")'>";
            contenu += '<img src="assets/' + catTab[i].image + '" alt="' + catTab[i].name + '">';
            contenu += "<h3>" + catTab[i].name + "</h3>";
            contenu += "</button>";
            contenu += "<button onclick='voirDetails(" + catTab[i].id + ")' class=''><p>Détails produits</p></button>";
            contenu += "<div class='d-block'><p>" + catTab[i].description + "</p>";
            contenu += "<p>" + catTab[i].calories + " calories</p></div>";


            //rempli une nouvelle div avec le contenu
            div.innerHTML = contenu;
            vProduits.appendChild(div);
            }
        }
    })
    newPage = pageProduits;
}


//pour stocker les catégories
function creeCategorie() {
    Object.keys(donnees).forEach(function(categ){
        tabCategories.push(categ);
  })
}


//fonction pour ajouter un produit au panier
function ajoutProdPanier(categ, idProd, prixInclus){
    let prix = 0
    let catTab = donnees[categ];
    for (let i = 0; i < catTab.length; i++){
        if (catTab[i].id === idProd){
        //test si ajoute le prix
        if (!prixInclus){
            prix = catTab[i].price;
        }
        //création d'une ligne de tableau tabPanier
        let nouvLignePanier = {
            id: catTab[i].id,
            image: catTab[i].image,
            name: catTab[i].name,
            //description: catTab[i].description,
            price: parseInt(prix * 100)/100,
        }
        tabPanier.push(nouvLignePanier);
        }
    }
    //Calcul montant total panier
    totalPanier = totalPanier + prix;
    //Ajouter nombre produit
    
    affichPanier();
}


//fonction vide panier
function resetPanier(){
    totalPanier = 0;
    //panierHeader.innerHTML = "";
    panierProduits.innerHTML = "";
    tabPanier = [];

}

//fonction pour ajouter les produits d'un menu au panier
function ajoutMenuPanier(categ, idMenu, idSide, idDrinks){
    //ajoute le menu au panier
    ajoutProdPanier(categ, idMenu, false);
    //ajoute le side du menu à prix 0 au panier
    ajoutProdPanier("side", idSide, true);
    //ajoute le drink du menu à prix 0 au panier
    ajoutProdPanier("drinks", idDrinks, true);
}


//fonction affichage du panier (base = table tabPanier)
function affichPanier(){
    panierProduits.innerHTML = "";
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
    contenu += "<td>" + tabPanier[i].name + "</td>";
    contenu += "<td>" + tabPanier[i].price + " €</td>";
    //Ajouter boutons + et -
    //Afficher nombre produit
    //Afficher total panier

    //rempli une nouvelle div avec le contenu
    row.innerHTML = contenu;
    panierProduits.appendChild(row);
    prixTotal.innerText = parseInt(totalPanier*100)/100 + " €";
    }
}

//Vider panier

btnAbandon.addEventListener("click", function(){
    resetPanier();
    fermOuv(newPage, pageCategories);
});

btnValide.addEventListener("click", function(){
    if (totalPanier > 0){
        fermOuv(newPage, pagePaiement);
    }
});
