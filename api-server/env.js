export default {
  port: 3000,
  db_impl: "./db_mongodb.js",
  keys_files: {
    openai: "key_openai.json",
    firestore_admin: "key_firebase.json",
  },
  mongodb: {
    url: "mongodb+srv://cluster0.ir6ye.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0",
    db: "zoetrope",
    key_file: "key_mongodb.pem",
  },
  firestore: {
    key_file: "key_firebase.json",
  }
}
