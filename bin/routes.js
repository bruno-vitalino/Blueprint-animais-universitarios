const express = require("express");
const router = express.Router();
const animalController = require('./controllers/animal-controller');

router.use(express.static('public'));

router.get('/', animalController.getAnimais);

router.post('/', animalController.postAnimal);
router.post('/', animalController.postTemperamento);
router.post('/', animalController.postSociavel);
router.post('/', animalController.postVive);
router.post('/', animalController.postSaude);

router.get('/adm', (req, res) => {
    res.render('pages/adm');
});

router.get('/perfil/:idAnimais', animalController.getAnimal);

router.get('/formulario', (req, res) => {
    res.render('pages/formulario');
});

router.get('/perfil-adm', (req, res) => {
    res.render('pages/perfil-adm');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});

/*
router.get('/cadastro', (req, res) => {
    res.render('pages/cadastro', { users: users });
});
*/

module.exports = router;