# ----------------
# Signup Endpoint
# ----------------
Endpoint: POST /users/signup
Description: This endpoint is used to register a new user.

Request Body: JSON

{
  "username": "<username>",
  "password": "<password>",
  "email": "<email>"
}

200 OK: If the account is created successfully, the server will respond with a status of 200 and a message of ‘Account created successfully!’.
400 Bad Request: If the username or email is already in use, the server will respond with a status of 400 and a message of ‘Username or Email already in use.’. (response.msg)
500 Internal Server Error: If there is an internal server error, the server will respond with a status of 500 and a message of ‘Error 500: Internal Server Error’.

# ---------------
# Login Endpoint
# ---------------
Endpoint: POST /users/login
Description: This endpoint is used to authenticate a user.

Request Body: JSON

{
  "usernameOrEmail": "<username or email>",
  "password": "<password>"
}

200 OK: If the username/email and password match an existing user, the server will respond with a status of 200 and a JSON object containing the username, email, and a JWT token.
400 Bad Request: If the username/email or password is incorrect, the server will respond with a status of 400 and a message of ‘Wrong password or username/email’.
500 Internal Server Error: If there is an internal server error, the server will respond with a status of 500 and a message of ‘Error 500: Internal Server Error’.

Sources:
Large parts of this documentation and some of the underlying code were created by
Generative AI at https://www.bing.com/search?q=Bing+AI&showconv=1&ntref=1 (last accessed 7.1.2024)