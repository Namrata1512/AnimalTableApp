# Animal Tables Web Application

This project implements a web application that displays animal information in three interactive tables. Each table has features like sorting, adding, deleting, and editing animals.

## Design Approach

### Architecture
- Object-Oriented Programming (OOP) approach
- Modular design with separate classes for:
  1. `Animal`: Represents individual animal entities
  2. `AnimalTable`: Manages collection of animals
  3. `AnimalTableUI`: Handles UI rendering and interactions

### Key Features
- Three tables for different animal categories
- Sorting capabilities
- Add, Edit, Delete animal functionality
- Form validation
- Image handling with hover effects
- Responsive design using Bootstrap

## Technical Specifications
- Language: JavaScript (ES6+)
- Framework: Bootstrap 5
- No external libraries beyond Bootstrap and its dependencies

## Functionality Details

### Animal Class
- Validates animal data
- Generates default images
- Ensures data integrity

### AnimalTable Class
- Manages animal collections
- Prevents duplicate entries
- Provides sorting methods

### UI Interactions
- Add new animals with form validation
- Edit existing animal entries
- Delete animals from the table
- Sort table columns
- Hover effects on images

## Setup and Installation
1. Clone the repository
2. Open `index.html` in a modern web browser
3. No additional setup required

## Hosting
- Hosted on GitHub Pages
- Public repository available

## Future Improvements
- Implement more robust client-side validation
- Add persistent storage (localStorage/IndexedDB)
- Enhance image upload capabilities
- Create more comprehensive error handling

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5

## Browser Compatibility
- Chrome
- Firefox
- Safari
- Edge
