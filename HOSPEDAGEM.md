# 🚀 Guia de Hospedagem - LeadRock Postback Tracker

Este guia mostra como hospedar seu projeto em diferentes plataformas.

## 📋 Opções de Hospedagem Recomendadas

### 1. **Render.com** (Recomendado - Grátis)
✅ Plano gratuito disponível  
✅ Suporte a Node.js  
✅ Banco SQLite funciona perfeitamente  
✅ Deploy automático via GitHub  

### 2. **Railway.app** (Recomendado - Grátis)
✅ $5 grátis por mês  
✅ Deploy muito simples  
✅ Suporte completo a Node.js  

### 3. **Fly.io** (Grátis)
✅ Plano gratuito generoso  
✅ Deploy rápido  

### 4. **Heroku** (Pago)
⚠️ Não tem mais plano gratuito  

---

## 🎯 Opção 1: Render.com (Passo a Passo)

### Passo 1: Preparar o Repositório
1. Crie uma conta no GitHub (se não tiver)
2. Crie um novo repositório
3. Faça upload dos arquivos do projeto

### Passo 2: Criar Conta no Render
1. Acesse: https://render.com
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"

### Passo 3: Conectar Repositório
1. Selecione seu repositório do GitHub
2. Configure:
   - **Name:** leadrock-postback-tracker
   - **Region:** Escolha mais próximo (ex: Frankfurt)
   - **Branch:** main
   - **Root Directory:** (deixe vazio)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Passo 4: Variáveis de Ambiente
Adicione (se necessário):
- `PORT` (geralmente não precisa, Render define automaticamente)

### Passo 5: Deploy
1. Clique em "Create Web Service"
2. Aguarde o deploy (5-10 minutos)
3. Seu site estará em: `https://seu-app.onrender.com`

### ⚠️ Importante no Render:
- O banco SQLite será criado automaticamente
- Dados persistem entre reinicializações
- O serviço pode "dormir" após 15min de inatividade (plano grátis)
- Para evitar isso, use um serviço de ping automático (ex: UptimeRobot)

---

## 🎯 Opção 2: Railway.app (Passo a Passo)

### Passo 1: Criar Conta
1. Acesse: https://railway.app
2. Faça login com GitHub

### Passo 2: Novo Projeto
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Escolha seu repositório

### Passo 3: Configuração Automática
O Railway detecta automaticamente que é Node.js e configura tudo!

### Passo 4: Deploy
1. Aguarde o deploy automático
2. Railway gera uma URL: `https://seu-app.up.railway.app`

### ⚠️ Importante no Railway:
- Banco SQLite funciona normalmente
- Dados persistem
- Plano gratuito: $5/mês de crédito

---

## 🎯 Opção 3: Fly.io (Passo a Passo)

### Passo 1: Instalar Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

### Passo 2: Login
```bash
fly auth login
```

### Passo 3: Criar App
```bash
fly launch
```

### Passo 4: Deploy
```bash
fly deploy
```

---

## 📝 Arquivos de Configuração

Criei os seguintes arquivos para facilitar o deploy:
- `render.yaml` - Para Render.com
- `fly.toml` - Para Fly.io (se necessário)

---

## 🔧 Configurações Importantes

### 1. URL do Postback na LeadRock
Após hospedar, configure na LeadRock:
```
https://seu-dominio.com/postback?sub_id1=...&sub_id2=...&...
```

### 2. Dashboard
Acesse:
```
https://seu-dominio.com/dashboard
```

### 3. Manter Servidor Ativo (Render Grátis)
Use serviços como:
- **UptimeRobot** (https://uptimerobot.com) - Grátis
- Configure para fazer ping a cada 5 minutos na URL do dashboard

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente antes de fazer commit

### Banco de dados não persiste
- No Render: Verifique se a pasta `database/` está sendo criada
- No Railway: Funciona automaticamente

### Servidor não inicia
- Verifique os logs na plataforma
- Confirme que o comando `npm start` está correto

---

## 📞 Suporte

Se tiver problemas, verifique:
1. Logs da plataforma de hospedagem
2. Se o banco de dados está sendo criado
3. Se a porta está configurada corretamente (geralmente automático)

---

## ✅ Checklist Antes de Hospedar

- [ ] Todos os arquivos estão no repositório
- [ ] `package.json` está correto
- [ ] `server.js` está funcionando localmente
- [ ] Testou a rota `/postback` localmente
- [ ] Testou o dashboard localmente

