// Question: Quelle est la différence entre un contrôleur et une route ?

// Réponse:Une route est une définition dans une application web qui associe une URL à une action spécifique, 
// telle que le traitement d'une requête HTTP. En revanche, un contrôleur est une fonction ou un ensemble 
// de fonctions qui contient la logique métier pour traiter les requêtes associées à ces routes. En résumé, 
// la route détermine "où" aller dans l'application, tandis que le contrôleur détermine "quoi faire" une fois que l'on y est arrivé.

// Question : Pourquoi séparer la logique métier des routes ?

// Réponse : Séparer la logique métier des routes permet d'améliorer la lisibilité,
//  la maintenabilité et la réutilisabilité du code. Cela facilite également les tests unitaires,
//  car la logique métier peut être testée indépendamment des routes. En ayant des contrôleurs distincts, 
// on peut également réduire la complexité des fichiers de routage, ce qui rend l'application plus modulaire et facile à comprendre.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Fonction pour créer un cours
async function createCourse(req, res) {
  try {
    const { title, description } = req.body; // Exemple d'extraction des données du corps de la requête

    // TODO: Implémenter la logique pour créer un cours
    const newCourse = await mongoService.createCourse({ title, description });

    // Optionnel : Mettre à jour le cache Redis
    await redisService.updateCourseCache(newCourse);

    res.status(201).json(newCourse); // Répondre avec le cours créé
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du cours' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  // TODO: Ajouter d'autres fonctions de contrôleur si nécessaire
};