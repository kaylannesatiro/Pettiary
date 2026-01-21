const { v4: uuidv4 } = require('uuid');


class Pet {
    constructor(name, species, breed, photoUrl, color = '#6200EE') {
        this.id = uuidv4();
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.photoUrl = photoUrl;
        this.color = color;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(data) {
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt' && key !== 'birthDate') {
                this[key] = data[key];
            }
        });
        this.updatedAt = new Date();
    }
}

module.exports = Pet;
