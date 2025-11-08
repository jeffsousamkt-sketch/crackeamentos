# 🚀 Como Fazer Deploy Manual no Render

## 📍 Passo 1: Verificar Events (Histórico)

1. No painel do Render, na barra lateral esquerda
2. Clique em **"Events"** (ao lado de "Settings")
3. Veja o histórico de deploys
4. Clique no evento mais recente para ver detalhes
5. Isso pode mostrar por que o deploy foi cancelado

---

## 📍 Passo 2: Verificar Settings (Configurações)

1. Na barra lateral, clique em **"Settings"**
2. Verifique estas configurações:

### Build & Deploy:
- **Build Command:** Deve ser `npm install`
- **Start Command:** Deve ser `npm start`
- **Root Directory:** Deve estar **VAZIO** (não preencher nada)

### Source:
- **Repository:** Deve mostrar seu repositório GitHub
- **Branch:** Deve ser `main` ou `master`
- **Auto-Deploy:** Pode estar ativado

---

## 📍 Passo 3: Fazer Deploy Manual

### Opção A: Via Menu do Serviço

1. **Volte para a página principal** do serviço (clique em "crackeamento" no topo)
2. **Clique nos 3 pontinhos** (⋮) no canto direito da tabela
3. Selecione **"Manual Deploy"**
4. Escolha **"Deploy latest commit"**
5. Aguarde 5-10 minutos

### Opção B: Via Events

1. Vá em **"Events"**
2. Clique em **"Deploy"** ou **"+ New"**
3. Selecione **"Deploy latest commit"**

---

## 📍 Passo 4: Monitorar o Deploy

Após iniciar o deploy manual:

1. Vá em **"Logs"** novamente
2. Você deve ver logs aparecendo em tempo real
3. Aguarde até ver:
   - `==> Building...`
   - `==> npm install`
   - `==> npm start`
   - `✅ Pasta database criada`
   - `✅ Conectado ao banco de dados SQLite`
   - `==> Your service is live`

---

## 🔍 Verificar se Repositório está Conectado

1. Vá em **"Settings"**
2. Na seção **"Source"**, verifique:
   - **Repository:** Deve mostrar: `seu-usuario/seu-repositorio`
   - Se estiver vazio ou errado, você precisa reconectar

### Se o repositório não estiver conectado:

1. Vá em **"Settings"**
2. Role até **"Source"**
3. Clique em **"Connect account"** ou **"Change repository"**
4. Selecione seu repositório do GitHub
5. Salve

---

## ⚠️ Se Ainda Não Funcionar

### Verificar GitHub:

1. Acesse seu repositório no GitHub
2. Confirme que estes arquivos existem:
   - ✅ `server.js`
   - ✅ `package.json`
   - ✅ `public/index.html`
   - ✅ `database/.gitkeep` (ou pasta database)

### Criar Novo Serviço (Última Opção):

Se nada funcionar, você pode criar um novo serviço:

1. No Render, clique em **"+ New"** → **"Web Service"**
2. Conecte o mesmo repositório
3. Configure:
   - Build: `npm install`
   - Start: `npm start`
4. Crie o serviço

---

## 📝 Checklist Rápido

Antes de fazer deploy, confirme:

- [ ] Repositório GitHub está conectado no Render
- [ ] Todos os arquivos estão no GitHub
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Root Directory: **VAZIO**

---

## 🎯 Próximos Passos

1. **Verifique "Events"** para ver histórico
2. **Verifique "Settings"** para confirmar configurações
3. **Faça deploy manual** (passo 3)
4. **Monitore os logs** em tempo real
5. **Aguarde** status mudar para "Live"

Me avise o que você vê em "Events" e "Settings"!

