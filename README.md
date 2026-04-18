# 🍽️ Template Restaurant & Bar — Guide de personnalisation

Template statique HTML/CSS/JS haute performance, optimisé SEO local, conçu pour être vendu et dupliqué facilement pour chaque nouveau client.

---

## 🚀 Démarrage rapide

1. **Cloner / dupliquer** ce dépôt GitHub
2. **Ouvrir `config.json`** et remplacer les données par celles du client
3. **Remplacer les images** dans le dossier `images/`
4. **Pousser sur GitHub** → activer GitHub Pages (Settings → Pages → branch `main`)
5. ✅ Le site est en ligne !

---

## 📁 Structure des fichiers

```
restaurant-template/
├── index.html          ← Structure HTML (ne pas modifier sauf structure)
├── style.css           ← Tout le style (couleurs via variables CSS)
├── app.js              ← Moteur JS qui lit config.json et peuple le site
├── config.json         ⭐ FICHIER PRINCIPAL À MODIFIER PAR CLIENT
├── images/
│   ├── hero.jpg        ← Photo d'en-tête (recommandé : 1920×1080px)
│   ├── about.jpg       ← Photo "À propos" principal (recommandé : 800×1000px)
│   ├── about2.jpg      ← Photo "À propos" secondaire (recommandé : 400×500px)
│   ├── gallery-1.jpg   ← Photos galerie (recommandé : 800×600px)
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   ├── gallery-5.jpg
│   └── gallery-6.jpg
└── README.md
```

---

## ⚙️ Personnalisation via `config.json`

Tout le contenu du site est contrôlé par **un seul fichier** : `config.json`.

### 1. Informations du restaurant

```json
"restaurant": {
  "nom": "Le Nom du Restaurant",
  "slogan": "Votre accroche en quelques mots",
  "type": "Restaurant & Bar",
  "description_courte": "Texte d'introduction (1-2 phrases, riche en mots-clés)",
  "description_longue": "Texte long pour la section À propos",
  "histoire": "L'histoire du restaurant / du fondateur"
}
```

### 2. Localisation & contact

```json
"localisation": {
  "ville": "Lyon",
  "quartier": "Vieux-Lyon",
  "adresse": "12 Rue du Bœuf",
  "code_postal": "69005",
  "lieux_proches": ["Place Bellecour", "Parc de la Tête d'Or"],
  "telephone": "04 72 12 34 56",
  "telephone_affiche": "04 72 12 34 56",
  "email": "contact@monrestaurant.fr",
  "google_maps_embed": "URL d'intégration Google Maps (iframe src)",
  "google_maps_lien": "https://maps.google.com/?q=...",
  "latitude": "45.7640",
  "longitude": "4.8296"
}
```

> 💡 **Comment obtenir l'URL Google Maps embed ?**
> 1. Aller sur maps.google.fr
> 2. Chercher l'adresse
> 3. Cliquer "Partager" → "Intégrer une carte"
> 4. Copier le `src="..."` de l'iframe

### 3. Horaires

```json
"horaires": {
  "lundi": { "ouvert": false, "heures": "Fermé" },
  "mardi": { "ouvert": true, "heures": "12h00 – 14h30 / 19h00 – 22h30" }
}
```

### 4. Carte / Menu

```json
"menu": {
  "sections": [
    {
      "titre": "Entrées",
      "emoji": "🌿",
      "plats": [
        { "nom": "Nom du plat", "description": "Description courte", "prix": "12€" }
      ]
    }
  ]
}
```

### 5. SEO (TRÈS IMPORTANT)

```json
"seo": {
  "meta_titre": "Nom Restaurant – Restaurant Ville Quartier | Type de cuisine",
  "meta_description": "Description naturelle avec ville, quartier, spécialités. ☎ Téléphone",
  "mots_cles": "restaurant ville, restaurant quartier, type cuisine ville"
}
```

> 💡 **Conseils SEO local :**
> - Inclure la ville ET le quartier dans le titre
> - Mentionner 2-3 lieux proches connus
> - Mettre le numéro de téléphone dans la meta_description
> - Longueur méta titre : 55-65 caractères
> - Longueur méta description : 150-160 caractères

### 6. Couleurs & design

```json
"design": {
  "couleur_principale": "#1a1209",   ← Couleur sombre principale
  "couleur_accent": "#c8922a",       ← Couleur d'accentuation (boutons, titres)
  "couleur_accent2": "#8b1a1a",      ← Couleur secondaire
  "couleur_texte": "#2c1810",        ← Couleur du texte
  "couleur_fond": "#faf6f0",         ← Fond clair des sections
  "couleur_fond2": "#f0e8d8",        ← Fond légèrement plus coloré
  "font_titre": "Playfair Display",  ← Police des titres (Google Fonts)
  "font_corps": "Lato"               ← Police du texte courant (Google Fonts)
}
```

> 💡 **Changer les polices :**
> 1. Choisir sur [fonts.google.com](https://fonts.google.com)
> 2. Mettre le nom exact dans `font_titre` / `font_corps`
> 3. Mettre à jour le lien `<link>` Google Fonts dans `index.html` (ligne ~10)

### 7. Photos de galerie

```json
"photos": [
  { "src": "images/gallery-1.jpg", "alt": "Description de la photo pour le SEO" }
]
```

> 💡 **Optimisation images :**
> - Utiliser [Squoosh.app](https://squoosh.app) pour compresser (WebP recommandé)
> - Hero : 1920×1080px, < 300ko
> - Galerie : 800×600px, < 150ko chacune
> - Nommer les fichiers de façon descriptive : `salle-restaurant-lyon.jpg`

### 8. Avis clients

```json
"avis": {
  "google_rating": "4.7",
  "nombre_avis": "312",
  "temoignages": [
    { "auteur": "Marie L.", "note": 5, "texte": "Excellent restaurant..." }
  ]
}
```

---

## 🎨 Personnalisation CSS avancée

Si vous avez besoin de modifications plus poussées, toutes les variables CSS sont dans `style.css` en haut du fichier :

```css
:root {
  --couleur-principale: #1a1209;
  --couleur-accent: #c8922a;
  /* ... */
}
```

---

## 📊 Checklist avant livraison client

### Contenu
- [ ] `config.json` rempli avec les vraies données du client
- [ ] Toutes les photos remplacées et optimisées
- [ ] Alts des images personnalisées (SEO)
- [ ] Horaires corrects
- [ ] Menu à jour

### SEO
- [ ] Meta titre optimisé (55-65 caractères)
- [ ] Meta description avec téléphone (150-160 caractères)
- [ ] URL Google Maps embed correcte
- [ ] Latitude/longitude correctes (pour le schema JSON-LD)
- [ ] Lieux proches pertinents renseignés

### Technique
- [ ] Numéro de téléphone correct (liens `tel:`)
- [ ] Lien Google Maps itinéraire correct
- [ ] Emails corrects
- [ ] Réseaux sociaux corrects (ou supprimer les champs vides)

### Test
- [ ] Tester sur mobile (Chrome DevTools)
- [ ] Vérifier le badge "Ouvert maintenant" selon l'heure
- [ ] Cliquer sur tous les boutons CTA
- [ ] Valider avec [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Valider avec [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🌐 Mise en ligne gratuite avec GitHub Pages

1. Créer un nouveau dépôt GitHub (public)
2. Pousser les fichiers
3. Aller dans **Settings** → **Pages**
4. Source : `Deploy from a branch` → `main` → `/ (root)`
5. Le site sera disponible à : `https://votre-nom.github.io/nom-depot/`

### Domaine personnalisé (optionnel)
1. Dans Settings → Pages → Custom domain : entrer `www.monrestaurant.fr`
2. Chez le registrar DNS, ajouter un CNAME : `www` → `votre-nom.github.io`
3. Cocher "Enforce HTTPS"

---

## 📈 Connecter Google Business Profile

Pour maximiser le référencement local :

1. Créer/revendiquer le profil sur [business.google.com](https://business.google.com)
2. S'assurer que **Nom, Adresse, Téléphone** sont **identiques** au site
3. Ajouter le lien du site web dans le profil Google Business
4. Catégorie principale : "Restaurant" + catégories secondaires pertinentes
5. Ajouter les mêmes photos qu'on le site

---

## 🔧 Personnalisations fréquentes

### Changer la couleur d'accentuation
Dans `config.json` → `design.couleur_accent` : ex. `"#e63946"` pour rouge

### Ajouter une section "Événements"
Dupliquer une section dans `index.html` et ajouter les données dans `config.json`

### Désactiver la galerie lightbox
Dans `app.js`, supprimer ou commenter `initLightbox()`

### Ajouter plus de plats
Dans `config.json` → `menu.sections[].plats`, ajouter des objets `{ "nom", "description", "prix" }`

---

## 📞 Support

Pour toute question sur la personnalisation, consulter la documentation ou ouvrir une issue GitHub.

---

*Template créé pour une utilisation commerciale. Duplication autorisée par client.*
