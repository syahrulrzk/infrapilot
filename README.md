# InfraPilot

✈️ **Your Infrastructure, On Autopilot**

InfraPilot is an all-in-one IT Infrastructure Management Platform that empowers engineers to manage servers, automate tasks, and secure credentials from one unified interface.

## Features

- ✅ **To-Do Task Manager** - CRUD tasks with reminders
- 🖥️ **Server Management** - List servers, manage SSH keys, monitor health status
- 🔐 **Security Center** - SSH rotation, 2FA, audit logs
- 🔑 **Password Vault** - AES-256 encrypted credentials storage
- 📊 **Monitoring Dashboard** - CPU, RAM, Disk usage and uptime monitoring
- ⚙️ **Automation** - Backup scheduler, patch reminders
- 👤 **User & Role Management** - Admin and operator roles
- 📧 **Notifications** - Email and Telegram integration
- 🧰 **Encryption Layer** - Fernet (AES) encryption
- 🐳 **Containerization** - Docker Compose for easy deployment

## Tech Stack

- **Frontend**: React (Vite + TailwindCSS)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (SQLite for development)
- **Authentication**: JWT + bcrypt
- **Encryption**: Fernet (AES)
- **Containerization**: Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.9+ (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd InfraPilot
   ```

2. Set up environment variables:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: http://localhost:5432

### Development

#### Backend Development

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
InfraPilot/
├── backend/
│   ├── app/
│   │   ├── api/          # API routers
│   │   ├── core/         # Core configurations and security
│   │   ├── database/     # Database connection
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── main.py       # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile        # Backend Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main App component
│   ├── package.json      # Node dependencies
│   └── Dockerfile        # Frontend Dockerfile
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped develop InfraPilot
- Inspired by the need for a unified infrastructure management platform# infrapilot
