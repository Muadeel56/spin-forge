# SpinForge

A modern full-stack community platform built with React and Django.

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **ESLint** - Code linting

### Backend
- **Django 5.0** - Web framework
- **Django REST Framework** - API framework
- **PostgreSQL** - Database
- **django-cors-headers** - CORS handling

## Project Structure

```
spin-forge/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── layouts/   # Layout components (Header, Footer, BaseLayout)
│   │   ├── services/  # API service functions
│   │   ├── hooks/     # Custom React hooks
│   │   ├── utils/     # Utility functions
│   │   ├── App.jsx    # Main App component
│   │   └── main.jsx   # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── backend/            # Django backend application
│   ├── config/        # Django project settings
│   ├── users/         # User authentication app
│   ├── profiles/      # User profiles app
│   ├── posts/         # Posts/content app
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.12 or higher)
- **PostgreSQL** (12 or higher)
- **npm** or **yarn**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spin-forge
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Database Setup

1. Ensure PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```

2. Create the database (if not already created):
   ```bash
   sudo -u postgres psql -c "CREATE DATABASE spinforge;"
   ```

3. Create a `.env` file in the `backend/` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```

4. Update `backend/.env` with your PostgreSQL credentials:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   
   DB_NAME=spinforge
   DB_USER=postgres
   DB_PASSWORD=your-postgres-password
   DB_HOST=localhost
   DB_PORT=5432
   
   CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

#### Run Migrations

```bash
python manage.py migrate
```

#### Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

#### Start Backend Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory if needed:
```bash
cp frontend/.env.example frontend/.env
```

#### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Running Both Servers

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   source venv/bin/activate
   python manage.py runserver
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

### API Endpoints

- Health Check: `http://localhost:8000/api/health/`
- Admin Panel: `http://localhost:8000/admin/`
- API Root: `http://localhost:8000/api/`

### Testing the Connection

Once both servers are running, you can test the API connection from the frontend by visiting the health check endpoint or making API calls from your React components.

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

### Backend

Follow Django deployment best practices for production deployment.

## Project Features

- ✅ Monorepo structure (frontend + backend)
- ✅ Absolute imports configured (`@/` alias)
- ✅ Base layout components (Header, Footer, BaseLayout)
- ✅ Django REST Framework setup
- ✅ PostgreSQL database configuration
- ✅ CORS configured for frontend-backend communication
- ✅ Environment variable management
- ✅ Custom User model
- ✅ User profiles and posts apps initialized

## Next Steps

- Implement authentication system
- Add API endpoints for users, profiles, and posts
- Set up frontend API service layer
- Add form validation and error handling
- Implement responsive design improvements

## License

This project is private.
