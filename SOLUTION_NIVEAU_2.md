# 🎯 Solution Complète - Niveau 2 : Follow the Money

## 📋 Objectif Principal
Infiltrer les comptes bancaires offshore de Julien Dupuis et transférer **450.000 €** vers votre compte de récupération.

---

## ⏱️ Temps Limite
**30 minutes** avant que le système ne se verrouille définitivement.

---

## 🔍 ÉTAPE 1 : Déverrouiller l'Archive Financière

### 🎯 Objectif
Trouver le mot de passe de l'archive `Finance_2024.zip`

### 📝 Actions à effectuer

1. **Ouvrir l'application "Fichiers"** (📂)
   - Vous verrez plusieurs fichiers dont `Finance_2024.zip` (verrouillé)

2. **Lire le fichier "todo_urgent.txt"**
   - Cliquer sur `todo_urgent.txt`
   - Note importante : "Acheter croquettes pour Mistigri"
   - ⚠️ Retenir le nom du chat : **Mistigri**

3. **Ouvrir le Terminal** (💻)
   - Taper : `sort Photos_Vacances`
   - Cette commande va trier le dossier chaos en sous-dossiers organisés
   - Un nouveau dossier `Mariage_Trie` sera créé

4. **Explorer les photos triées**
   - Retourner dans "Fichiers"
   - Ouvrir `Mariage_Trie` → `Jour 1 - Cérémonie`
   - Chercher la photo d'alliance (image 28 : `IMG_20180512_28.jpg`)

5. **Scanner les métadonnées EXIF**
   - Ouvrir la photo de l'alliance
   - Cliquer sur **"LANCER L'ANALYSE FORENSIQUE"**
   - ✅ Date de prise de vue révélée : **12/05/2018**

6. **Déverrouiller l'archive**
   - Retourner dans "Fichiers"
   - Cliquer sur `Finance_2024.zip`
   - Entrer le mot de passe : **12052018** (format JJMMAAAA)
   - ✅ Archive déchiffrée ! Un nouveau fichier PDF apparaît

---

## 🏦 ÉTAPE 2 : Récupérer l'Identifiant Bancaire

### 🎯 Objectif
Extraire l'ID client NeoBank du document PDF

### 📝 Actions

1. **Ouvrir le PDF extrait**
   - Dans "Fichiers", cliquer sur `Relevé_NeoBank.pdf`

2. **Noter l'ID Client**
   - En haut à droite du relevé (surligné en jaune)
   - ✅ **ID Client : 8842901**

---

## 📱 ÉTAPE 3 : Intercepter le Code 2FA

### 🎯 Objectif
Déverrouiller SyncMobile pour accéder aux SMS de validation

### 📝 Actions

1. **Lire les emails importants**
   - Ouvrir l'application **Mail** (📧)
   - Dossier **Réception**, lire l'email du **Service IT** :
     > "Votre mot de passe SyncMobile doit suivre le format :  
     > **[Prénom du témoin de mariage] + [Année du voyage à Bali]**"
   
2. **Trouver les informations manquantes**
   
   **Année du voyage à Bali :**
   - Chercher l'email "Confirmation Bali" dans la boîte de réception
   - ✅ Voyage confirmé pour **2023**

   **Prénom du témoin (PIÈGE !) :**
   - ⚠️ Ne PAS utiliser "Thomas" (le vrai témoin vu dans les photos)
   - Lire le **chat avec Marc (IT)** après avoir ouvert SyncMobile
   - Marc dit : *"j'ai mis le nom du chat"*
   - ✅ Le mot de passe utilise **Mistigri** (le chat !)

3. **Calculer le mot de passe SyncMobile**
   - Format : Nom du chat + Année actuelle (2025)
   - ✅ Mot de passe : **Mistigri2025**

4. **Déverrouiller SyncMobile**
   - Ouvrir l'app **SyncMobile** (📱)
   - Entrer : **Mistigri2025**
   - ✅ Accès déverrouillé !

5. **Ouvrir la conversation "NeoBank Auth"**
   - Vous verrez des anciens codes de validation
   - ⚠️ NE PAS utiliser ces codes ! Ils sont expirés

---

## 💰 ÉTAPE 4 : Accéder à la Banque et Effectuer le Virement

### 🎯 Objectif
Se connecter à NeoBank et transférer les fonds offshore

### 📝 Actions

1. **Ouvrir le Navigateur** (🌐)
   - Cliquer sur l'icône **NeoBank** (🏦)

2. **Première connexion**
   - Entrer l'ID Client : **8842901**
   - Cliquer sur **Connexion**

3. **Validation 2FA**
   - La banque envoie un nouveau code SMS
   - ⏳ Attendre 2-3 secondes
   - Un **nouveau message** arrive dans SyncMobile !
   - Retourner dans SyncMobile → Conversation "NeoBank Auth"
   - ✅ Nouveau code : **892 441**

4. **Valider le code 2FA**
   - Retourner dans le Navigateur
   - Entrer le code : **892 441** (avec ou sans espace)
   - ✅ Accès accordé au tableau de bord !

5. **Préparer le virement**
   - Vous voyez 3 comptes :
     - Compte Courant : 2.450 €
     - Livret A : 150 €
     - **Compte Offshore (Cayman) : 450.000 €** 🎯
   
   - Noter l'IBAN du compte offshore (source) :
     - ✅ **FR76 4040 1234 5678 9000**

6. **Trouver votre IBAN de récupération**
   - **Option 1 :** Regarder le panneau "Mission HUD" à droite
     - En bas du panneau, section "Votre IBAN de Récupération"
     - ✅ **FR76 0000 1111 2222 3333**
   
   - **Option 2 (Bonus) :** Via le Terminal
     ```
     netscan
     connect 192.168.1.55
     pass 2018sophie
     ls
     cat iban_secours.txt
     ```

7. **Effectuer le virement final**
   - Cliquer sur **"EFFECTUER VIREMENT"**
   - Remplir le formulaire :
     - **IBAN Source** : FR76 4040 1234 5678 9000 (compte offshore)
     - **IBAN Bénéficiaire** : FR76 0000 1111 2222 3333 (votre compte)
     - **Montant** : 450000 (pré-rempli)
   
   - Cliquer sur **"VALIDER LE VIREMENT"**

8. **🎉 VICTOIRE !**
   - Mission accomplie ! Les fonds sont sécurisés.

---

## ⚠️ PIÈGES À ÉVITER

### ❌ Piège #1 : Les spams
- **Ne JAMAIS cliquer** sur les emails de spam (loterie, phishing, etc.)
- Cliquer sur le lien piégé dans l'email "VOUS AVEZ GAGNÉ !!" déclenche un ransomware qui vide les comptes → **GAME OVER**

### ❌ Piège #2 : L'exe malveillant
- Ne PAS ouvrir `bitcoin_wallet.exe` dans les fichiers
- C'est un virus qui déclenche une séquence d'antivirus

### ❌ Piège #3 : Le témoin de mariage
- Le mot de passe n'est PAS "Thomas2023" (même si Thomas est le témoin)
- L'indice de Marc est crucial : c'est le nom du **chat**, pas le témoin !

### ❌ Piège #4 : Les anciens codes 2FA
- Les codes SMS visibles au début dans SyncMobile sont **expirés**
- Il faut attendre le **nouveau code** envoyé après la connexion bancaire

### ❌ Piège #5 : Mauvais IBAN
- Ne pas confondre l'IBAN source (offshore) et destination (récupération)
- Vérifier que les deux IBAN sont corrects avant de valider

---

## 🗺️ CHEMIN CRITIQUE (Solution Rapide)

1. **Fichiers** → `todo_urgent.txt` (noter "Mistigri")
2. **Terminal** → `sort Photos_Vacances`
3. **Fichiers** → `Mariage_Trie/Jour 1/Photo 28` → Scanner métadonnées (12/05/2018)
4. **Fichiers** → `Finance_2024.zip` → Mot de passe: **12052018**
5. **Fichiers** → `Relevé_NeoBank.pdf` (noter ID: **8842901**)
6. **Mail** → Lire "Service IT" + "Confirmation Bali" (2023)
7. **SyncMobile** → Mot de passe: **Mistigri2025**
8. **Navigateur** → NeoBank → ID: **8842901**
9. **SyncMobile** → Noter nouveau code: **892 441**
10. **Navigateur** → Code 2FA: **892 441**
11. **Navigateur** → Virement :
    - Source: **FR76 4040 1234 5678 9000**
    - Destination: **FR76 0000 1111 2222 3333**
    - Montant: **450000**
12. **✅ VICTOIRE !**

---

## 💡 ASTUCES & CONSEILS

### ⏱️ Gestion du temps
- Temps total disponible : **30 minutes**
- Temps moyen de résolution : **15-20 minutes**
- Restez calme et méthodique !

### 🔍 Exploration
- Lisez **TOUS** les emails, même ceux qui semblent anodins
- Les fausses pistes sont intentionnelles (photos corrompues, métadonnées incohérentes)
- Privilégiez les photos avec des sujets identifiés (alliance, témoin, etc.)

### 🛡️ Sécurité
- **NE TOUCHEZ PAS** aux éléments suspects (spams, exe)
- Si vous déclenchez le virus par erreur, rechargez la page

### 📝 Prise de notes
Notez au fur et à mesure :
- ✅ Nom du chat : Mistigri
- ✅ Date mariage : 12/05/2018
- ✅ Année Bali : 2023
- ✅ ID Banque : 8842901
- ✅ Code 2FA : 892 441
- ✅ IBAN Source : FR76 4040 1234 5678 9000
- ✅ IBAN Destination : FR76 0000 1111 2222 3333

---

## 🎮 SYSTÈME D'INDICES (Mode Normal)

Si vous êtes bloqué, utilisez le panneau **"Indices"** à droite :

### Indice 1 (Petit)
- Donne une direction générale
- Exemple : "Le fichier est verrouillé par une date"

### Indice 2 (Moyen)
- Donne des instructions plus précises
- Exemple : "Triez les photos avec le Terminal"

### Indice 3 (Solution)
- Révèle la solution complète de l'étape en cours
- Exemple : "Le mot de passe est 12052018"

⚠️ Les indices s'adaptent à votre progression !

---

## 🏆 CRITÈRES DE RÉUSSITE

- ✅ Archive déchiffrée
- ✅ ID bancaire récupéré
- ✅ Code 2FA intercepté
- ✅ Virement de **450.000 €** effectué vers le bon compte
- ✅ Mission terminée en moins de 30 minutes

---

## 🎓 COMPÉTENCES OSINT UTILISÉES

Ce niveau vous entraîne sur :
- 📸 **Analyse EXIF** (métadonnées de photos)
- 📧 **Ingénierie sociale** (corrélation d'informations)
- 💻 **Terminal Linux** (commandes basiques)
- 🔐 **2FA Bypass** (interception de codes)
- 🕵️ **Reconnaissance** (exploration méthodique)
- 🧠 **Pensée critique** (distinguer vrais indices et pièges)

---

## 📚 RESSOURCES COMPLÉMENTAIRES

### Commandes Terminal disponibles :
- `help` - Liste des commandes
- `netscan` - Scanner le réseau local
- `connect [ip]` - Se connecter à une machine
- `pass [mot]` - S'authentifier
- `ls` - Lister les fichiers
- `cat [fichier]` - Afficher un fichier
- `sort [dossier]` - Trier un dossier
- `decrypt [fichier]` - Déchiffrer un fichier

### Easter Eggs :
- Le fichier `secure_notes.dat` peut être déchiffré avec `decrypt secure_notes.dat`
- Le NAS contient l'IBAN de secours (alternative au HUD)

---

**Bonne chance, Agent ! 🕵️‍♂️**

*Durée estimée : 15-20 minutes | Difficulté : ⭐⭐⭐☆☆*
