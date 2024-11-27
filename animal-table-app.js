// Main Animal Class
class Animal {
    constructor(species, name, size, location, image = '') {
        this.species = species;
        this.name = name;
        this.size = size;
        this.location = location;
        this.image = image || this.getDefaultImage();
    }

    getDefaultImage() {
        // Return a default image based on species
        const defaultImages = {
            'Big Cats': 'default-cat.jpg',
            'Dog': 'default-dog.jpg',
            'Big Fish': 'default-fish.jpg'
        };
        return defaultImages[this.species] || 'default.jpg';
    }

    validate() {
        // Validation logic
        if (!this.name || this.name.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        if (isNaN(parseFloat(this.size)) || parseFloat(this.size) <= 0) {
            throw new Error('Size must be a positive number');
        }
        if (!this.location || this.location.trim() === '') {
            throw new Error('Location cannot be empty');
        }
        return true;
    }
}

// Animal Table Management Class
class AnimalTable {
    constructor(species) {
        this.species = species;
        this.animals = [];
    }

    addAnimal(animal) {
        // Check for duplicates
        if (this.animals.some(existing => 
            existing.name.toLowerCase() === animal.name.toLowerCase())) {
            throw new Error('Animal with this name already exists');
        }

        // Validate animal before adding
        animal.validate();
        this.animals.push(animal);
    }

    removeAnimal(name) {
        const index = this.animals.findIndex(animal => 
            animal.name.toLowerCase() === name.toLowerCase());
        
        if (index !== -1) {
            this.animals.splice(index, 1);
            return true;
        }
        return false;
    }

    editAnimal(name, updatedAnimal) {
        const index = this.animals.findIndex(animal => 
            animal.name.toLowerCase() === name.toLowerCase());
        
        if (index !== -1) {
            // Validate updated animal
            updatedAnimal.validate();
            
            // Remove old animal if name changed
            if (name.toLowerCase() !== updatedAnimal.name.toLowerCase()) {
                this.removeAnimal(name);
            }
            
            this.animals[index] = updatedAnimal;
            return true;
        }
        return false;
    }

    sortBy(field) {
        // Sort animals based on the given field
        if (field === 'name') {
            return this.animals.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (field === 'size') {
            return this.animals.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
        }
        if (field === 'location') {
            return this.animals.sort((a, b) => a.location.localeCompare(b.location));
        }
        return this.animals;
    }
}

// UI Rendering Class
class AnimalTableUI {
    constructor(tableId, species) {
        this.tableId = tableId;
        this.species = species;
        this.animalTable = new AnimalTable(species);
        this.initializeTable();
    }

    initializeTable() {
        // Initialize table with Bootstrap styling and functionality
        const tableContainer = document.getElementById(this.tableId);
        // Note: Full UI rendering implementation would go here
    }

    renderTable() {
        const tbody = document.querySelector(`#${this.tableId}-table tbody`);
        tbody.innerHTML = '';

        this.animalTable.animals.forEach(animal => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${animal.image}" class="animal-image" alt="${animal.name}"></td>
                <td>${animal.name}</td>
                <td>${animal.size} ft</td>
                <td>${animal.location}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </td>
            `;
            tbody.appendChild(row);

            row.querySelector('.edit-btn').addEventListener('click', () => this.editAnimalPrompt(animal));
            row.querySelector('.delete-btn').addEventListener('click', () => this.deleteAnimal(animal.name));
        });
    }

    addAnimalPrompt() {
        const name = prompt('Enter animal name:');
        const size = prompt('Enter animal size:');
        const location = prompt('Enter animal location:');
        try {
            const newAnimal = new Animal(this.animalTable.species, name, size, location);
            this.animalTable.addAnimal(newAnimal);
            this.renderTable();
        } catch (err) {
            alert(err.message);
        }
    }

    editAnimalPrompt(animal) {
        const name = prompt('Edit animal name:', animal.name);
        const size = prompt('Edit animal size:', animal.size);
        const location = prompt('Edit animal location:', animal.location);
        try {
            const updatedAnimal = new Animal(this.animalTable.species, name, size, location);
            this.animalTable.editAnimal(animal.name, updatedAnimal);
            this.renderTable();
        } catch (err) {
            alert(err.message);
        }
    }

    deleteAnimal(name) {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            this.animalTable.removeAnimal(name);
            this.renderTable();
        }
    }
}

// Main Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tables for Big Cats, Dogs, and Big Fish
    const bigCatsTable = new AnimalTableUI('big-cats-table', 'Big Cats');
    const dogsTable = new AnimalTableUI('dogs-table', 'Dog');
    const bigFishTable = new AnimalTableUI('big-fish-table', 'Big Fish');
});
