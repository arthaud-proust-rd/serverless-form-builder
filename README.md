# POC serverless-form-builder

## Objectif général

Montrer que l'on peut créer un éditeur de dossier (médical par exemple) sans base de donnée, mais plutôt à base d'export de données (json + pdf)

## Objectif détaillé

- [x] 1. Remplir un formulaire sans avoir à se connecter
- [x] 2. Export/Import des données du dossier (champs des formulaires)
- [x] 3. Export/Import du dossier avec données et assets (pdfs par exemple)
- [x] 4. Export en un pdf global
- [ ] 5. Gestion de gros fichiers (>100 Mo)
- [ ] 6. Stockage dans localStorage

## Résultat de POC

### 1. Remplir un formulaire sans avoir à se connecter

Pas de problématique particulière à noter

### 2. Export/Import des données du dossier (champs des formulaires)

Faire attention à la validation/serialisation des données

### 3. Export/Import du dossier avec données et assets (pdfs par exemple)

Faire attention à la validation des fichiers (type, nom) etc

### 4. Export en un pdf global

Plusieurs librairies de génération de PDF existent, il nous faut pouvoir :

- générer un pdf avec les données du formulaire
- assembler plusieurs pdfs (documents annexes) pour former le pdf final

[Comparaison de librairies](https://dev.to/handdot/generate-a-pdf-in-js-summary-and-comparison-of-libraries-3k0p)

### Gestion de gros fichiers (>100 Mo)

### 6. Stockage dans localStorage
