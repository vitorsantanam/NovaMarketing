import { spawn } from 'child_process';
import fs from 'fs';

const logPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\strapi_boot.log';
const logStream = fs.createWriteStream(logPath);

const server = spawn('npx', ['strapi', 'develop'], {
  cwd: 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend',
  shell: true
});

server.stdout.pipe(logStream);
server.stderr.pipe(logStream);

server.on('close', (code) => {
  logStream.write(`\n--- Strapi Exited with code: ${code} ---\n`);
});

console.log('Strapi process spawned in background. Check strapi_boot.log for output.');
process.exit(0);
