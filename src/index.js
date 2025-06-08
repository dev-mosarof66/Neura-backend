import 'dotenv/config'
import app from './app.js';
import connectDB from './db/db.js';
const port = process.env.PORT || 3000;


app.listen(port, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${port}`);

        })
})