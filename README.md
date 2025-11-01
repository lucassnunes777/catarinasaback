# Catarina Saback - Sistema Imobiliário

Sistema de personal branding para corretora de imóveis com dashboard administrativo.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Prisma** (SQLite)
- **Shadcn/UI**
- **Framer Motion**

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/lucassnunes777/catarinasaback.git
cd catarinasaback
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais.

4. **Configure o banco de dados:**
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

## 🖥️ Executar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🌐 Executar na Rede Local (Acessar de outros dispositivos)

Para acessar de outro PC/Mac na mesma rede:

```bash
npm run dev:network
```

### Como encontrar o IP do seu computador:

**Windows:**
```bash
ipconfig
```
Procure por "IPv4 Address" (ex: 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```
Ou vá em: System Preferences > Network

### Acessar de outro dispositivo:

No Mac/outro PC, abra o navegador e acesse:
```
http://SEU_IP_AQUI:3000
```

Exemplo: `http://192.168.1.100:3000`

## 🔐 Credenciais Padrão

- **Email:** catarina@sabackimoveis.com
- **Senha:** Saback#2025!

## 📁 Estrutura do Projeto

```
src/
├── app/              # Rotas Next.js
│   ├── api/          # API Routes
│   ├── dashboard/    # Área administrativa
│   └── imoveis/      # Páginas públicas
├── components/       # Componentes React
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Seções da homepage
│   └── ui/           # Componentes Shadcn/UI
└── lib/              # Utilitários e configurações
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Desenvolvimento (localhost apenas)
- `npm run dev:network` - Desenvolvimento (acesso na rede)
- `npm run build` - Build de produção
- `npm run start` - Produção (localhost)
- `npm run start:network` - Produção (acesso na rede)

## 📝 Notas

- O banco de dados SQLite fica em `prisma/dev.db`
- Imagens de perfil/logo são salvas em `localStorage`
- Para produção, configure `NEXT_PUBLIC_BASE_URL` no `.env.local`

