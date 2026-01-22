# 🗑️ Como Deletar API Key no Resend.com

## Passo a Passo para Deletar

### 1. Acesse o Resend Dashboard
1. Vá para: **https://resend.com**
2. Faça login com sua conta (Gmail)

### 2. Vá em API Keys
1. No menu lateral, clique em **"API Keys"**
2. Ou acesse diretamente: **https://resend.com/api-keys**

### 3. Encontre a API Key
1. Você verá uma lista de todas as suas API Keys
2. Cada uma terá:
   - Nome que você deu (ex: "Awaken Your Hero - Vercel")
   - Data de criação
   - Último uso (se houver)
   - Botão de ação

### 4. Deletar a API Key
1. Encontre a API Key que você quer deletar
2. Clique nos **3 pontos** (⋯) ou no botão de ação ao lado da chave
3. Selecione **"Delete"** ou **"Remove"**
4. Confirme a exclusão

⚠️ **Atenção:** Depois de deletar, você precisará:
- Gerar uma nova API Key
- Atualizar na Vercel (Settings → Environment Variables)
- Fazer redeploy

## Alternativa: Revogar ao Invés de Deletar

Se você não quiser deletar completamente, pode:
1. Gerar uma nova API Key
2. Atualizar na Vercel com a nova chave
3. Depois deletar a antiga

Isso evita downtime no seu site.

## Depois de Deletar

Se você já estava usando essa API Key na Vercel:

1. **Gere uma nova API Key** no Resend
2. **Atualize na Vercel:**
   - Vercel Dashboard → Settings → Environment Variables
   - Edite `RESEND_API_KEY`
   - Cole a nova chave
   - Salve
3. **Faça Redeploy:**
   - Deployments → 3 pontos (⋯) → Redeploy

## Importante

- ⚠️ Depois de deletar, a API Key não pode ser recuperada
- ⚠️ Se estiver em uso, o envio de emails vai parar até você atualizar
- ✅ É seguro deletar - você pode criar quantas quiser
- ✅ API Keys antigas não funcionam depois de deletadas

## Criar Nova API Key

Se precisar criar uma nova:

1. Resend Dashboard → **API Keys**
2. Clique em **"Create API Key"**
3. Dê um nome (ex: "Awaken Your Hero - Production")
4. Selecione permissões: **Send emails**
5. Clique em **"Add"**
6. **Copie imediatamente** (só aparece uma vez)
7. Atualize na Vercel

---

**Dica:** Se você criou a conta com Gmail mas quer usar outro email, você pode:
- Manter a conta do Resend (não precisa deletar)
- Apenas deletar a API Key específica
- Criar uma nova API Key na mesma conta

A conta do Resend não precisa ser deletada - apenas a API Key específica.
