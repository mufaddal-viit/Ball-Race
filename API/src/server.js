import app from "./app.js";
import { port } from "./config/env.js";

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
