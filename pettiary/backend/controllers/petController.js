const Pet = require('../models/Pet');

let pets = [];

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
const { name, species, breed, photoUrl, color } = req.body;

    if (!name || !species || !breed) {
        return res.status(400).json({
            success: false,
            message: 'Campos obrigatórios: name, species, breed'
        });
    }

    const newPet = new Pet(name, species, breed, photoUrl, color);
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
