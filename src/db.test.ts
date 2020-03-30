import { connectDB } from "./db";

test("database connects", async () => {
    const db = await connectDB();
    expect(db.isConnected).toBe(true);
    db.close();
});
