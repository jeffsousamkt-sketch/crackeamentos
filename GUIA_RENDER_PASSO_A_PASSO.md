# 🚀 Guia Completo - Deploy no Render.com

Guia passo a passo detalhado para hospedar seu projeto no Render.

---

## 📋 Pré-requisitos

- ✅ Conta no GitHub (grátis)
- ✅ Projeto funcionando localmente
- ✅ 15-20 minutos de tempo

---

## 📝 PASSO 1: Criar Conta no GitHub

### Se você NÃO tem conta no GitHub:

1. Acesse: https://github.com
2. Clique em **"Sign up"** (canto superior direito)
3. Preencha:
   - Username (ex: seu-nome)
   - Email
   - Senha
4. Verifique seu email
5. Pronto! ✅

### Se você JÁ tem conta:
Pule para o Passo 2.

---

## 📝 PASSO 2: Fazer Upload do Projeto para GitHub

### Opção A: Via Interface Web do GitHub (Mais Fácil)

1. **Acesse:** https://github.com e faça login

2. **Clique no "+"** (canto superior direito) → **"New repository"**

3. **Preencha:**
   - **Repository name:** `leadrock-postback-tracker` (ou qualquer nome)
   - ✅ Marque **"Public"** (pode ser privado também)
   - ❌ **NÃO marque** "Add a README file"
   - ❌ **NÃO marque** "Add .gitignore"
   - ❌ **NÃO marque** "Choose a license"
   - Clique em **"Create repository"**

4. **GitHub mostrará instruções.** Siga estas opções:

   **Se você tem Git instalado:**
   ```bash
   # Abra o PowerShell ou Terminal na pasta do projeto
   cd "C:\Users\gladstone\Desktop\PROJETOS J\crackeamentojf"
   
   git init
   git add .
   git commit -m "Primeiro commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/leadrock-postback-tracker.git
   git push -u origin main
   ```
   *(Substitua SEU-USUARIO pelo seu username do GitHub)*

   **Se você NÃO tem Git instalado:**
   - Use a opção **"uploading an existing file"**
   - Arraste TODOS os arquivos do projeto para a página
   - Clique em **"Commit changes"**

5. **Verifique:** Seus arquivos devem aparecer no repositório GitHub

---

### Opção B: Via Git (Se já tem instalado)

```bash
# Na pasta do projeto
cd "C:\Users\gladstone\Desktop\PROJETOS J\crackeamentojf"

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Primeiro commit"

# Conectar ao GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/leadrock-postback-tracker.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

---

## 📝 PASSO 3: Criar Conta no Render

1. **Acesse:** https://render.com

2. **Clique em "Get Started for Free"** ou **"Sign Up"**

3. **Escolha:** **"Sign up with GitHub"** (recomendado)
   - Isso conecta sua conta GitHub ao Render
   - Facilita muito o processo

4. **Autorize o Render** a acessar seus repositórios GitHub
   - Clique em **"Authorize render"**

5. **Pronto!** Você está logado no Render ✅

---

## 📝 PASSO 4: Criar Novo Web Service

1. **No dashboard do Render**, clique no botão **"New +"** (canto superior direito)

2. **Selecione:** **"Web Service"**

3. **Conectar Repositório:**
   - Se você conectou com GitHub, verá seus repositórios
   - **Selecione:** `leadrock-postback-tracker` (ou o nome que você deu)
   - Clique em **"Connect"**

---

## 📝 PASSO 5: Configurar o Deploy

Preencha os campos com estas configurações:

### Configurações Básicas:

- **Name:** `leadrock-postback-tracker` (ou qualquer nome)
  - Este será o nome do seu serviço

- **Region:** Escolha a região mais próxima
  - **Recomendado:** `Frankfurt (EU)` ou `Oregon (US West)`
  - Para Brasil, Frankfurt geralmente é melhor

- **Branch:** `main` (ou `master` se seu repositório usa master)

- **Root Directory:** *(deixe vazio)*

### Configurações de Build e Deploy:

- **Runtime:** `Node`
  - Render detecta automaticamente, mas confirme que está "Node"

- **Build Command:** 
  ```
  npm install
  ```

- **Start Command:**
  ```
  npm start
  ```

### Plano:

- **Plano:** Selecione **"Free"** (gratuito)
  - ✅ Funciona perfeitamente para este projeto

### Variáveis de Ambiente (Opcional):

- **NODE_ENV:** `production` (opcional, mas recomendado)
  - Clique em **"Add Environment Variable"**
  - Key: `NODE_ENV`
  - Value: `production`

---

## 📝 PASSO 6: Criar o Serviço

1. **Revise todas as configurações** acima

2. **Clique em:** **"Create Web Service"**

3. **Render começará o deploy automaticamente!**
   - Você verá logs em tempo real
   - Primeira vez pode levar 5-10 minutos

---

## 📝 PASSO 7: Aguardar o Deploy

Você verá uma tela com logs. Aguarde até ver:

```
✅ Build successful
✅ Your service is live
```

**Tempo estimado:** 5-10 minutos na primeira vez

---

## 📝 PASSO 8: Acessar seu Site

Após o deploy concluir:

1. **Render mostrará uma URL:**
   - Exemplo: `https://leadrock-postback-tracker.onrender.com`

2. **Teste o Dashboard:**
   - Acesse: `https://seu-app.onrender.com/dashboard`
   - Deve mostrar a interface do dashboard

3. **Teste o Postback:**
   - URL: `https://seu-app.onrender.com/postback?sub_id1=Teste&sub_id2=Teste2&sub_id3=Teste3&offer_id=123&status=FTD&payout=25.00&date=2025-11-08`
   - Abra no navegador
   - Deve retornar: `{"success":true,"id":1}`

---

## 📝 PASSO 9: Configurar na LeadRock

Agora que seu site está online:

1. **Copie a URL do postback:**
   ```
   https://seu-app.onrender.com/postback
   ```

2. **Configure na LeadRock:**
   - Acesse o painel da LeadRock
   - Vá em configurações de postback
   - Cole a URL acima
   - Salve

3. **Pronto!** Os postbacks serão recebidos automaticamente ✅

---

## ⚠️ IMPORTANTE: Serviço "Dormindo" (Plano Grátis)

### O Problema:
No plano grátis, o Render "dorme" após **15 minutos de inatividade**. Quando alguém acessa, ele "acorda" mas pode levar 30-60 segundos.

### Solução: Manter Servidor Ativo

**Opção 1: UptimeRobot (Recomendado - Grátis)**

1. Acesse: https://uptimerobot.com
2. Crie conta grátis
3. Clique em **"Add New Monitor"**
4. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** LeadRock Tracker
   - **URL:** `https://seu-app.onrender.com/dashboard`
   - **Monitoring Interval:** 5 minutes
5. Salve
6. Pronto! O UptimeRobot fará ping a cada 5 minutos, mantendo seu servidor ativo

**Opção 2: Ping Automático (Alternativa)**
- Use serviços como: cron-job.org, EasyCron, etc.
- Configure para acessar sua URL a cada 5 minutos

---

## 🔧 Atualizar o Projeto (Futuro)

Quando você fizer alterações no código:

1. **Faça commit e push para GitHub:**
   ```bash
   git add .
   git commit -m "Atualização"
   git push
   ```

2. **Render detecta automaticamente** e faz novo deploy!

3. **Aguarde 2-5 minutos** para o deploy concluir

---

## 🐛 Solução de Problemas

### Erro: "Build failed"
- Verifique se todos os arquivos estão no GitHub
- Confirme que `package.json` está correto
- Veja os logs de erro no Render

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Confirme que o Build Command é `npm install`

### Site não carrega
- Aguarde alguns minutos (primeira vez é mais lento)
- Verifique os logs no Render
- Confirme que o Start Command é `npm start`

### Postback não funciona
- Verifique a URL completa
- Confirme que está usando HTTPS (não HTTP)
- Veja os logs no Render para erros

---

## ✅ Checklist Final

- [ ] Conta GitHub criada
- [ ] Projeto enviado para GitHub
- [ ] Conta Render criada
- [ ] Web Service criado no Render
- [ ] Deploy concluído com sucesso
- [ ] Dashboard acessível
- [ ] Postback testado e funcionando
- [ ] UptimeRobot configurado (opcional mas recomendado)

---

## 🎉 Pronto!

Seu site está online e funcionando!

**URLs importantes:**
- Dashboard: `https://seu-app.onrender.com/dashboard`
- Postback: `https://seu-app.onrender.com/postback`

**Próximos passos:**
1. Configure o postback na LeadRock
2. Configure UptimeRobot para manter ativo
3. Monitore os logs no Render quando necessário

---

## 📞 Precisa de Ajuda?

Se tiver problemas:
1. Verifique os logs no Render (aba "Logs")
2. Confirme que todos os arquivos estão no GitHub
3. Teste localmente primeiro (`npm start`)

Boa sorte! 🚀

