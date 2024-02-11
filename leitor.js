import http from 'http';
import { readFile } from 'fs';
import { promisify } from 'util';
import neatCsv from 'neat-csv';

const readFileAsync = promisify(readFile);

const server = http.createServer(async (req, res) => {
  try {
    const data = await readFileAsync('arquivo.csv');

    const parsedData = await neatCsv(data);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(parsedData));
  } catch (err) {
    console.error(err);

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
