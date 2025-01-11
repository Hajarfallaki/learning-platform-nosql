// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?

// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser la logique de connexion, 
// ce qui simplifie la gestion des connexions et les rend facilement réutilisables dans toute l'application. Cela facilite également la maintenance, 
// car les modifications dans la logique de connexion n'affecteront pas le reste du code. De plus, cela favorise une séparation claire des préoccupations, 
// rendant le code plus lisible et testable.

// Question : Comment gérer proprement la fermeture des connexions ?

// Réponse :Pour gérer la fermeture des connexions de manière appropriée, il est essentiel de s'assurer que les connexions sont fermées lorsque l'application est arrêtée 
// ou lorsque les connexions ne sont plus nécessaires. Cela peut être fait en écoutant des événements de fermeture d'application (comme process.on('SIGINT') ou process.on('exit')) 
// et en appelant les méthodes de fermeture des clients de bases de données appropriés. Une gestion des erreurs doit également être mise en place pour s'assurer 
// que les connexions sont toujours fermées même en cas d'erreur. 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.DB_NAME);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Gestion des retries (par exemple, avec une temporisation)
  }
}

async function connectRedis() {
  return new Promise((resolve, reject) => {
    redisClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
    
    redisClient.on('connect', () => {
      console.log('Redis connected');
      resolve();
    });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
      reject(err);
    });
  });
}

// Fonction pour fermer les connexions
async function closeConnections() {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
  if (redisClient) {
    redisClient.quit();
    console.log('Redis connection closed');
  }
}

// Écoute des événements de fermeture d'application
process.on('SIGINT', async () => {
  await closeConnections();
  process.exit(0);
});

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getDb: () => db,
  getRedisClient: () => redisClient,
};