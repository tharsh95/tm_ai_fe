# Taskym Client

React + TypeScript frontend for the Taskym task management application.

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- Lucide Icons
- Vite

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
1. Install dependencies:
```bash
npm install
# or
yarn
```


2. Start development server:
```bash
npm run dev
# or
yarn dev
```

## Features

### Authentication
- User registration
- Login with JWT
- Secure token storage

### Task Management
- Kanban board with 4 columns:
  - To Do
  - In Progress
  - Closed
  - Frozen
- Create, edit, and delete tasks
- Task details:
  - Title
  - Description
  - Priority levels
  - Participants
  - Due Date
  - AI-generated descriptions

### Search & Filter
- Real-time task search
- Filter by status and title
- Dynamic results

### UI Components
- Responsive header with search
- Task cards with priority indicators
- Modal forms for task operations
- Loading states and error handling


## Docker Support
Included in root docker-compose.yml for containerized deployment.
