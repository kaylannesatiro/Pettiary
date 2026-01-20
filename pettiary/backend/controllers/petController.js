const Pet = require('../models/Pet');

// Banco de dados em memória (substitua por banco real em produção)
let pets = [
new Pet(
    'Rex',
    'dog',
    'Golden Retriever',
    '2020-05-15',
    'https://images.unsplash.com/photo-1633722715463-d30f4f325e24',
    '#FF6B35'
),
new Pet(
    'Luna',
    'cat',
    'Siamese',
    '2019-08-20',
    'https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc',
    '#6A4C93'
),
new Pet(
    'Max',
    'dog',
    'Beagle',
    '2021-03-10',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    '#1982C4'
)
];

// GET 
const getAllPets = (req, res) => {
    res.json({
        success: true,
        data: pets,
        count: pets.length
    });
};

// GET ID
const getPetById = (req, res) => {
    const { id } = req.params;
    const pet = pets.find(p => p.id === id);

    if (!pet) {
        return res.status(404).json({
            success: false,
            message: 'Pet não encontrado'
        });
    }

    res.json({
        success: true,
        data: pet
    });
};

// POST 
const createPet = (req, res) => {
const { name, species, breed, birthDate, photoUrl, color } = req.body;

    if (!name || !species || !breed || !birthDate) {
        return res.status(400).json({
            success: false,
            message: 'Campos obrigatórios: name, species, breed, birthDate'
        });
    }

    const newPet = new Pet(name, species, breed, birthDate, photoUrl, color);
    pets.push(newPet);

    res.status(201).json({
        success: true,
        message: 'Pet criado com sucesso',
        data: newPet
    });
};

// PUT 
const updatePet = (req, res) => {
    const { id } = req.params;
    const petIndex = pets.findIndex(p => p.id === id);

    if (petIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Pet não encontrado'
        });
    }

    pets[petIndex].update(req.body);

    res.json({
        success: true,
        message: 'Pet atualizado com sucesso',
        data: pets[petIndex]
    });
};

// DELETE 
const deletePet = (req, res) => {
    const { id } = req.params;
    const petIndex = pets.findIndex(p => p.id === id);

    if (petIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Pet não encontrado'
        });
    }

    const deletedPet = pets.splice(petIndex, 1)[0];

    res.json({
        success: true,
        message: 'Pet deletado com sucesso',
        data: deletedPet
    });
};

module.exports = {
getAllPets,
getPetById,
createPet,
updatePet,
deletePet
};
