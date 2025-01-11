// Question : Comment gérer efficacement le cache avec Redis ?

// Réponse :Déterminer les Données à Cacher : Identifiez les données qui sont fréquemment demandées et qui ne changent pas souvent.
/*  Utiliser un TTL (Time To Live) : Définissez une durée de vie pour chaque entrée dans le cache afin d'éviter que des données obsolètes ne soient servies.
    Invalider le Cache : Assurez-vous d'invalider ou de mettre à jour le cache lorsque les données sous-jacentes changent.
    Surveiller les Performances : Utilisez des outils de monitoring pour suivre l'utilisation du cache et ajuster les stratégies en conséquence.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?

// Réponse :Les bonnes pratiques pour les clés Redis incluent :
/*  Utiliser un Préfixe : Ajoutez un préfixe pour regrouper les clés liées (par exemple, user:123:profile).
    Éviter les Clés Trop Longues : Limitez la longueur des clés pour éviter une surcharge de mémoire.
    Utiliser un Schéma Cohérent : Adoptez une convention de nommage cohérente pour faciliter la gestion et la compréhension.
    Eviter les Clés Sensibles : Ne stockez pas d'informations sensibles dans les clés Redis.*/

// Fonctions utilitaires pour Redis
const redisClient = require('../config/redis'); 

async function cacheData(key, data, ttl) {
    await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
}

module.exports = {
    cacheData,
   
};