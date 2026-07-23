import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

/**
 * Start MongoDB Memory Server
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
  binary: {
    version: "7.0.14",
  },
});

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

/**
 * Clean database after every test
 */
afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
});

/**
 * Disconnect and stop MongoDB
 */
afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
});