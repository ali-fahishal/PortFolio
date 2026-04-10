# CLAUDE.md — Portfolio ALI Amadou Fahishal

## Projet

Portfolio personnel vanilla HTML/CSS/JS. Pas de framework, pas de bundler, pas de dépendances npm.

## Règles importantes

### Assets media
- Toutes les images et vidéos sont hébergées sur **Cloudinary** (`res.cloudinary.com/dkkwfsxjq`)
- Toujours utiliser `q_auto/f_auto` dans les URLs Cloudinary
- **Ne jamais** référencer `assets/images/` ou `assets/videos/` — ces dossiers sont vides

### Bilingue FR/EN
- Le système de langue repose sur les classes CSS `.lang-fr` / `.lang-en` sur le `<body>`
- Chaque texte bilingue utilise `<span class="fr">...</span>` et `<span class="en">...</span>`
- La bascule est gérée dans `assets/js/main.js` via `localStorage`

### Serveur local
```bash
python3 -m http.server 8080
```
Le port 8080 est déjà utilisé en permanence — si le serveur tourne déjà, ouvrir directement http://localhost:8080.

## Structure des fichiers

- `index.html` — page principale (hero, about, projets, terrain, 3D, contact)
- `blog.html` — page blog
- `article.html` — template article
- `assets/css/style.css` — CSS monolithique organisé en sections commentées
- `assets/js/main.js` — JS organisé en IIFEs (langue, scroll, hamburger, lightbox, lazy video, nav active)
