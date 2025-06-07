Music Explorer 🎵
A full-stack web application designed to demonstrate the power of graph databases for modeling and querying highly connected data. It allows users to explore a music knowledge graph, discovering artists based on genres.

This project was built as a learning exercise to master graph databases (Neo4j), containerization with Docker, and building a modern web stack with a Python backend and a React frontend.

🏛️ Architecture
The application runs as a multi-container setup orchestrated by Docker Compose.
```shell
[ User's Browser ]
       |
       | (HTTPS on Port 3001)
       v
[    Frontend    ]  <-- (React + Nginx)
       |
       | (API Calls to /api/*)
       v
[    Backend     ]  <-- (Python + FastAPI on Port 8000)
       |
       | (Bolt Protocol to Port 7687)
       v
[   Database     ]  <-- (Neo4j Graph Database)
```

✨ Key Features
- Genre-Based Search: Find artists by searching for a specific music genre.
- Case-Insensitive Search: The search logic correctly handles different casing (e.g., "Hip-Hop" and "hip-hop" yield the same result).
- Decoupled Architecture: A clear separation between the frontend client, backend API, and the database.
- Containerized Environment: The entire stack is fully containerized with Docker, ensuring easy setup and consistent behavior across different machines.

🛠️ Tech Stack
- Frontend: React, CSS Modules
- Backend: Python 3.9, FastAPI
- Database: Neo4j
- Containerization: Docker, Docker Compose
- Web Server/Proxy: Nginx

🚀 Getting Started
Follow these instructions to get the project up and running on your local machine.

Prerequisites
Docker and Docker Compose must be installed on your system.
Git for cloning the repository.
1. Clone the Repository
```Bash
git clone <your-repository-url>
cd music-explorer
```
2. Create Environment File
Create a .env file in the root of the project. This file will hold the credentials for the database.
```shell
# .env
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-secure-password
```
Replace your-secure-password with a strong password of your choice.
3. Build and Run the Application
Use Docker Compose to build the images and start the containers.
```bash
docker-compose up --build
```
This command will:

Build the Docker images for the backend and frontend services.
Start all three containers (db, backend, frontend).
The first build may take a few minutes.
4. Populate the Database
The Neo4j database starts empty. You need to populate it with the sample data.

Open the Neo4j Browser in your web browser: https://www.google.com/search?q=http://localhost:7474
Log in using the username (neo4j) and the password you set in your .env file.
Copy the entire content of the provided Cypher script (<path-to-your-cypher-script.cypher>) and execute it in the Neo4j Browser query editor.
Note: It's good practice to place the database setup script in a file within the repository, for example, /db_setup/data.cypher.
5. Access the Application
Once all containers are running and the database is populated, you can access the different parts of the application:

- 🎵 Frontend Application: http://localhost:3001
- ⚙️ Backend API Root: http://localhost:8000
- 🗃️ Neo4j Database Browser: http://localhost:7474

💡 Usage
Once the application is running, navigate to http://localhost:3001.

- Enter a genre like "House" or "Hip-Hop" into the search box.
- Click the "Find Artists" button.
- The application will display a list of artists associated with that genre.

🔧 Future Improvements
- Implement endpoints and UI components to view Albums and Songs for each artist.
- Create a recommendation feature (e.g., "Artists on the same label").
- Add more complex graph traversals and visualizations.
- Implement user authentication to allow saving favorite artists.

📄 License
This project is licensed under the MIT License.

