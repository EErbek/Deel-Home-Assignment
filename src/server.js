const app = require('./app');
const sequelize = require('./models');


async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    try {
        app.listen(3001, () => {
            console.log('Express App Listening on Port 3001');
        });
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}

init();