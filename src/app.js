// Question: Comment organiser le point d'entrée de l'application ?

//Réponse : Pour organiser le point d'entrée de l'application de manière efficace, il est conseillé de :
/*  Séparer les Configurations : Utilisez des fichiers de configuration pour gérer les différentes environnements (développement, production).
    Initialiser les Dépendances : Chargez toutes les dépendances nécessaires (comme Express, les bases de données, etc.) au début du fichier.
    Configurer les Middlewares : Ajoutez des middlewares comme la gestion des erreurs ou les parsers de requêtes après l'initialisation des dépendances.
    Monter les Routes : Regroupez les routes dans des fichiers séparés et montez-les dans le point d'entrée de l'application.
    Démarrer le Serveur : Terminez le fichier avec une logique de démarrage pour le serveur.*/

// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

 /* Réponse :La meilleure façon de gérer le démarrage de l'application consiste à :
    Utiliser des Fonctions Asynchrones : Employez des fonctions asynchrones pour gérer les connexions aux bases de données 
     et le démarrage du serveur, permettant ainsi d'attendre que toutes les ressources soient prêtes.
     Gérer les Erreurs : Implémentez une gestion des erreurs pour capturer et traiter les exceptions lors du démarrage.
     Assurer un Arrêt Propre : Ajoutez des gestionnaires d'événements pour fermer proprement les connexions à la base de données et autres ressources lors de l'arrêt de l'application. */


     const express = require('express');
     const config = require('./config/env');
     const db = require('./config/db');
     
     const courseRoutes = require('./routes/courseRoutes');
     const studentRoutes = require('./routes/studentRoutes');
     
     const app = express();
     
     async function startServer() {
       try {
         // Initialiser les connexions aux bases de données
         await db.connect(); 
     
         // Configurer les middlewares Express
         app.use(express.json()); // Pour parser les JSON
         app.use(express.urlencoded({ extended: true })); // Pour parser les URL-encoded
     
         // Monter les routes
         app.use('/api/courses', courseRoutes);
         app.use('/api/students', studentRoutes);
     
         // Démarrer le serveur
         const PORT = config.port || 3000;
         app.listen(PORT, () => {
           console.log(`Server is running on port ${PORT}`);
         });
       } catch (error) {
         console.error('Failed to start server:', error);
         process.exit(1);
       }
     }
     
     // Gestion propre de l'arrêt
     process.on('SIGTERM', async () => {
       console.log('Received SIGTERM, shutting down gracefully...');
       await db.close();
       process.exit(0);
     });
     
     startServer();