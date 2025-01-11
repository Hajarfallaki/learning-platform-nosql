// Question: Pourquoi créer des services séparés ?

// Réponse: Créer des services séparés permet d'encapsuler et de réutiliser la logique métier 
// et les interactions avec la base de données, ce qui améliore la maintenabilité et la lisibilité 
// du code. Cela permet également de centraliser les opérations communes comme les requêtes à la base de données, 
// ce qui réduit la duplication de code dans les contrôleurs. En séparant ces préoccupations, chaque composant 
// de l'application reste simple et concentre son rôle, facilitant ainsi les tests et les modifications futures.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  if (!ObjectId.isValid(id)) {
    throw new Error('ID invalide');
  }
  const result = await db.collection(collection).findOne({ _id: ObjectId(id) });
  return result;
}

// Export des services
module.exports = {
  findOneById,
  
};