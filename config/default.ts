const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbLocalHost = process.env.DB_HOST;
const dbLocalPort = process.env.DB_PORT;
export default {
  port: 3000,
  dbUriCluster: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ec1ir.mongodb.net/clinica_database?retryWrites=true&w=majority`,
  dbLocalCluster: `mongodb://${dbLocalHost}:${dbLocalPort}/clinica_database`,
  env: "development",
};
