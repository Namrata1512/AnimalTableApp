class Animal {
    constructor(species, name, size, location, image = '') {
        this.species = species;
        this.name = name;
        this.size = size;
        this.location = location;
        this.image = image || this.getDefaultImage();
    }

    getDefaultImage() {
        const defaultImages = {
            'Big Cats': 'https://via.placeholder.com/100?text=Cat',
            'Dog': 'https://via.placeholder.com/100?text=Dog',
            'Big Fish': 'https://via.placeholder.com/100?text=Fish',
        };
        return defaultImages[this.species];
    }

    validate() {
        if (!this.name || this.name.trim() === '') throw new Error('Name cannot be empty');
        if (isNaN(parseFloat(this.size)) || parseFloat(this.size) <= 0) throw new Error('Size must be a positive number');
        if (!this.location || this.location.trim() === '') throw new Error('Location cannot be empty');
        return true;
    }
}

class AnimalTable {
    constructor(species) {
        this.species = species;
        this.animals = [];
    }

    addAnimal(animal) {
        if (this.animals.some(existing => existing.name.toLowerCase() === animal.name.toLowerCase())) {
            throw new Error('Animal with this name already exists');
        }
        animal.validate();
        this.animals.push(animal);
    }

    removeAnimal(name) {
        this.animals = this.animals.filter(animal => animal.name.toLowerCase() !== name.toLowerCase());
    }

    editAnimal(name, updatedAnimal) {
        const index = this.animals.findIndex(animal => animal.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            updatedAnimal.validate();
            this.animals[index] = updatedAnimal;
        }
    }

    sortBy(field) {
        this.animals.sort((a, b) => a[field].toString().localeCompare(b[field].toString()));
    }
}

class AnimalTableUI {
    constructor(tableId, species) {
        this.tableId = tableId;
        this.animalTable = new AnimalTable(species);
        this.init();
    }

    init() {
        const addBtn = document.getElementById(`add-${this.tableId}-btn`);
        addBtn.addEventListener('click', () => this.addAnimalPrompt());
        this.renderTable();
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

// Initialize tables
document.addEventListener('DOMContentLoaded', () => {
    new AnimalTableUI('big-cats', 'Big Cats');
    new AnimalTableUI('dogs', 'Dog');
    new AnimalTableUI('big-fish', 'Big Fish');
});
