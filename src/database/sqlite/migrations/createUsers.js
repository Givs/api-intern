const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR UNIQUE,
        password VARCHAR,
        isAdmin BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO users (name, email, password, isAdmin) VALUES ('admin', 'admin@admin.com', '123456789', true);

`;

module.exports = createUsers;
