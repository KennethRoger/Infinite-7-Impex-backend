export const config = {
  port: process.env['PORT'] || 3000,
  mongo: {
    connectionString: process.env['MONGODB_CONNECTION_STRING'] || 'mongodb://localhost:27017',
    dbName: process.env['MONGODB_DB_NAME'] || 'infinite7_impex',
  },
};