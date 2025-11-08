const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Criar pasta database se não existir
const databaseDir = path.join(__dirname, 'database');
console.log('📁 Diretório do projeto:', __dirname);
console.log('📁 Tentando criar/verificar pasta database:', databaseDir);

try {
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
    console.log('✅ Pasta database criada:', databaseDir);
  } else {
    console.log('✅ Pasta database já existe:', databaseDir);
  }
  
  // Verificar permissões
  const stats = fs.statSync(databaseDir);
  console.log('📊 Permissões da pasta:', stats.mode.toString(8));
  console.log('📊 É diretório?', stats.isDirectory());
  
  // Testar se podemos escrever na pasta
  const testFile = path.join(databaseDir, '.test-write');
  try {
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ Pasta tem permissão de escrita');
  } catch (writeErr) {
    console.error('❌ Pasta NÃO tem permissão de escrita:', writeErr.message);
  }
} catch (err) {
  console.error('❌ Erro ao criar/verificar pasta database:', err.message);
  console.error('Stack:', err.stack);
}

// Caminho do banco de dados
const dbPath = path.join(__dirname, 'database', 'data.db');
console.log('📁 Caminho completo do banco:', dbPath);

// Verificar se o diretório pai existe antes de criar o banco
if (!fs.existsSync(databaseDir)) {
  console.error('❌ Diretório database não existe após tentativa de criação!');
}

// Inicializar banco de dados com modo de escrita
let db;
try {
  // Tentar criar o arquivo vazio primeiro para garantir permissões
  if (!fs.existsSync(dbPath)) {
    try {
      fs.writeFileSync(dbPath, '');
      console.log('✅ Arquivo data.db criado com sucesso');
    } catch (fileErr) {
      console.error('❌ Erro ao criar arquivo data.db:', fileErr.message);
    }
  }
  
  db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('❌ Erro ao conectar ao banco de dados:', err.message);
      console.error('Caminho tentado:', dbPath);
      console.error('Diretório existe?', fs.existsSync(databaseDir));
      if (fs.existsSync(databaseDir)) {
        try {
          const stats = fs.statSync(databaseDir);
          console.error('Permissões do diretório:', stats.mode.toString(8));
          console.error('É diretório?', stats.isDirectory());
        } catch (statErr) {
          console.error('Erro ao verificar permissões:', statErr.message);
        }
      }
      // Tentar verificar se o arquivo existe
      console.error('Arquivo data.db existe?', fs.existsSync(dbPath));
    } else {
      console.log('✅ Conectado ao banco de dados SQLite');
      console.log('📁 Caminho do banco:', dbPath);
      // Criar tabela se não existir
      db.run(`CREATE TABLE IF NOT EXISTS conversions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sub_id1 TEXT,
        sub_id2 TEXT,
        sub_id3 TEXT,
        offer_id TEXT,
        status TEXT,
        payout REAL,
        date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('❌ Erro ao criar tabela:', err.message);
        } else {
          console.log('✅ Tabela conversions criada/verificada');
        }
      });
    }
  });
} catch (dbErr) {
  console.error('❌ Erro ao inicializar banco de dados:', dbErr.message);
  console.error('Stack:', dbErr.stack);
  // Criar um banco "mock" para não quebrar a aplicação
  db = null;
}

// Rota para receber postback da LeadRock
app.get('/postback', (req, res) => {
  const { sub_id1, sub_id2, sub_id3, offer_id, status, payout, date } = req.query;

  // Log dos dados recebidos
  console.log('\n📥 POSTBACK RECEBIDO:');
  console.log('  - Campanha (sub_id1):', sub_id1 || 'N/A');
  console.log('  - Conjunto (sub_id2):', sub_id2 || 'N/A');
  console.log('  - Anúncio (sub_id3):', sub_id3 || 'N/A');
  console.log('  - Offer ID:', offer_id || 'N/A');
  console.log('  - Status:', status || 'N/A');
  console.log('  - Payout:', payout || 'N/A');
  console.log('  - Data:', date || 'N/A');
  console.log('  - Timestamp:', new Date().toISOString());

  // Verificar se banco está disponível
  if (!db) {
    console.error('❌ Banco de dados não está disponível');
    return res.status(500).json({ success: false, error: 'Banco de dados não disponível' });
  }

  // Salvar no banco de dados
  const sql = `INSERT INTO conversions (sub_id1, sub_id2, sub_id3, offer_id, status, payout, date) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [sub_id1 || null, sub_id2 || null, sub_id3 || null, offer_id || null, 
               status || null, payout ? parseFloat(payout) : null, date || null], function(err) {
    if (err) {
      console.error('❌ Erro ao salvar no banco:', err.message);
      return res.status(500).json({ success: false, error: 'Erro ao salvar dados' });
    }
    
    console.log('✅ Dados salvos com sucesso (ID:', this.lastID + ')');
    res.json({ success: true, id: this.lastID });
  });
});

// Rota API para buscar conversões
app.get('/api/conversions', (req, res) => {
  // Verificar se banco está disponível
  if (!db) {
    console.error('❌ Banco de dados não está disponível');
    return res.status(500).json({ error: 'Banco de dados não disponível' });
  }

  const sql = `SELECT * FROM conversions ORDER BY created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar conversões:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
    
    res.json(rows);
  });
});

// Rota para o dashboard
app.get('/dashboard', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  console.log('📄 Tentando servir:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Erro ao servir index.html:', err.message);
      res.status(500).send('Erro ao carregar dashboard');
    }
  });
});

// Rota raiz redireciona para dashboard
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Verificar se arquivos essenciais existem
const indexPath = path.join(__dirname, 'public', 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ Arquivo index.html encontrado:', indexPath);
} else {
  console.error('❌ Arquivo index.html NÃO encontrado em:', indexPath);
  console.log('📁 Diretório atual:', __dirname);
  console.log('📁 Conteúdo de public:', fs.existsSync(path.join(__dirname, 'public')) ? 'existe' : 'não existe');
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`📥 Postback URL: http://localhost:${PORT}/postback?sub_id1=...&sub_id2=...&...\n`);
});

// Fechar banco ao encerrar aplicação
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('✅ Conexão com banco de dados fechada.');
    process.exit(0);
  });
});

