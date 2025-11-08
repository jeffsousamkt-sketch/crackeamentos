# 🚀 Guia de Hospedagem na Hostinger

A Hostinger pode ser uma excelente opção! Depende do tipo de plano que você tem.

## 📊 Comparação: Hostinger vs Outras Opções

### ✅ Hostinger é MELHOR se você tem:
- **VPS Hostinger** - Controle total, melhor performance
- **Cloud Hosting Hostinger** - Escalável, suporta Node.js
- **Já paga pela Hostinger** - Não precisa criar conta nova

### ⚠️ Hostinger NÃO funciona bem com:
- **Hospedagem Compartilhada** - Não suporta Node.js adequadamente

---

## 🔍 Verificar seu Plano Hostinger

### Como saber qual plano você tem:

1. **Acesse o painel da Hostinger** (hpanel.hostinger.com)
2. **Vá em "Serviços"** ou "Meus Serviços"
3. **Verifique o tipo:**
   - Se for **"Hospedagem Web"** ou **"Shared Hosting"** → ❌ Não suporta Node.js bem
   - Se for **"VPS"** ou **"Cloud Hosting"** → ✅ Perfeito para Node.js!

---

## 🎯 Opção 1: Hostinger VPS (Recomendado se você tem)

### Passo 1: Acessar o VPS via SSH

1. No painel Hostinger, encontre:
   - **IP do servidor**
   - **Usuário SSH** (geralmente `root` ou `u123456789`)
   - **Senha SSH**

2. **Conecte via SSH:**
   ```bash
   # Windows (use PowerShell ou Git Bash)
   ssh root@seu-ip-hostinger
   ```

### Passo 2: Instalar Node.js no VPS

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js (versão 18 LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verificar instalação
node --version
npm --version
```

### Passo 3: Instalar PM2 (Gerenciador de Processos)

```bash
npm install -g pm2
```

### Passo 4: Fazer Upload dos Arquivos

**Opção A: Via Git (Recomendado)**
```bash
# Instalar Git
apt install -y git

# Clonar seu repositório
cd /home
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

**Opção B: Via FTP/SFTP**
- Use FileZilla ou WinSCP
- Conecte no servidor
- Faça upload de todos os arquivos para `/home/seu-projeto`

### Passo 5: Instalar Dependências e Iniciar

```bash
# Entrar na pasta do projeto
cd /home/seu-projeto

# Instalar dependências
npm install

# Iniciar com PM2
pm2 start server.js --name leadrock-tracker

# Salvar configuração PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
```

### Passo 6: Configurar Firewall

```bash
# Permitir porta 3000 (ou a que você usar)
ufw allow 3000/tcp
ufw enable
```

### Passo 7: Configurar Nginx como Proxy Reverso (Opcional mas Recomendado)

```bash
# Instalar Nginx
apt install -y nginx

# Criar configuração
nano /etc/nginx/sites-available/leadrock-tracker
```

**Conteúdo do arquivo:**
```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar site
ln -s /etc/nginx/sites-available/leadrock-tracker /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Passo 8: Configurar SSL (HTTPS) com Let's Encrypt

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

---

## 🎯 Opção 2: Hostinger Cloud Hosting

Se você tem Cloud Hosting da Hostinger:

1. **Acesse o painel** (hpanel.hostinger.com)
2. **Procure por "Node.js"** ou "Aplicações"
3. **Configure:**
   - **Versão Node.js:** 18.x ou superior
   - **Pasta raiz:** `/public_html` ou pasta específica
   - **Arquivo de entrada:** `server.js`
   - **Comando de build:** `npm install`
   - **Porta:** Geralmente automática ou 3000

4. **Faça upload dos arquivos via FTP/File Manager**

5. **Acesse seu domínio** - deve funcionar automaticamente!

---

## 🎯 Opção 3: Hostinger Hospedagem Compartilhada

⚠️ **NÃO RECOMENDADO** - Hospedagem compartilhada não suporta Node.js adequadamente.

**Alternativas:**
1. **Upgrade para VPS** (melhor opção)
2. **Use Render.com ou Railway** (gratuitos e mais fáceis)
3. **Use Hostinger Cloud Hosting** (se disponível no seu plano)

---

## 📝 Configurações Específicas para Hostinger

### Ajustar Porta no server.js

Se a Hostinger exigir uma porta específica, edite `server.js`:

```javascript
const PORT = process.env.PORT || 3000; // Já está configurado assim
```

A Hostinger geralmente define `process.env.PORT` automaticamente.

### Banco de Dados SQLite

O SQLite funciona normalmente na Hostinger VPS/Cloud. O banco será criado em:
```
/home/seu-projeto/database/data.db
```

---

## 🔧 Comandos Úteis PM2

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs leadrock-tracker

# Reiniciar
pm2 restart leadrock-tracker

# Parar
pm2 stop leadrock-tracker

# Deletar
pm2 delete leadrock-tracker
```

---

## ✅ Vantagens da Hostinger

✅ **Controle total** (VPS)  
✅ **Performance** (dedicada)  
✅ **Custo-benefício** (se já paga)  
✅ **Suporte em português**  
✅ **Domínio próprio** fácil de configurar  

---

## ⚠️ Desvantagens vs Render/Railway

❌ **Mais complexo** de configurar  
❌ **Precisa gerenciar servidor** (atualizações, segurança)  
❌ **Sem deploy automático** (precisa fazer upload manual ou configurar CI/CD)  

---

## 🎯 Recomendação Final

### Use Hostinger se:
- ✅ Você já tem VPS ou Cloud Hosting
- ✅ Quer controle total
- ✅ Tem conhecimento técnico básico
- ✅ Quer usar seu domínio próprio

### Use Render/Railway se:
- ✅ Quer algo mais simples
- ✅ Quer deploy automático
- ✅ Não quer gerenciar servidor
- ✅ Está começando agora

---

## 📞 Suporte Hostinger

Se tiver dúvidas específicas da Hostinger:
- **Chat ao vivo** no painel
- **Ticket de suporte**
- **Base de conhecimento** da Hostinger

---

## 🚀 Próximos Passos

1. **Verifique seu plano** na Hostinger
2. **Escolha a opção** (VPS, Cloud, ou mude para Render)
3. **Siga o guia** correspondente acima
4. **Teste o postback** após deploy

Precisa de ajuda com algum passo específico? Me diga qual plano você tem na Hostinger!

