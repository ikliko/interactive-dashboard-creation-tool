# Interactive Dashboard Creation Tool - Project Plan

## Overview
Develop a web-based application that enables the creation of interactive dashboards with
drag-and-drop modules. The tool should allow users, especially non-technical team members like
marketers, to easily design and customize dashboards for data visualization and analysis.

## Approach Technology Stack:
**Frontend:** React.js for the interactive UI.

**Backend:** Node.js with Express for server-side logic.

**Database:** MongoDB for storing user data and dashboard configurations.

**Real-time updates:** WebSocket for live price updates.

**Authentication:** JWT for token-based authentication.

**Testing:** Jest and Enzyme for frontend testing, Mocha and Chai for backend testing.

**Containerization:** Docker for containerization.

## Project Structure:

### Frontend Structure:
- drag-and-drop
- customization options - color schemes
- Utilize Redux for state management

### Backend Structure:
- Express routes for user authentication
- dashboard creation, and data integration
- WebSocket for real-time price updates
- Mongoose for MongoDB integration 

### Drag-and-Drop:
- React DnD for implementing the drag-and-drop functionality. 
- Allow users to add charts, graphs, and tables onto a canvas.

### Customization Options:
- color schemes
- data source selection
- visualization type options
- implementing libs like Chart.js or D3.js for chart customization.

### Data Integration:
- Support integration with CSV files, databases, and APIs.
- Utilize Express middleware for handling different data sources.

### Real-time Updates:
- Implement WebSocket for real-time price updates.

### User Authentication:
- JWT-based authentication for secure user access.
- Include routes for signup, login, change password, password recovery, and email validation.

### Export and Sharing:
- Allow users to export dashboards in PDF and CSV formats.
- Implement a sharing mechanism for team collaboration. 

## Development Process

### Test-Driven Development (TDD):
- Write unit tests for each component and functionality before actual development.
- Follow a Red-Green-Refactor approach.

### Version Control:
- Use Git for version control.
- Commit regularly with clear and concise messages.
- Feature branches for each task.

### Dockerization:
- Dockerize the entire application stack for easy deployment and scalability.
- Use Docker Compose for managing multiple containers.

## Price Ticker Development
### Real-time Price Ticker:

- Develop a real-time price ticker that simulates market activity.
- Use WebSocket to push updates to the frontend.

## Authentication Development

### Signup:
- Implement user signup functionality with email validation.
- Store user data securely in MongoDB.

### Login:
- Create a secure login mechanism using JWT.

### Change Password:
- Allow users to change their passwords securely.

### Password Recovery:
- Implement a password recovery mechanism via email.


# Start project

Backend