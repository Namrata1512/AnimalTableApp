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
        this.sortAscending = true; // Default to ascending order
    }

    renderTable() {
        const tableBody = document.getElementById(this.tableId);
        
        // Clear the table body before adding new rows
        tableBody.innerHTML = ''; 
    
        this.animals.forEach(animal => {
            const row = document.createElement('tr');
            
            // Create image element with a random query parameter to avoid caching
            const imageSrc = `${animal.image}?v=${new Date().getTime()}`; // Adding timestamp to prevent caching
            const imageCell = `<td><img src="${imageSrc}" alt="${animal.name}" width="50" height="50"></td>`;
    
            // Construct the rest of the table row content
            const rowContent = `
                ${imageCell}
                <td>${this.formatName(animal.name)}</td>
                <td>${animal.size}</td>
                <td>${animal.location}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openAnimalModal('${this.tableId}', 'edit', '${animal.name}')" 
                        title="Edit Animal">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${this.tableId}', '${animal.name}')" 
                        title="Delete Animal">Delete</button>
                </td>
            `;
    
            row.innerHTML = rowContent;
            tableBody.appendChild(row); // Append the new row to the table
        });
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

    // Edit an existing animal in the table
    editAnimal(name, newName, newSize, newLocation, newImage) {
        const animal = this.animals.find((a) => a.name === name);
        if (!animal) {
            alert(`Animal with name "${name}" not found.`);
            return;
        }

        animal.name = newName;
        animal.size = newSize;
        animal.location = newLocation;
        animal.image = newImage;

        this.renderTable();
    }

    deleteAnimal(name) {
        const animal = this.animals.find((animal) => animal.name === name);
        if (animal) {
            const confirmation = confirm(`Are you sure you want to delete the animal: ${animal.name}?`);
            if (confirmation) {
                this.animals = this.animals.filter((animal) => animal.name !== name);
                this.renderTable();
            }
        }
    }

    sortTable(field) {
        if (this.sortFields.includes(field)) {
            this.sortAscending = !this.sortAscending; // Toggle sorting order

            this.animals.sort((a, b) => {
                const sortFactor = this.sortAscending ? 1 : -1;
                if (field === 'size') return (parseInt(a.size) - parseInt(b.size)) * sortFactor;
                return a[field].localeCompare(b[field]) * sortFactor;
            });
            this.renderTable();
        }
    }
}

// Global Table Managers
const tableManagers = {
    table1: new TableManager('table1', [
        new Animal('Big Cats', 'Tiger', '10', 'Asia', 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Cats', 'Lion', '8', 'Africa', 'https://images.pexels.com/photos/2564889/pexels-photo-2564889.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Cats', 'Leopard', '5', 'Africa and Asia', 'https://images.pexels.com/photos/53493/leopard-predator-wildcat-zoo-53493.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Cats', 'Cheetah', '5', 'Africa', 'https://images.pexels.com/photos/19427305/pexels-photo-19427305/free-photo-of-cheetah-lying-in-the-grass-of-the-safari.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Cats', 'Caracal', '3', 'Africa', 'https://images.pexels.com/photos/13591163/pexels-photo-13591163.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Cats', 'Jaguar', '5', 'Amazon', 'https://images.pexels.com/photos/18056653/pexels-photo-18056653/free-photo-of-jaguar-sitting-on-wooden-platform-in-zoo-enclosure.jpeg?auto=compress&cs=tinysrgb&w=600'),
    ], ['name', 'size', 'location']),
    table2: new TableManager('table2', [
        new Animal('Dogs', 'Rottweiler', '2', 'Germany', 'https://images.pexels.com/photos/68798/pexels-photo-68798.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Dogs', 'German Shepherd', '2', 'Germany', 'https://images.pexels.com/photos/3709026/pexels-photo-3709026.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Dogs', 'Labrador', '2', 'UK', 'https://images.pexels.com/photos/27791539/pexels-photo-27791539/free-photo-of-dog.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Dogs', 'Alabai', '4', 'Turkey', 'https://images.pexels.com/photos/15650099/pexels-photo-15650099/free-photo-of-close-up-of-dog.jpeg?auto=compress&cs=tinysrgb&w=600'),
    ], ['name', 'location']),
    table3: new TableManager('table3', [
        new Animal('Big Fish', 'Humpback Whale', '15', 'Atlantic Ocean', 'https://images.pexels.com/photos/3309869/pexels-photo-3309869.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Fish', 'Killer Whale', '12', 'Atlantic Ocean', 'https://images.pexels.com/photos/7767972/pexels-photo-7767972.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Fish', 'Tiger Shark', '8', 'Ocean', 'https://images.pexels.com/photos/18659798/pexels-photo-18659798/free-photo-of-photo-of-a-shark-underwater.jpeg?auto=compress&cs=tinysrgb&w=600'),
        new Animal('Big Fish', 'Hammerhead Shark', '8', 'Ocean', 'https://images.pexels.com/photos/4781942/pexels-photo-4781942.jpeg?auto=compress&cs=tinysrgb&w=600'),
    ], ['size']),
};

// Render tables on initialization
Object.values(tableManagers).forEach((manager) => manager.renderTable());

// Function to clear all validation error messages and invalid input classes
function clearValidationErrors() {
    // Clear error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("sizeError").textContent = "";
    document.getElementById("locationError").textContent = "";

    // Remove 'is-invalid' class from input fields
    document.getElementById("animalName").classList.remove("is-invalid");
    document.getElementById("animalSize").classList.remove("is-invalid");
    document.getElementById("animalLocation").classList.remove("is-invalid");
}

// Global Functions for Buttons
function openAnimalModal(tableId, operation, animalName = null) {
    const modalElement = document.getElementById("animalModal"); // Ensure modalElement is defined
    const modal = new bootstrap.Modal(modalElement); // Create a Bootstrap modal instance

    // Set data attributes on the modal
    modalElement.setAttribute("data-table-id", tableId);
    modalElement.setAttribute("data-operation", operation);

    // Clear previous validation states before opening the modal
    clearValidationErrors();

    if (operation === "edit") {
        const animal = tableManagers[tableId].animals.find((a) => a.name === animalName);
        document.getElementById("animalName").value = animal.name;
        document.getElementById("animalSize").value = animal.size;
        document.getElementById("animalLocation").value = animal.location;
        document.getElementById("animalImage").value = animal.image;

        // Store the original name in a data attribute to use later for editing
        document.getElementById("animalName").dataset.originalName = animal.name;
    } else {
        document.getElementById("animalForm").reset();
    }

    modal.show();
}

document.getElementById("animalForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const modalElement = document.getElementById("animalModal");
    const tableId = modalElement.getAttribute("data-table-id");
    const operation = modalElement.getAttribute("data-operation");

    const name = document.getElementById("animalName").value.trim();
    const size = document.getElementById("animalSize").value.trim();
    const location = document.getElementById("animalLocation").value.trim();
    const image = document.getElementById("animalImage").value.trim() || "default.jpg";
    // Debugging: Check if the image input value is correct
    console.log("Image from input: ", image);  // Check what image URL is being submitted

    let isValid = true;

    // Name validation
    if (!name || name.length < 3) {
        isValid = false;
        document.getElementById("nameError").textContent = "Name must be at least 3 characters long.";
        document.getElementById("animalName").classList.add("is-invalid");
    } else {
        document.getElementById("nameError").textContent = "";
        document.getElementById("animalName").classList.remove("is-invalid");
    }

    // Size validation
    if (!size || isNaN(size) || Number(size) <= 0) {
        isValid = false;
        document.getElementById("sizeError").textContent = "Please provide a valid size (positive number).";
        document.getElementById("animalSize").classList.add("is-invalid");
    } else {
        document.getElementById("sizeError").textContent = "";
        document.getElementById("animalSize").classList.remove("is-invalid");
    }

    // Location validation
    if (!location) {
        isValid = false;
        document.getElementById("locationError").textContent = "Location is required.";
        document.getElementById("animalLocation").classList.add("is-invalid");
    } else {
        document.getElementById("locationError").textContent = "";
        document.getElementById("animalLocation").classList.remove("is-invalid");
    }

    if (!isValid) return;

    if (operation === "edit") {
        // Get the animal's original name (used as an identifier for editing)
        const originalName = document.getElementById("animalName").dataset.originalName;
        // Call editAnimal with individual fields
        tableManagers[tableId].editAnimal(originalName, name, size, location, image);
    } else {
        const species = tableManagers[tableId].animals[0]?.species || "New Species";
        const newAnimal = new Animal(species, name, size, location, image);
        tableManagers[tableId].addAnimal(newAnimal);
    }

    // Close the modal
    bootstrap.Modal.getInstance(modalElement).hide();
});

function editAnimal(tableId, animalName) {
    const newName = document.getElementById("animalName").value;
    const newSize = document.getElementById("animalSize").value;
    const newLocation = document.getElementById("animalLocation").value;
    const newImage = document.getElementById("animalImage").value;

    // Make sure tableManagers[tableId] exists and has editAnimal method
    if (tableManagers[tableId] && typeof tableManagers[tableId].editAnimal === 'function') {
        tableManagers[tableId].editAnimal(animalName, newName, newSize, newLocation, newImage);
    } else {
        alert(`The table with id ${tableId} does not support editing.`);
    }
}

function deleteAnimal(tableId, name) {
    tableManagers[tableId].deleteAnimal(name);
}

function sortTable(tableId, field) {
    tableManagers[tableId].sortTable(field);
}