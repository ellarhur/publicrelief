import fs from "fs/promises";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class JsonHandler {
    #filePath = undefined;
    constructor(folder, filename) {
        this.#filePath = path.join(__dirname,folder,filename);
    }
async readFromFile() {
    const content = await fs.readFile(this.#filePath, "UTF-8");
    return JSON.parse(content);
}
async writeToFile(data) {
    await fs.writeFile(this.#filePath, data, "UTF-8");
}
async addToFile(data) {
    const content = await this.readFromFile();
    content.push(data);
    await this.writeToFile(content);
}
}