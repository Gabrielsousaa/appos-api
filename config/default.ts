const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
export default {
  port: 3000,
  dbUri: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ec1ir.mongodb.net/clinica_database?retryWrites=true&w=majority`,
  env: "development",
};
