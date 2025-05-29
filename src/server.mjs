import { app } from "./app.mjs";

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`Server listening: PORT http://localhost:${PORT} och kör i läget ${process.env.NODE_ENV}`));
