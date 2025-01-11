// Question: Pourquoi séparer les routes dans différents fichiers ?

// Réponse : Séparer les routes dans différents fichiers permet de rendre le code plus modulaire 
// et plus facile à maintenir. Cela aide à réduire la complexité des fichiers, 
// en permettant de concentrer les routes liées à une fonctionnalité spécifique dans
//  un même fichier. Cela facilite également la navigation dans le code, le débogage et les tests,
//  car chaque fichier peut être consacré à une partie distincte de l'application.


// Question : Comment organiser les routes de manière cohérente ?

// Réponse: Pour organiser les routes de manière cohérente, il est conseillé de suivre certaines conventions :
/*  Par Ressource : Regroupez les routes selon les ressources qu'elles manipulent (par exemple, un fichier pour les cours,
                  un autre pour les utilisateurs).
    Utilisez des Noms Évocateurs : Nommez les fichiers de routes de façon descriptive, comme courseRoutes.js ou userRoutes.js.
    Structuration en Sous-Dossiers : Si le projet devient plus complexe, envisagez de créer des sous-dossiers pour les routes,
                 les contrôleurs, et les services, afin de maintenir une hiérarchie claire.
    Documentation : Ajoutez des commentaires pour expliquer le but de chaque route ou groupe de routes.*/

    const express = require('express');
    const router = express.Router();
    const courseController = require('../controllers/courseController');
    
    // Routes pour les cours
    router.post('/', courseController.createCourse);
    router.get('/:id', courseController.getCourse);
    router.get('/stats', courseController.getCourseStats);
    
    module.exports = router;