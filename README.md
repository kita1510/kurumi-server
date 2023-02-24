The format of the <b>connection URL</b> for your database depends on the database you use. For <b>PostgreSQL</b>, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

<code>postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA</code>

<ul><h3>Here's a short explanation of each component:</h3>
  <li>USER: The name of your database user</li>
  <li>PASSWORD: The password for your database user</li>
  <li>HOST: The name of your host name (for the local environment, it is localhost)</li>
  <li>ORT: The port where your database server is running (typically 5432 for PostgreSQL)</li>
  <li>DATABASE: The name of the database</li>
  <li>SCHEMA: The name of the schema inside the database</li>
</ul>

  

