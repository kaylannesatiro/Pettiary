const { v4: uuidv4 } = require('uuid');

class Pet {
    constructor(name, species, breed, birthDate, photoUrl, color = '#6200EE') {
        this.id = uuidv4();
        this.name = name;
        this.species = species; 
        this.breed = breed;
        this.birthDate = birthDate;
        this.photoUrl = photoUrl;
        this.color = color;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getAge() {
        const today = new Date();
        const birth = new Date(this.birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    update(data) {
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt') {
                this[key] = data[key];
            }
        });
        this.updatedAt = new Date();
    }
}

module.exports = Pet;
