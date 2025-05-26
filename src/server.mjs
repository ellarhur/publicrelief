import http from "http";
import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data", "donations.json");

try {
    const server = http.createServer((req, res)=> {
        const { method } = req;
        const fileContent = await fs.readFile(filePath, "utf-8");
const donations = JSON.parse(fileContent);

        if (method === "GET") {
            res.writeHead(200,  { "Content-Type", "application/json"});
            res.end(donations, "utf-8");
            
// const donation = {
//     id: uuidv4().replaceAll("-", ""),
//     donor: "Ella Belle",
//     email: "ella@publicrelief.com",
//     amount: 100,
//     date: "2025-05-26",
//     currency: "USD",
//     project: "Sudan war",
//     message: "Thanks for your work!",
//     timestamp: Date.now(),
// };

// donations.push(donation);

// await fs.writeFile(filePath, JSON.stringify(donations), "utf-8");

const PORT = 5010;
Server.LISTEN(prototype, () => console.log(`Server is listening on port ${PORT}`))

});
} catch (error) {
    console.error(error);
}