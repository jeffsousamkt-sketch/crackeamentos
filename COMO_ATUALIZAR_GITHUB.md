# 📤 Como Atualizar Arquivos no GitHub

Guia simples para enviar suas alterações para o GitHub.

---

## 🔍 Primeiro: Verificar se tem Git Instalado

### No Windows (PowerShell ou CMD):

```bash
git --version
```

**Se aparecer uma versão** (ex: `git version 2.40.0`):
- ✅ Git está instalado → Use **Opção 1** abaixo

**Se aparecer erro** (ex: `'git' não é reconhecido`):
- ❌ Git não está instalado → Use **Opção 2** abaixo

---

## ✅ OPÇÃO 1: Via Git (Se você tem Git instalado)

### Passo 1: Abrir Terminal na Pasta do Projeto

1. Abra o **PowerShell** ou **CMD**
2. Navegue até a pasta do projeto:

```bash
cd "C:\Users\gladstone\Desktop\PROJETOS J\crackeamentojf"
```

### Passo 2: Verificar Status

```bash
git status
```

Isso mostra quais arquivos foram modificados.

### Passo 3: Adicionar Todos os Arquivos

```bash
git add .
```

Isso prepara todos os arquivos modificados para envio.

### Passo 4: Fazer Commit

```bash
git commit -m "Corrigir problemas no Render"
```

*(Você pode mudar a mensagem entre aspas)*

### Passo 5: Enviar para GitHub

```bash
git push
```

**Se pedir login:**
- Username: seu username do GitHub
- Password: use um **Personal Access Token** (não sua senha normal)
  - Como criar token: https://github.com/settings/tokens

**Pronto!** ✅ Os arquivos foram atualizados no GitHub.

---

## ✅ OPÇÃO 2: Via Interface Web do GitHub (Mais Fácil)

### Passo 1: Acessar seu Repositório

1. Acesse: https://github.com
2. Faça login
3. Vá no seu repositório (ex: `leadrock-postback-tracker`)

### Passo 2: Editar Arquivo Individual

**Para atualizar um arquivo específico:**

1. Clique no arquivo que quer atualizar (ex: `server.js`)
2. Clique no ícone de **lápis** (✏️) no canto superior direito
3. Faça suas alterações
4. Role até o final da página
5. Em **"Commit changes"**, escreva uma mensagem (ex: "Corrigir problemas no Render")
6. Clique em **"Commit changes"**

### Passo 3: Upload de Múltiplos Arquivos

**Para atualizar vários arquivos de uma vez:**

1. No seu repositório GitHub, clique em **"Add file"** → **"Upload files"**
2. **Arraste** os arquivos modificados para a página
   - Ou clique em **"choose your files"** e selecione
3. Role até o final
4. Em **"Commit changes"**, escreva uma mensagem
5. Clique em **"Commit changes"**

**⚠️ Importante:** Você precisa fazer upload de TODOS os arquivos modificados.

---

## 🎯 Método Recomendado: Git (Opção 1)

Se você ainda não tem Git instalado, recomendo instalar:

### Instalar Git no Windows:

1. Baixe: https://git-scm.com/download/win
2. Execute o instalador
3. Use as opções padrão (Next, Next, Install)
4. Reinicie o terminal

Depois, use a **Opção 1** acima.

---

## 📝 Resumo Rápido (Git)

```bash
# 1. Ir para a pasta do projeto
cd "C:\Users\gladstone\Desktop\PROJETOS J\crackeamentojf"

# 2. Ver o que mudou
git status

# 3. Adicionar tudo
git add .

# 4. Fazer commit
git commit -m "Sua mensagem aqui"

# 5. Enviar para GitHub
git push
```

---

## ⚠️ Problemas Comuns

### Erro: "not a git repository"

**Solução:**
```bash
git init
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
```

### Erro: "authentication failed"

**Solução:**
- Use Personal Access Token em vez de senha
- Crie em: https://github.com/settings/tokens
- Permissões: `repo` (todas)

### Erro: "nothing to commit"

**Solução:**
- Significa que não há mudanças
- Ou os arquivos não foram salvos localmente

---

## ✅ Depois de Atualizar

1. **Render detecta automaticamente** as mudanças
2. **Novo deploy inicia** em 1-2 minutos
3. **Aguarde 5-10 minutos** para deploy concluir
4. **Verifique os logs** no Render

---

## 🎉 Pronto!

Após fazer push ou upload, o Render fará novo deploy automaticamente!

Quer ajuda com algum passo específico?

