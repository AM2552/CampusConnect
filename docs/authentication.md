# -----------------------------
# JWT Authentication Middleware
# -----------------------------
This document provides a brief overview of the JWT authentication middleware used in the application.

## Dependencies

const jwt = require('jsonwebtoken');

We use the jsonwebtoken package for handling JSON Web Tokens.

## Middleware Function: verifyToken

function verifyToken(req, res, next) {
    const token = req.header('auth-token').split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;

        next();
        
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;

The verifyToken function is a middleware that verifies the JWT from the ‘auth-token’ header of the incoming request. If the token is not present or is invalid, it sends an appropriate response. If the token is valid, it attaches the decoded user information to the request object and calls the next middleware function. The JWT_SECRET is a secret key used for signing and verifying the JWT. It’s recommended to store this in an environment variable for security reasons!

## Example Usage

router.post("/", verifyToken, async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

The verifyToken middleware is used in the route handlers before the actual handler function. This ensures that the route is protected and only accessible to authenticated users. The user information can be accessed from req.user in the route handler.

# ----------------------------------
# Client Side Authentication Helper
# ----------------------------------
This document provides a brief overview of the client-side authentication helper used in the application.

## Dependencies

import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

## AuthProvider Component

const AuthProvider = ({ children }) => {...};

export default AuthProvider;

The AuthProvider component is a context provider for our AuthContext. It maintains the authentication state and provides the loginAction and logOut functions to handle user login and logout respectively.

## useAuth Hook

export const useAuth = () => {...};

The useAuth hook is a custom hook that provides an easy way to access our AuthContext from any component.

## Using token, user, and authState
You can use the useAuth hook to access token, user, and authState in any component. Here’s an example:

import { useAuth } from "./AuthProvider";

const MyComponent = () => {
  const { token, user, authState } = useAuth();

  return (
    <div>
      <p>User: {user}</p>
      <p>Token: {token}</p>
      <p>Is Authenticated: {authState ? "Yes" : "No"}</p>
    </div>
  );
};

In this example, MyComponent displays the current user, their token, and whether they’re authenticated.

## Using loginAction
The loginAction function can be used in a login form. Here’s an example:

import { useAuth } from "./AuthProvider";

const LoginForm = () => {
  const { loginAction } = useAuth();
  let username, password;

  const handleSubmit = (event) => {
    event.preventDefault();
    loginAction({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => username = e.target.value} placeholder="Username" required />
      <input type="password" onChange={(e) => password = e.target.value} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

In this example, LoginForm uses loginAction to authenticate the user when the form is submitted.

## Using logOut
The logOut function can be used in a logout button. Here’s an example:

import { useAuth } from "./AuthProvider";

const LogoutButton = () => {
  const { logOut } = useAuth();

  return (
    <button onClick={logOut}>Logout</button>
  );
};

In this example, LogoutButton uses logOut to log the user out when the button is clicked. After logging out, the user will be redirected to the home page.

Sources: 
https://www.youtube.com/watch?v=KgXT63wPMPc&ab_channel=PedroTech (last accessed 5.1.2024) 
-> https://github.com/machadop1407/JWT-Authentication-NodeJS (last accessed 6.1.2024) 
-> https://github.com/machadop1407/Full-Stack-Client (last accessed 6.1.2024) 
https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5 (last accessed 6.1.2024)
Large parts of this documentation and some of the underlying code were created by
Generative AI at https://www.bing.com/search?q=Bing+AI&showconv=1&ntref=1 (last accessed 7.1.2024)