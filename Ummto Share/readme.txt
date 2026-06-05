UMMTO Share — Plateforme de partage de ressources étudiantes
===============================================================

Description
-----------
UMMTO Share est un site web entièrement front-end (HTML5, CSS3, JavaScript)
permettant aux étudiants de l'Université Mouloud Mammeri de Tizi-Ouzou de
partager des ressources pédagogiques (cours, TD, examens, projets) selon
leur filière et leur année. Le site introduit un rôle "Helper" et un système
de progression par points : chaque contribution rapporte des points qui
font évoluer le niveau de l'étudiant (Newbie → Bronze → Argent → Or → Mentor).

Pages
-----
- index.html              : page d'accueil
- content/register.html   : inscription
- content/login.html      : connexion
- content/resources.html  : affichage et filtrage dynamique des ressources
- content/upload.html     : partager une nouvelle ressource (commande)
- content/leaderboard.html: classement des helpers

Technologies
------------
- HTML5 sémantique (header, nav, main, section, article, footer)
- CSS3 (responsive, flexbox, grid)
- JavaScript vanilla : DOM, localStorage, RegEx, événements

Contraintes respectées
----------------------
- Aucun framework, aucune bibliothèque externe
- HTML, CSS, JS dans des fichiers séparés
- Filtrage par filière côté client (1 seule page resources.html)
- Données stockées dans des tableaux JS (data.js) + localStorage
- Authentification simulée via une liste d'utilisateurs JS
- Validation des formulaires côté client avec expressions régulières
- Site responsive

Instructions d'utilisation
--------------------------
1. Ouvrir index.html dans un navigateur moderne.
2. S'inscrire via "Inscription", ou utiliser un compte de démo :
   - amine@ummto.dz / Helper2025  (Helper niveau Or)
   - lina@ummto.dz  / Etudiant1
   - sofiane@ummto.dz / Sofiane22 (Helper niveau Argent)
3. Parcourir et filtrer les ressources par filière, type ou mot-clé.
4. Publier ses propres ressources (+5 points par publication).
5. Cliquer "👍 Utile" sur une ressource pour récompenser son auteur (+2 pts).
6. Consulter le classement des helpers.

Membres du groupe
-----------------
- Nom Prénom 1
- Nom Prénom 2
- Nom Prénom 3
(à compléter)
