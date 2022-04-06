import { server } from "./app";
import { PORT } from "./constants";

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
