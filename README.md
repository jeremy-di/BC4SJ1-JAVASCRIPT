# Guide d'installation

## Installation en local

### Initialiser le projet

1. Verifier la présence de Node.js et NPM
```shell
node -v
npm -v
```


2. installer les dépendances
```shell
npm i
```
```shell 
cd client
npm i
cd  ..
```

2. Importer le script SQL dans votre base de donnée
```shell
    mysql -u [username] -p [database_name] < ./config/library.sql
```
Un mot de passe vous sera alors demandé, dans le cas ou aucun mot de passe n'es configuré sur votre base, vous pouvez retirer le `-p`
Par exemple pour un utilisateur root sans mot de passe avec une base de donnée library:
```shell
    mysql -u root library < ./config/library.sql
    mysql -u root library < ./config/emprunt.sql
```


### Lancer le projet

1. Exécuter le serveur et le client dans 2 terminaux différents
```shell
node server.js
```
```shell
cd client
npm run dev
```

2. Accéder à l'Application
Ouvrez votre navigateur et allez sur la page http://localhost:5174 et http://localhost:3000 pour l'api.

Attention les appels API ne sont pas diriger vers le 3000, il faut donc les modifiers

3. Connexion
Connectez vous à l'aide d'un des comptes via la page Connexion
**Rôle Admin :**
```
john@smith.com
azerty
```

OU
**Rôle utilisateur :**
```
marc@lord.com 
azerty
```

## Installation distant

Le projet est pré-déployé sur le lien reçu au début de votre examen.
Ce lien vous permet d'accèder au projet via un lien HTTPs

Vous avez une connexion FTP disponible et SSH afin de modifier ce projet en conséquence
Attention, prévoyez bien vos modifications en local et testez bien ces dernières avant de les déployers."# BC4SJ1-JAVASCRIPT" 
