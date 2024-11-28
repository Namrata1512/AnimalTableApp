# Animal Tables Web Application

This project implements a web application that displays animal information in three interactive tables. Each table has features like sorting, adding, deleting, and editing animals.

**Key Features:**

- Three tables for different animal categories
- Sorting capabilities (by name, size, and location depending on the table)
- Add, Edit, Delete animal functionality
- Form validation (name length, size, location, required fields)
- Image handling with hover effects
- Responsive design using Bootstrap

**Technologies Used:**

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5

**Browser Compatibility:**

- Chrome
- Firefox
- Safari
- Edge

**Code Structure:**

The code is organized using object-oriented principles:

- `Animal` class: Represents individual animal entities (name, size, location, image)
- `TableManager` class: Manages animal collections for each table, handles sorting, adding, editing, and deleting animals.

**Setup and Installation:**

1. Clone the repository
2. Open `index.html` in a modern web browser

**Functionality Details:**

**Animal Class:**

- Validates animal data (name length, size format)
- Generates default images (if no image URL provided)

**TableManager Class:**

- Manages animal collections for a specific table
- Prevents duplicate entries
- Provides sorting methods (by name, size, and location)

**UI Interactions:**

- Add new animals with form validation
- Edit existing animal entries
- Delete animals from the table
- Sort table columns
- Hover effects on images

**Future Improvements:**

- Implement more robust client-side validation
- Add persistent storage (localStorage/IndexedDB)
- Enhance image upload capabilities
- Create more comprehensive error handling

