import mongoose, { Connection } from 'mongoose';

export const MONGO_OPTIONS = {
    minPoolSize: 5,
    maxPoolSize: 100,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

class DBConfiguration {

    constructor() {}
    
    private connection: any;
    private connectionURL = process.env.MONGO_CONNECTION_STR || 'mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority'

    async connectToDB(): Promise<Connection> {
        if (!this.connection) {
            try {
                await mongoose.connect(this.connectionURL, MONGO_OPTIONS);
                this.connection = mongoose.connection;
            } catch (error) {
                console.error(`Failed to connect to database at ${this.connectionURL}:`, error);
                //throw error;
            }
        }
        return this.connection;
    }


    async closeConnection(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.close();
                this.connection = null;
            } catch (error) {
                console.error(`Failed to close database connection at ${this.connectionURL}:`, error);
                throw error;
            }
        }
    }

}

export default new DBConfiguration();