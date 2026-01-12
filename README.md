# HackSchool — Prototype Jeu Éducatif (Local)

Prototype local (site web) pour un jeu éducatif simulant un bureau/OS afin d'apprendre des concepts de sécurité et d'investigation.

Contenu important:
- `index.html` : page principale (bureau simulé)
- `css/desktop.css` : styles
- `js/desktop.js` : logique (fenêtres, terminal, exploration, stockage)
- `data/users.json` : données fictives (profils, filesystem)
- `assets/icons/` : icônes SVG utilisées sur le bureau

Usage local:
1. Ouvrir `index.html` dans un navigateur moderne (Chrome, Edge, Firefox).
2. Double-cliquer sur les icônes pour ouvrir les applications (Navigateur, Explorateur, Terminal, etc.).

Notes techniques:
- Toutes les données sont fictives et stockées localement. Aucune action réseau n'est effectuée en dehors du chargement local.
- Le projet est conçu pour un usage pédagogique; il ne fournit pas d'instructions pour attaquer des systèmes réels.

Fonctionnalités ajoutées récemment:
- Icônes et textures améliorées.
- Redimensionnement des fenêtres, minimise/maximise, barre des tâches fonctionnelle.
- Sauvegarde de l'état du bureau dans `localStorage` (positions, tailles, fenêtres ouvertes).
- Visualiseur de texte éditable avec sauvegarde locale (sauvegardé en mémoire et `localStorage`).

Prochaines étapes recommandées:
- Ajouter pack d'icônes et crédits (licences MIT/CC0 recommandées).
- Ajouter scénario d'apprentissage pas-à-pas et écran pédagogique au démarrage.
- Ajouter tests d'accessibilité, et sauvegarde/extraction des scénarios (format JSON).

Licence: prototype éducatif — vérifier licences des ressources ajoutées avant distribution.
