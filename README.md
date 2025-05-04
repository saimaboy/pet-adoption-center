### Virtual Pet Adoption Center

A full-stack application where users can manage virtual pets available for adoption. This project includes a RESTful API for pet management and a responsive UI for interacting with the pets.

## Features

- **Pet Management**: Create, read, update, and delete pet profiles
- **Adoption System**: Mark pets as adopted with timestamps
- **Dynamic Moods**: Pets' moods change based on how long they've been in the system
- **Filtering**: Filter pets by their current mood
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices


## Technologies Used

- **Frontend**: React.js, Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React


## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm or yarn


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/virtual-pet-adoption-center.git
cd virtual-pet-adoption-center
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Project Structure

```plaintext
virtual-pet-adoption-center/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   └── pets/           # Pet-related endpoints
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── add-pet-form.tsx    # Form for adding new pets
│   ├── edit-pet-form.tsx   # Form for editing pets
│   ├── filter-bar.tsx      # Filter controls
│   ├── pet-card.tsx        # Individual pet display
│   └── pet-list.tsx        # List of pets
├── services/               # API service functions
│   └── api.ts              # Functions for API calls
├── types/                  # TypeScript type definitions
│   └── pet.ts              # Pet interface
├── utils/                  # Utility functions
│   └── mood-logic.ts       # Logic for pet moods
└── README.md               # Project documentation
```

## API Endpoints

The application provides the following API endpoints:

- `GET /api/pets` - Get all pets
- `POST /api/pets` - Add a new pet
- `GET /api/pets/:id` - Get a specific pet
- `PUT /api/pets/:id` - Update a pet
- `DELETE /api/pets/:id` - Delete a pet
- `PATCH /api/pets/:id/adopt` - Mark a pet as adopted
- `GET /api/pets/filter?mood=<mood>` - Filter pets by mood


## Usage Instructions

### Adding a Pet

1. Fill out the "Add a New Pet" form on the right side of the page
2. Enter the pet's name, species, age, and personality
3. Click "Add Pet"


### Editing a Pet

1. Find the pet you want to edit in the list
2. Click the "Edit" button
3. Update the pet's information
4. Click "Save"


### Adopting a Pet

1. Find the pet you want to adopt
2. Click the "Adopt" button
3. The pet will be marked as adopted with the current date


### Filtering Pets

1. Use the filter buttons at the top of the pet list
2. Select "All" to see all pets, or choose a specific mood (Happy, Excited, Sad)


### Deleting a Pet

1. Find the pet you want to delete
2. Click the trash icon
3. The pet will be removed from the system


## Data Persistence

This demo version uses in-memory storage, which means all data will be reset when the server restarts. For a production application, you would want to connect to a database like MongoDB, PostgreSQL, or MySQL.

## Future Improvements

- Add database integration for persistent storage
- Implement user authentication and profiles
- Add image upload for pet photos
- Create a pet personality quiz to match users with compatible pets
- Generate adoption certificates
- Add notifications for mood changes
- Implement search functionality


## License

MIT

---

Feel free to contribute to this project by submitting issues or pull requests!
