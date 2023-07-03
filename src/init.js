import "./db";
import "./models/video";
import "./models/user";
import app from "./server";

const handleListening = () => console.log("Server listening on port 4000");
app.listen(4000, handleListening);