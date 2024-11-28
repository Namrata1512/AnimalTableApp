// Base Class for Animal
class Animal {
    constructor(species, name, size, location, image = 'default.jpg') {
        this.species = species;
        this.name = name;
        this.size = size;
        this.location = location;
        this.image = image;
    }
}

// Table Manager Class
class TableManager {
    constructor(tableId, animals, sortFields) {
        this.tableId = tableId;
        this.animals = animals;
        this.sortFields = sortFields;

        this.renderTable();
    }

    renderTable() {
        const tableBody = document.getElementById(this.tableId);
        tableBody.innerHTML = this.animals
            .map(
                (animal) => `
          <tr>
            <td><img src="${animal.image}" alt="${animal.name}"></td>
            <td>${this.formatName(animal.name)}</td>
            <td>${animal.size}</td>
            <td>${animal.location}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editAnimal('${this.tableId}', '${animal.name}')">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${this.tableId}', '${animal.name}')">Delete</button>
            </td>
          </tr>`
            )
            .join('');
    }

    formatName(name) {
        if (this.tableId === 'table2') {
            return `<span class="bold">${name}</span>`;
        }
        if (this.tableId === 'table3') {
            return `<span class="bold italic blue">${name}</span>`;
        }
        return name;
    }

    addAnimal(animal) {
        if (this.animals.find((a) => a.name === animal.name)) {
            alert('Duplicate animal!');
            return;
        }
        this.animals.push(animal);
        this.renderTable();
    }

    deleteAnimal(name) {
        this.animals = this.animals.filter((animal) => animal.name !== name);
        this.renderTable();
    }

    sortTable(field) {
        if (this.sortFields.includes(field)) {
            this.animals.sort((a, b) => {
                if (field === 'size') return parseInt(a.size) - parseInt(b.size);
                return a[field].localeCompare(b[field]);
            });
            this.renderTable();
        }
    }
}

// Global Table Managers
const tableManagers = {
    table1: new TableManager('table1', [
        new Animal('Big Cats', 'Tiger', '10 ft', 'Asia'),
        new Animal('Big Cats', 'Lion', '8 ft', 'Africa'),
        new Animal('Big Cats', 'Leopard', '5 ft', 'Africa and Asia'),
        new Animal('Big Cats', 'Cheetah', '5 ft', 'Africa'),
        new Animal('Big Cats', 'Caracal', '3 ft', 'Africa'),
        new Animal('Big Cats', 'Jaguar', '5 ft', 'Amazon'),
    ], ['name', 'size', 'location']),
    table2: new TableManager('table2', [
        new Animal('Dogs', 'Rottweiler', '2 ft', 'Germany'),
        new Animal('Dogs', 'German Shepherd', '2 ft', 'Germany'),
        new Animal('Dogs', 'Labrador', '2 ft', 'UK'),
        new Animal('Dogs', 'Alabai', '4 ft', 'Turkey'),
    ], ['name', 'location']),
    table3: new TableManager('table3', [
        new Animal('Big Fish', 'Humpback Whale', '15 ft', 'Atlantic Ocean'),
        new Animal('Big Fish', 'Killer Whale', '12 ft', 'Atlantic Ocean'),
        new Animal('Big Fish', 'Tiger Shark', '8 ft', 'Ocean'),
        new Animal('Big Fish', 'Hammerhead Shark', '8 ft', 'Ocean'),
    ], ['size']),
};

// Global Functions for Buttons
function addAnimal(tableId) {
    const name = prompt('Enter Animal Name:');
    const size = prompt('Enter Animal Size (e.g., "5 ft"):');
    const location = prompt('Enter Animal Location:');
    const image = prompt('Enter Image URL (or leave blank for default):') || 'default.jpg';

    if (!name || !size || !location) {
        alert('All fields are required!');
        return;
    }

    const species = tableManagers[tableId].animals[0]?.species || 'Unknown';
    const newAnimal = new Animal(species, name, size, location, image);
    tableManagers[tableId].addAnimal(newAnimal);
}

function deleteAnimal(tableId, name) {
    tableManagers[tableId].deleteAnimal(name);
}

function editAnimal(tableId, name) {
    const animal = tableManagers[tableId].animals.find((a) => a.name === name);
    if (!animal) return;

    const newName = prompt('Edit Name:', animal.name);
    const newSize = prompt('Edit Size:', animal.size);
    const newLocation = prompt('Edit Location:', animal.location);

    if (!newName || !newSize || !newLocation) {
        alert('All fields are required!');
        return;
    }

    animal.name = newName;
    animal.size = newSize;
    animal.location = newLocation;

    tableManagers[tableId].renderTable();
}

function sortTable(tableId, field) {
    tableManagers[tableId].sortTable(field);
}