import "dotenv/config";
import "./db";
import "./models/video";
import "./models/user";
import "./models/comment"
import app from "./server";
const PORT = process.env.PORT || 4000;
const handleListening = () => console.log(`Server listening on port ${PORT}`);
app.listen(PORT, handleListening);