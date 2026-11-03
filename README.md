# NovaTech – Sales Dashboard

🇬🇧 English · [🇫🇷 Français](#novatech--tableau-de-bord-commercial)

A web dashboard to analyse the first year of sales of **NovaTech**, a high-tech store (smartphones, computers, TVs, audio, accessories).

The project started from a very basic sales table. I turned it into a real dashboard: modern design, key performance indicators, charts, and search and filtering tools.

## Preview

- Top bar with the logo, the search field and an avatar
- 4 KPI cards
- 3 charts and a top products list
- Sales table with filters, sorting and a reset button

## Technologies

- HTML5 / CSS3 (grid, flexbox, CSS variables)
- JavaScript (no framework)
- [Chart.js](https://www.chartjs.org/) for the charts
- Inter font (Google Fonts)

## Running the project

`sales.json` is loaded with `fetch`, so a small local server is required (opening `index.html` directly will not work):

1. Open the folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html`, then "Open with Live Server"

An internet connection is needed to load Chart.js and the font.

## Structure

```
sales-dashboard/
├── index.html   # page structure
├── style.css    # design
├── app.js       # calculations, charts, filters
└── sales.json   # sales data (24 rows, January to April 2026)
```

## What I did

### Part 1 – Design (missions 1 to 7)
- Light grey page background `#f0f0f0`
- Table at 90% of the available width, centred, 32 px margin above, white background, soft shadow and rounded corners
- Table headers in `#dddddd`
- Row hover in `#dbeafe`, going back to the original colour when the mouse leaves
- Professional font (Inter)
- More relevant title, grey banner removed
- "NovaTech" logo at the top left
- Style inspired by a finance dashboard: rounded white cards, pink/purple/coral gradient and pastel colours

### Level 2 – Indicators (missions 11 to 15)
Four cards placed above the table:

| Indicator | Calculation |
|---|---|
| Number of sales | number of rows |
| Total quantity sold | sum of `quantity` |
| Total revenue | sum of `price × quantity`, in € with 2 decimals |
| Average price per unit | average of the `price` of the rows (not revenue ÷ number of sales) |

### Level 3 – Charts (missions 16 to 19)
- Chart.js added in the `<head>`
- **Revenue by category**: bar chart (`<canvas id="category-chart">`), computed from `sales.json`
- **Revenue by month**: line chart
- **Quantity sold by category**: doughnut chart with legend and percentages
- Bonus: top 5 products by revenue

### Level 4 – Interactivity (missions 20 to 24)
- **Search** by product name, case-insensitive, at the centre of the top bar
- **Category filter**: All, Smartphones, Accessories, Computers, TVs, Audio
- **Price sorting**: original order, ascending, descending
- Search, filter and sorting work **at the same time**
- Message "Aucune vente ne correspond à votre recherche." when nothing matches
- **Reset filters** button

The indicators and charts update according to the active filters.

## What I learned

- Handling JSON data with `fetch`, `filter`, `sort` and `reduce`
- Updating the DOM dynamically
- Creating and redrawing charts with Chart.js
- Building a responsive layout with CSS grid and flexbox
- Versioning a project with Git and GitHub

---

# NovaTech – Tableau de bord commercial

[🇬🇧 English](#novatech--sales-dashboard) · 🇫🇷 Français

Tableau de bord web pour analyser la première année de ventes de **NovaTech**, un magasin de produits high-tech (smartphones, informatique, téléviseurs, audio, accessoires).

Le projet part d'un tableau de ventes très basique. Je l'ai transformé en vrai dashboard : design moderne, indicateurs clés, graphiques et outils de recherche et de filtrage.

## Aperçu

- Barre du haut avec le logo, la recherche et un avatar
- 4 cartes d'indicateurs (KPI)
- 3 graphiques et un top des produits
- Tableau des ventes avec filtres, tri et bouton de réinitialisation

## Technologies

- HTML5 / CSS3 (grid, flexbox, variables CSS)
- JavaScript (sans framework)
- [Chart.js](https://www.chartjs.org/) pour les graphiques
- Police Inter (Google Fonts)

## Lancer le projet

Le fichier `sales.json` est chargé avec `fetch`, il faut donc un petit serveur local (ouvrir `index.html` directement ne fonctionne pas) :

1. Ouvrir le dossier dans VS Code
2. Installer l'extension **Live Server**
3. Clic droit sur `index.html` puis « Open with Live Server »

Une connexion internet est nécessaire pour charger Chart.js et la police.

## Structure

```
sales-dashboard/
├── index.html   # structure de la page
├── style.css    # design
├── app.js       # calculs, graphiques, filtres
└── sales.json   # données des ventes (24 lignes, janvier à avril 2026)
```

## Ce que j'ai réalisé

### Partie 1 – Design (missions 1 à 7)
- Fond de page gris clair `#f0f0f0`
- Tableau sur 90 % de la largeur, centré, marge de 32 px au-dessus, fond blanc, ombre légère et coins arrondis
- En-têtes du tableau en `#dddddd`
- Survol d'une ligne en `#dbeafe`, avec retour à la couleur initiale à la sortie
- Police professionnelle (Inter)
- Titre plus pertinent, bandeau gris supprimé
- Logo « NovaTech » en haut à gauche
- Style inspiré d'un dashboard financier : cartes blanches arrondies, dégradé rose/violet/corail et couleurs pastel

### Niveau 2 – Indicateurs (missions 11 à 15)
Quatre cartes placées au-dessus du tableau :

| Indicateur | Calcul |
|---|---|
| Nombre de ventes | nombre de lignes |
| Quantité totale vendue | somme des `quantity` |
| Chiffre d'affaires total | somme de `price × quantity`, en € avec 2 décimales |
| Prix moyen par unité | moyenne des `price` des lignes (et non CA ÷ nombre de ventes) |

### Niveau 3 – Graphiques (missions 16 à 19)
- Chart.js ajouté dans le `<head>`
- **Chiffre d'affaires par catégorie** : graphique en barres (`<canvas id="category-chart">`), calculé à partir de `sales.json`
- **Chiffre d'affaires par mois** : courbe
- **Quantité vendue par catégorie** : anneau avec légende et pourcentages
- Bonus : top 5 des produits par chiffre d'affaires

### Niveau 4 – Interactivité (missions 20 à 24)
- **Recherche** par nom de produit, insensible à la casse, au centre de la barre du haut
- **Filtre par catégorie** : Toutes, Smartphones, Accessoires, Informatique, Téléviseurs, Audio
- **Tri par prix** : ordre initial, croissant, décroissant
- La recherche, le filtre et le tri fonctionnent **en même temps**
- Message « Aucune vente ne correspond à votre recherche. » quand il n'y a aucun résultat
- Bouton **Réinitialiser les filtres**

Les indicateurs et les graphiques se mettent à jour selon les filtres actifs.

## Ce que j'ai appris

- Manipuler des données JSON avec `fetch`, `filter`, `sort` et `reduce`
- Mettre à jour dynamiquement le DOM
- Créer et redessiner des graphiques avec Chart.js
- Construire une mise en page responsive avec CSS grid et flexbox
- Versionner un projet avec Git et GitHub
