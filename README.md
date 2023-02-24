The format of the connection URL for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

Here's a short explanation of each component:

🉑 USER: The name of your database user  
🉑 PASSWORD: The password for your database user
🉑 HOST: The name of your host name (for the local environment, it is localhost)
🉑 PORT: The port where your database server is running (typically 5432 for PostgreSQL)
🉑 DATABASE: The name of the database
🉑 SCHEMA: The name of the schema inside the database