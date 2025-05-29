# TafTube: YouTube Clone

TafTube is a fullstack YouTube clone application built with a modern React frontend and a FastAPI backend. It allows users to browse, search, and watch YouTube videos, including support for Shorts, trending, and related videos. The app leverages the YouTube Data API v3 for video content and MongoDB for backend data storage.

---

## Features
- Browse most popular YouTube videos
- Search for videos and channels
- Watch videos and YouTube Shorts
- View related videos and video details
- Responsive, modern UI with dark mode
- Backend API with FastAPI and MongoDB
- Dockerized for easy deployment

---

## Project Structure

```
project/
  backend/           # FastAPI backend (Python)
    server.py        # Main FastAPI app
    requirements.txt # Backend dependencies
    ...
  frontend/          # React frontend (JavaScript)
    src/             # React source code
      App.js         # Main app logic
      components.js  # UI components
      ...
    public/          # Static assets
    package.json     # Frontend dependencies
    ...
  Dockerfile         # Multi-stage Docker build
  nginx.conf         # Nginx config for serving frontend & API
  entrypoint.sh      # Entrypoint script for Docker
  README.md          # Project documentation
  ...
```

---

## Prerequisites
- Node.js (for frontend dev)
- Python 3.11+ (for backend dev)
- MongoDB (local or remote)
- YouTube Data API v3 key
- Docker (for containerized deployment)

---

## Setup Instructions

### 1. Clone the repository
```powershell
git clone <repo-url>
cd TafTube/project
```

### 2. Environment Variables

#### Backend (`backend/.env`):
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
```

#### Frontend (`frontend/.env`):
```
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here
REACT_APP_BACKEND_URL=http://localhost:8001
```
**Note:** Add your YouTube Data API v3 key as `REACT_APP_YOUTUBE_API_KEY` in the frontend `.env` file.

---

### 3. Install Dependencies

#### Backend
```powershell
cd backend
pip install -r requirements.txt
```

#### Frontend
```powershell
cd ../frontend
npm install
```

---

### 4. Run the App (Development)

#### Start Backend
```powershell
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

#### Start Frontend
```powershell
cd ../frontend
npm start
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api

---

### 5. Docker Deployment

Build and run the fullstack app with Docker:
```powershell
docker build -t taftube .
docker run -p 8080:8080 taftube
```
- App will be available at http://localhost:8080

---

## API Usage & YouTube API Key
- The YouTube Data API v3 key is required for fetching video data.
- **Where to add:** Place your API key in `frontend/.env` as `REACT_APP_YOUTUBE_API_KEY`.
- The frontend will use this key to make requests to the YouTube API.

---

## Testing
- Frontend: `npm test` (from `frontend` folder)
- Backend: Use `pytest` (from `backend` folder)

---

## License
MIT or as specified by the project owner.

---

## Credits
- Built with [React](https://react.dev/), [FastAPI](https://fastapi.tiangolo.com/), [MongoDB](https://www.mongodb.com/), and [YouTube Data API v3](https://developers.google.com/youtube/v3).

---

For any issues or contributions, please open an issue or pull request.
