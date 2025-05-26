import http from "http";
import {v4 as uuidv4} from "uuid";
import JsonHandler from "../JsonHandler.mjs";

const server = http.createServer(async (req, res) => {

});

const PORT = 5010;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
