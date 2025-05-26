import http from "http";
import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data", "donations.json");

const server = http.createServer(async (req, res) => {
    const { method } = req;
    
    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const donations = JSON.parse(fileContent);

        if (method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(donations));
        }
        
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
        await fs.writeFile(filePath, JSON.stringify(donations), "utf-8");
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
});

const PORT = 5010;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
