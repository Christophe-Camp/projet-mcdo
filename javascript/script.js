//Général
let donnees = [];//tableau miroir du JSON
let backPage = "";
let newPage = "";
let btnRetour = document.getElementById('btnRetour');
let h1 = document.querySelector('h1');
let titrePage = document.getElementById('titrePage');

//Catégories
let tabCategories = [];
let pageCategories = document.getElementById('pageCategories');
let vCategories = document.getElementById('categories'); //vignette : là où on va déposer les vignettes des catégories

//Produits
let pageProduits = document.getElementById('pageProduits');
let vProduits = document.getElementById('produits'); //vignette : là où on va déposer les vignettes des produits

//Panier
let tabPanier = [];
let panierProduits = document.getElementById('panierProduits'); //ligne panier
let panierHeader = document.getElementById('panierHeader'); //header panier
let btnAbandon = document.getElementById('abandonner');
let btnValide = document.getElementById('valider');
let totalPanier = 0;
let nbPanier = 0;
let prixTotal = document.getElementById('prixTotal');
let nbTotal = document.getElementById('nbTotal');

//Menu
let tabMenu = [];
let pageMenu = document.getElementById('pageMenu');
let menuMain = document.getElementById('MenuMain');
let menuSide = document.getElementById('menuSide');
let menuDrink = document.getElementById('menuDrink');
let menuToy = document.getElementById('menuToy');

//Page paiement
let pagePaiement = document.getElementById('pagePaiement');



//JSON
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

//Fonction intégrée dans bouton retour
function fermOuv(pOuverte, pRetour){
    fermPage(pOuverte);
    ouvrPage(pRetour);
    titrePage.innerText = "";
    if (pRetour = "pageCategories"){
        h1.classList.remove('invisible');
        h1.classList.add('visible');
        newPage = pageCategories;
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
        let contenu = "<button class='img-categorie w-100 border-0 bg-transparent p-0' onclick='afficherProduit(" + '"' + categ + '"' + ")'>";
        contenu += '<img class="img-fluid w-100" src="assets/' + catTab[0].image + '" alt="' + categ + '">';
        contenu += "<h3>" + categ + "</h3>";
        contenu += "</button>";
        //rempli une nouvelle div avec le contenu
        div.innerHTML = contenu;
        vCategories.appendChild(div);
    })
    newPage = pageCategories;
}


function voirDetails(id){
    let detail = document.getElementById("detail-" + id);
    if (detail.classList.contains("d-block")){
        detail.classList.remove("d-block");
        detail.classList.add("d-none");
    }else if (detail.classList.contains("d-none")){
        detail.classList.remove("d-none");
        detail.classList.add("d-block");
    } 
}

function afficherProduit(prod) {
    backPage = pageCategories;
    fermPage(pageCategories);
    ouvrPage(pageProduits);

    // mise à jour du bouton retour
    let btn = document.createElement('div');
    btnRetour.innerHTML = "";
    btn.innerHTML = "<button id='retour' class='btn btn-success' onclick = 'fermOuv(newPage, backPage)'>Retour</button>";
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
                let contenu = "";
            if ((prod === "menus") || (prod === "happyMeal")){
                //contenu += "<button class='img-categorie w-100 border-0 bg-transparent p-0' onclick='afficherMenu(" + '"' + categ + '"' + "," + catTab[i].id + "," + "false" + ")'>";    
                contenu += "<button class='img-categorie w-100 border-0 bg-transparent p-0' onclick='ajoutProdPanier(" + '"' + categ + '"' + "," + catTab[i].id + "," + "false" + ")'>";
            }else{
                contenu += "<button class='img-categorie w-100 border-0 bg-transparent p-0' onclick='ajoutProdPanier(" + '"' + categ + '"' + "," + catTab[i].id + "," + "false" + ")'>";
            };

            contenu += '<img class="img-fluid w-100" src="assets/' + catTab[i].image + '" alt="' + catTab[i].name + '">';
            contenu += "<h3>" + catTab[i].name + "</h3>";
            contenu += "</button>";
            contenu += "<button class='rounded-circle info-btn' onclick='voirDetails(" + catTab[i].id + ")' class=''><p>i</p></button>";
            contenu += "<div id='detail-" + catTab[i].id + "' class='d-none'><p>" + catTab[i].description + "</p>";
            contenu += "<p>" + catTab[i].calories + " calories</p></div>";


            //rempli une nouvelle div avec le contenu
            div.innerHTML = contenu;
            vProduits.appendChild(div);
            }
        }
    })
    newPage = pageProduits;
}


//AfficherMenu


function afficherMenu(menu, choix) {
    backPage = pageProduits;
    fermPage(pageProduits);
    ouvrPage(pageMenu);

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
    menuMain.innerHTML = "";
    tabCategories.forEach(function(categ){

        let catTab = donnees[categ];
        //vérifie si on est sur la catégorie à filter
        if (categ === menu){ 
            for (let i = 0; i < catTab.length; i++){
            if (catTab[i].id === choix){

            //création d'une vignette avec le main
            let div = document.createElement('div');
            div.classList.add("col-4");
            //categorie[i] pour appeler chaque produit de la catégorie (vignette clicable)
            let contenu = '<img src="assets/' + catTab[i].image + '" alt="' + catTab[i].name + '">';
            contenu += "<h3>" + catTab[i].name + "</h3>";
            //rempli une nouvelle div avec le contenu
            div.innerHTML = contenu;
            menuMain.appendChild(div);
            }
/*
            //création des vignettes side
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
*/

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
    let prix = 0;
    let catTab = donnees[categ];
    let newProd = true;
    
    for (let i = 0; i < catTab.length; i++){
        if (catTab[i].id === idProd){
            //test si ajoute le prix
            if (!prixInclus){
                prix = catTab[i].price;
            }

            tabPanier.forEach(function(t) {
                if (t.id === idProd){
                    t.nb = t.nb + 1;
                    t.price = t.price + prix;
                    newProd = false;
                }
            });

            if (newProd){
                //création d'une ligne de tableau tabPanier
                let nouvLignePanier = {
                    id: catTab[i].id,
                    categorie : categ,
                    image: catTab[i].image,
                    name: catTab[i].name,
                    nb: 1,
                    price: prix,
                }
                tabPanier.push(nouvLignePanier);
            }
        }
    }
    //Calcul montant total panier
    totalPanier = totalPanier + prix;
    nbPanier = nbPanier + 1;
    //Ajouter nombre produit
    
    affichPanier();
}


function supprProdPanier(idProd){
    let k = 0;
    tabPanier.forEach(function(t) {
        if (t.id === idProd){
            if(t.nb === 1){
                //Calcul montant total panier
                totalPanier = totalPanier - t.price;
                nbPanier = nbPanier - 1;
                //Ajouter nombre produit
                tabPanier.splice(k , 1);
            }else{
                //Calcul montant total panier
                totalPanier = totalPanier - (t.price / t.nb);
                nbPanier = nbPanier - 1;
                //Ajouter nombre produit
                t.price = t.price - (t.price / t.nb);
                t.nb = t.nb - 1;
            }
        }
        k++;
    });


    
    affichPanier();
}



//fonction vide panier
function resetPanier(){
    totalPanier = 0;
    nbPanier = 0;
    prixTotal.innerText = "Prix";
    //panierHeader.innerHTML = "";
    panierProduits.innerHTML = "Votre commande est vide";
    nbTotal.innerText = "Cotre commande (0)";
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
    let contenu = '<td><img class="img-fluid text-center" style="height: 3.5rem;" src="assets/' + tabPanier[i].image + '" alt="' + tabPanier[i].name + '"></td>';  // rajouter du css je n'arrive pas a le faire correctement
    contenu += "<td><p>" + tabPanier[i].name +  " (" + tabPanier[i].nb + ") " + "</p></td>";
    contenu += "<td><button class='rounded-circle info-btn' onclick='supprProdPanier(" + tabPanier[i].id + ")' class=''><p>-</p></button></td>";
    contenu += "<td><button class='rounded-circle info-btn' onclick='ajoutProdPanier(" + '"' + tabPanier[i].categorie + '"' + "," + tabPanier[i].id + "," + false + ")' class=''><p>+</p></button></td>";
    contenu += "<td><p>" + tabPanier[i].price + " €</p></td>";
    //Ajouter boutons + et -
    //Afficher nombre produit
    //Afficher total panier



    //rempli une nouvelle div avec le contenu
    row.innerHTML = contenu;
    panierProduits.appendChild(row);
    prixTotal.innerText = "Total " + totalPanier + " €";
    nbTotal.innerText = "Votre commande (" + nbPanier + ")";
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
        //document.getElementById("valider").innerText = "Finaliser la commande";
        //document.getElementById("abandonner").innerText = "Annuler le paiement";
        newPage = pagePaiement;
    }
});
