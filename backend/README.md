# Catálogo de Carros - Backend API

## Description
Backend API for car catalog application with vehicle listing, details viewing, and contact form functionality.

## Features
- Vehicle listing with filtering and sorting
- Detailed vehicle information
- Contact form submission
- RESTful API architecture
- Multi-tenancy support
- TypeScript implementation

## Technology Stack
- Node.js
- Express.js
- TypeScript
- MS SQL Server
- Zod (validation)

## Prerequisites
- Node.js 18+ installed
- MS SQL Server instance
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd catalogo-carros-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations
```bash
# Execute SQL scripts in database/ folder
```

## Development

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Run tests
```bash
npm test
```

### Lint code
```bash
npm run lint
npm run lint:fix
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Version 1
Base URL: `/api/v1`

#### External Routes (Public)
- Coming soon

#### Internal Routes (Authenticated)
- Coming soon

## Project Structure
```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── instances/        # Service instances
└── server.ts         # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| DB_SERVER | Database server | localhost |
| DB_PORT | Database port | 1433 |
| DB_NAME | Database name | catalogo_carros |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_ENCRYPT | Enable encryption | true |
| CORS_ORIGINS | Allowed CORS origins | - |

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

## License
ISC
