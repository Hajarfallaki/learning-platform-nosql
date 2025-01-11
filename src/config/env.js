// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?

// Réponse : Il est crucial de valider les variables d'environnement au démarrage pour garantir que 
// toutes les configurations nécessaires sont présentes avant que l'application ne commence à s'exécuter. 
// Cela permet d'éviter des erreurs d'exécution imprévues et de s'assurer que l'application fonctionne comme prévu 
// dans l'environnement configuré. Une validation précoce permet également de fournir des messages d'erreur clairs,
//  facilitant ainsi le débogage.

// Question: Que se passe-t-il si une variable requise est manquante ?

// Réponse :  Si une variable requise est manquante, l'application ne pourra pas fonctionner correctement.
//  Cela peut entraîner des erreurs d'exécution, des échecs de connexion à des services externes (comme une base de données ou un cache),
//  et d'autres comportements inattendus. En levant une erreur explicative lors de la validation, on peut informer immédiatement le développeur 
// ou l'utilisateur de l'application de la configuration manquante, facilitant ainsi la correction.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`La variable d'environnement ${varName} est requise mais est manquante.`);
    }
  });
}

// Appel de la fonction de validation au démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};