const { 
    client,
    getAllUsers,
    createUser
} = require('./index');

async function dropTables() {
    try {
        console.log("Starting to drop tables...");

        await client.query(`
          DROP TABLE IF EXISTS users;
        `);

        console.log("Finished dropping tables!")
    } catch (error) {
        console.error("Error dropping tables!")
        throw error;
    }
}

async function createTables() {
    try {
      console.log("Starting to build tables...");

      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(225) UNIQUE NOT NULL,
          password varchar(225) NOT NULL
        );
      `);

      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!")
      throw error;
    }
  }

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99' });
    console.log(albert);

    const sandra = await createUser({ username: 'sandra', password: 'sand123' });
    console.log(sandra);

    const glamgal = await createUser({ username: 'glamgal', password: 'glam123' });
    console.log(glamgal);

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    }
  }
  
  
  async function testDB() {
      try {
          console.log("Stating to test database...");
          
          const users = await getAllUsers();
          console.log("getAllUsers:", users);
          
          console.log("Finished database tests!");
        } catch (error) {
            console.error("Error testing database!");
            throw error;
        }
    }
    
rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end())