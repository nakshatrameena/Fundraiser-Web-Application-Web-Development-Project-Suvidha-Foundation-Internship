# Suvidha Foundation Fundraiser App

A web application to create, manage, and donate to campaigns and fundraisers. Built with **MERN stack** (MongoDB, Express, React, Node.js).

---

## Features

### Campaigns
- Create campaigns with title, description, goal amount, and creator name.
- Edit or delete existing campaigns.
- Donate to campaigns and track raised amount.
- List all campaigns with progress bars showing donation status.

### Fundraisers
- Create fundraisers with title, description, and goal amount.
- Edit or delete fundraisers.
- Donate to fundraisers and track raised amount.
- List all fundraisers with progress bars showing donation status.

### Additional
- Input validation for required fields and donation amounts.
- Responsive UI for different screen sizes.

---

## Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** CSS

---

## Project Structure


fundraiser-app/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── models/
│ │ └── Fundraiser.js # Fundraiser schema
│ ├── routes/
│ │ └── fundraisers.js # API routes for fundraisers
│ └── server.js # Express server
│
├── frontend/
│ ├── src/
│ │ ├── App.js # Main React component
│ │ ├── App.css # Styling
│ │ └── index.js
│ └── package.json
└── README.md


---

## Installation

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend

Install dependencies:

npm install

Start MongoDB locally or connect to a MongoDB Atlas cluster.

Run the server:

node server.js
Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the React app:

npm start

Open in browser: https://fundraiser-web-application-web-fzl9.onrender.com/

API Endpoints
Fundraisers
Method	Endpoint	Description
GET	/api/fundraisers	Fetch all fundraisers
POST	/api/fundraisers	Create a new fundraiser
POST	/api/fundraisers/donate/:id	Donate to a fundraiser
PUT	/api/fundraisers/:id	Update a fundraiser
DELETE	/api/fundraisers/:id	Delete a fundraiser
Campaigns
Method	Endpoint	Description
GET	/api/campaigns	Fetch all campaigns
POST	/api/campaigns	Create a new campaign
POST	/api/campaigns/donate/:id	Donate to a campaign
PUT	/api/campaigns/:id	Update a campaign
DELETE	/api/campaigns/:id	Delete a campaign
Screenshots








Contribution

Fork the repository

Create a branch: git checkout -b feature/your-feature

Commit changes: git commit -m 'Add new feature'

Push: git push origin feature/your-feature

Create a pull request

License

This project is licensed under the MIT License.


---

Author

NAKSHATRA MEENA

WEB DEVELOPMENT INTERN SUVIDHA FOUNDATION


✅ This README includes:

- Project overview  
- Features  
- Tech stack  
- Installation instructions  
- API documentation  
- Contribution guide  

---
