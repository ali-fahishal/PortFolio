# Portfolio — ALI Amadou Fahishal

Portfolio personnel de ALI Amadou Fahishal, électrotechnicien spécialisé en systèmes photovoltaïques et développeur Python/IA, basé à Lomé, Togo.

## Stack

- HTML5 / CSS3 / JavaScript vanilla (aucun framework)
- Bilingue FR/EN via classes CSS (`.lang-fr` / `.lang-en`)
- Fonts : Oswald + Poppins (Google Fonts)
- Images & vidéos hébergées sur Cloudinary

## Structure

```
mon-portfolio/
├── index.html        # Page principale
├── blog.html         # Page blog
├── article.html      # Template article
└── assets/
    ├── css/style.css # Styles
    └── js/main.js    # Interactions
```

## Lancer en local

```bash
python3 -m http.server 8080
```

Ouvrir : http://localhost:8080

## Assets

Toutes les images et vidéos sont hébergées sur Cloudinary (`res.cloudinary.com/dkkwfsxjq`). Aucun fichier media local — toujours utiliser des URLs Cloudinary avec `q_auto/f_auto`.
