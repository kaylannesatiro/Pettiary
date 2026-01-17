const Activity = require('../models/Activity');

let activities = [];

// GET 
const getAllActivities = (req, res) => {
    const { petId } = req.query;

    let filteredActivities = activities;
        if (petId) {
            filteredActivities = activities.filter(a => a.petId === petId);
        }

    res.json({
        success: true,
        data: filteredActivities,
        count: filteredActivities.length
    });
};

// GET ID
const getActivityById = (req, res) => {
    const { id } = req.params;
    const activity = activities.find(a => a.id === id);

    if (!activity) {
        return res.status(404).json({
            success: false,
            message: 'Atividade não encontrada'
        });
    }

    res.json({
        success: true,
        data: activity
    });
};

// POST
const createActivity = (req, res) => {
    const { petId, type, title, description, date, time } = req.body;

    if (!petId || !type || !title || !date) {
        return res.status(400).json({
            success: false,
            message: 'Campos obrigatórios: petId, type, title, date'
        });
    }

    const newActivity = new Activity(petId, type, title, description, date, time);
    activities.push(newActivity);

    res.status(201).json({
        success: true,
        message: 'Atividade criada com sucesso',
        data: newActivity
    });
};

// PATCH - Alternar status
const toggleActivityComplete = (req, res) => {
    const { id } = req.params;
    const activity = activities.find(a => a.id === id);

    if (!activity) {
        return res.status(404).json({
            success: false,
            message: 'Atividade não encontrada'
        });
    }

    activity.toggleComplete();

    res.json({
        success: true,
        message: 'Status atualizado',
        data: activity
    });
};

// PUT
const updateActivity = (req, res) => {
    const { id } = req.params;
    const activityIndex = activities.findIndex(a => a.id === id);

    if (activityIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Atividade não encontrada'
        });
    }

    activities[activityIndex].update(req.body);

    res.json({
        success: true,
        message: 'Atividade atualizada com sucesso',
        data: activities[activityIndex]
    });
};

// DELETE
const deleteActivity = (req, res) => {
    const { id } = req.params;
    const activityIndex = activities.findIndex(a => a.id === id);

    if (activityIndex === -1) {
        return res.status(404).json({
        success: false,
        message: 'Atividade não encontrada'
        });
    }

    const deletedActivity = activities.splice(activityIndex, 1)[0];

    res.json({
        success: true,
        message: 'Atividade deletada com sucesso',
        data: deletedActivity
    });
};

module.exports = {
    getAllActivities,
    getActivityById,
    createActivity,
    toggleActivityComplete,
    updateActivity,
    deleteActivity
};
