# NoAgent Clone - Backend

This project is a backend implementation of a NoAgent clone, a platform for property listings and rentals.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Database Schema](#database-schema)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User signup and login with JWT authentication
- Post properties for rent
- View and filter properties
- Add properties to wishlist
- Admin approval for property listings
- User-specific property listings

## Folder Structure

├── assets
│ └── property-images
├── middleware
├── models
│ ├── property_data_schema.js
│ └── user_data_schema.js
├── .env
├── index.js
├── package.json
└── README.md


## Setup

1. Clone the repository: `git clone https://github.com/your-username/noagent-clone-backend.git`
2. Navigate to the project folder: `cd noagent-clone-backend`
3. Install dependencies: `npm install`
4. Create a `.env` file and add your configuration details (refer to `.env.example`)
5. Start the server: `npm start`

## API Endpoints

- `/signup`: User registration
- `/login`: User login
- `/rent_property`: Post a property for rent
- `/add_to_wishlist/:propertyId`: Add a property to the wishlist
- `/approve_property/:propertyId`: Admin approves a property listing
- `/rent/search`: Search for properties available for rent
- `/sort`: Sort properties based on criteria (date, price)
- `/my_properties`: View properties posted by the user
- `/remove_property/:propertyId`: Remove a property from user's listings

## Authentication

- The application uses JWT (JSON Web Tokens) for user authentication.
- Token is required for protected routes.

## Middleware

- `auth.js`: Contains middleware functions for token verification and admin validation.

## Database Schema

- `user_data_schema.js`: Defines the schema for user data.
- `property_data_schema.js`: Defines the schema for property data.

## Dependencies

- Express: Backend web framework
- Mongoose: MongoDB object modeling for Node.js
- JWT: JSON Web Token implementation
- Bcrypt: Password hashing library
- Cloudinary: Image and video storage in the cloud

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
