# Email Service Module - SOLID Principles

Este módulo implementa o serviço de envio de emails seguindo os princípios SOLID.

## Estrutura

```
api/services/email/
├── IEmailService.js          # Interface (abstração)
├── ResendEmailService.js     # Implementação Resend
├── SMTPEmailService.js       # Implementação SMTP
├── EmailServiceFactory.js    # Factory Pattern
├── EmailDTO.js               # Data Transfer Objects
├── index.js                  # Entry point
└── README.md                 # Esta documentação
```

## Princípios SOLID Aplicados

### 1. Single Responsibility Principle (SRP)
- **IEmailService**: Define apenas o contrato de envio de email
- **ResendEmailService**: Responsável apenas por enviar emails via Resend
- **SMTPEmailService**: Responsável apenas por enviar emails via SMTP
- **EmailServiceFactory**: Responsável apenas por criar instâncias de serviços
- **EmailDTO**: Responsável apenas por estruturas de dados
- **send-email.js**: Responsável apenas por lidar com requisições HTTP

### 2. Open/Closed Principle (OCP)
- **Aberto para extensão**: Novos serviços de email podem ser adicionados criando novas classes que implementam `IEmailService`
- **Fechado para modificação**: Não é necessário modificar código existente para adicionar novos serviços

**Exemplo de extensão:**
```javascript
// Novo serviço pode ser adicionado sem modificar código existente
class SendGridEmailService extends IEmailService {
  // implementação
}
```

### 3. Liskov Substitution Principle (LSP)
- Qualquer implementação de `IEmailService` pode substituir outra sem quebrar o código
- `ResendEmailService` e `SMTPEmailService` são completamente intercambiáveis

### 4. Interface Segregation Principle (ISP)
- `IEmailService` define apenas os métodos essenciais:
  - `sendEmail()` - Enviar email
  - `isAvailable()` - Verificar disponibilidade
  - `getName()` - Obter nome do serviço
- Não força implementações a ter métodos desnecessários

### 5. Dependency Inversion Principle (DIP)
- **Alto nível** (`send-email.js`) depende de abstração (`IEmailService`)
- **Baixo nível** (`ResendEmailService`, `SMTPEmailService`) implementam a abstração
- `EmailServiceFactory` cria instâncias baseadas em abstração

## Uso

### No Handler HTTP (`api/send-email.js`)

```javascript
const { EmailServiceFactory, EmailRequestDTO } = require('./services/email');

// Factory cria o serviço apropriado
const emailService = EmailServiceFactory.create(process.env);

// Criar DTO
const emailRequest = new EmailRequestDTO(req.body);

// Enviar email (usa abstração, não implementação específica)
const response = await emailService.sendEmail(emailRequest);
```

### Adicionar Novo Serviço de Email

1. Criar nova classe que estende `IEmailService`:
```javascript
const { IEmailService } = require('./IEmailService.js');
const { EmailRequestDTO, EmailResponseDTO } = require('./EmailDTO.js');

class NovoEmailService extends IEmailService {
  constructor(config) {
    super();
    // configuração
  }

  getName() {
    return 'Novo Serviço';
  }

  isAvailable() {
    // verificar se está configurado
  }

  async sendEmail(emailRequest) {
    // implementação
  }
}
```

2. Adicionar ao Factory:
```javascript
// EmailServiceFactory.js
if (env.NOVO_SERVICE_KEY) {
  const novoService = new NovoEmailService({...});
  if (novoService.isAvailable()) {
    return novoService;
  }
}
```

## Benefícios

1. **Manutenibilidade**: Código organizado e fácil de entender
2. **Testabilidade**: Cada componente pode ser testado isoladamente
3. **Extensibilidade**: Fácil adicionar novos serviços de email
4. **Flexibilidade**: Trocar serviços sem modificar código existente
5. **Reutilização**: Componentes podem ser reutilizados em outros projetos

## Testes

Cada serviço pode ser testado independentemente:

```javascript
// Teste ResendEmailService
const resendService = new ResendEmailService({
  apiKey: 'test-key',
  fromEmail: 'test@example.com'
});

const request = new EmailRequestDTO({
  to: 'recipient@example.com',
  subject: 'Test',
  text: 'Test message'
});

const response = await resendService.sendEmail(request);
```

## Configuração

### Resend (Recomendado para Vercel)
```env
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=contact@fabiobdaniel.com
```

### SMTP (Alternativa)
```env
SMTP_HOST=smtp.example.com
SMTP_USER=user@example.com
SMTP_PASS=password
SMTP_PORT=587
SMTP_SECURE=false
SMTP_FROM=noreply@example.com
```
