# Full Stack Test Task

## Task Description

The goal of this task is to implement a user authentication module for a web application. This includes creating functionality for users to sign up and sign in, as well as a welcoming application page.

---

## Front-end Development

### Requirements

- **Framework**: Develop the authentication module using either React or Vue.
- **Design**: You have the creative freedom to design the UI elements. Feel free to choose any additional libraries or design frameworks as needed.

### Pages

1. **Sign-Up Page**
   - **Fields**: Email, Name, Password
   - **Password Requirements**:
     - Minimum length: 8 characters
     - Must include at least 1 letter
     - Must include at least 1 number
     - Must include at least 1 special character
   - **Functionality**: Redirect users to the application page upon successful signup.

2. **Sign-In Page**
   - **Fields**: Email, Password

3. **Application Page**
   - **Content**: Display a welcome message: `"Welcome to the application."`

---

## Back-end Development

### Technical Stack

- **Framework**: NestJS
- **Database**: MongoDB
- **Additional Libraries**: Choose appropriate ORM and libraries as needed

### API Endpoints

- **Sign-Up**: Endpoint to register a new user with email, name, and password.
- **Sign-In**: Endpoint to authenticate users with email and password.

### Notes

- Ensure API endpoints adhere to the front-end requirements.
- **Nice to Haves**:
  - Use TypeScript for type safety.
  - Add logging to the back end.
  - Follow security best practices.

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
