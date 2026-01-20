const { v4: uuidv4 } = require('uuid');

class Activity {
    constructor(petId, type, title, description, date, time) {
        this.id = uuidv4();
        this.petId = petId;
        this.type = type; 
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    update(data) {
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt') {
                this[key] = data[key];
            }
        });
    }
}

module.exports = Activity;
