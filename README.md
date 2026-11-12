# Renoman

Application mobile de gestion de soumissions, construite avec React Native, Expo et Expo Router.

## Prérequis

- Node.js et npm
- Expo Go sur un appareil Android ou iOS, ou un émulateur/simulateur

## Installation et lancement

Depuis le dossier `Renoman` :

```bash
npm install
npx expo start
```

Scannez le QR code avec Expo Go. Pour une connexion locale, l’ordinateur et le téléphone doivent être sur le même réseau Wi-Fi. Si le réseau local bloque la connexion, lancez Expo avec le tunnel :

```bash
npx expo start --tunnel
```

Pour repartir d’un cache Metro propre :

```bash
npx expo start --clear
```

Autres commandes disponibles :

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Routes

La navigation est gérée par Expo Router à partir des fichiers du dossier `app/`.

| URL | Écran |
| --- | --- |
| `/` | Écran de bienvenue |
| `/login` | Connexion |
| `/home` | Accueil |
| `/tutorial` | Accueil avec le tutoriel de première soumission |

## Organisation du code

- `app/` : déclarations des routes Expo Router
- `src/screens/` : écrans de bienvenue, connexion et accueil
- `src/components/tutoriel/` : composants des tutoriels
- `src/constants/` : couleurs et constantes partagées
- `assets/` : images, icônes et polices utilisées dans l’application

Les actions de connexion, de profil et de soumission sont actuellement des points d’entrée de démonstration ; elles affichent une alerte en attendant l’implémentation des fonctionnalités.

## Technologies

- Expo SDK 58
- React Native 0.88
- React 19
- TypeScript
- Expo Router
- Google Fonts Onest
