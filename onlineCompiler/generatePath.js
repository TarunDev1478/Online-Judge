import fs from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generatePath = async (language, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, code);
    console.log(`Generated file at: ${filepath}`); 
    return filepath;
};

export default generatePath;
