# Button Service Module (SOLID Principles)

Este módulo implementa a funcionalidade de adicionar botões dinamicamente na página seguindo os princípios SOLID.

## 📐 Arquitetura SOLID

### **S - Single Responsibility Principle (SRP)**
Cada classe tem uma única responsabilidade:
- `ButtonDetector`: Apenas detecta botões no DOM
- `BuyBookButtonCreator`: Apenas cria o botão "Buy Book"
- `ButtonManager`: Apenas gerencia a colocação de botões no DOM
- `BuyBookButtonService`: Apenas orquestra a lógica do botão "Buy Book"

### **O - Open/Closed Principle (OCP)**
- `ButtonServiceFactory`: Aberto para extensão (novos tipos de botões), fechado para modificação
- Novos tipos de botões podem ser adicionados sem modificar código existente

### **L - Liskov Substitution Principle (LSP)**
- `ButtonDetector` pode substituir `IButtonDetector`
- `BuyBookButtonCreator` pode substituir `IButtonCreator`
- `ButtonManager` pode substituir `IButtonManager`

### **I - Interface Segregation Principle (ISP)**
- Interfaces específicas e focadas:
  - `IButtonDetector`: Apenas métodos de detecção
  - `IButtonCreator`: Apenas métodos de criação
  - `IButtonManager`: Apenas métodos de gerenciamento

### **D - Dependency Inversion Principle (DIP)**
- `BuyBookButtonService` depende de abstrações (interfaces) via Factory
- Não depende de implementações concretas diretamente

## 📁 Estrutura de Arquivos

```
button-service/
├── IButtonDetector.js          # Interface para detectar botões
├── ButtonDetector.js            # Implementação concreta
├── IButtonCreator.js            # Interface para criar botões
├── BuyBookButtonCreator.js      # Implementação concreta
├── IButtonManager.js            # Interface para gerenciar botões
├── ButtonManager.js              # Implementação concreta
├── ButtonServiceFactory.js      # Factory (OCP)
├── BuyBookButtonService.js      # Serviço principal
├── index.js                     # Exports
└── README.md                     # Esta documentação
```

## 🚀 Uso

```javascript
import { BuyBookButtonService } from '/assets/button-service/index.js';

const service = new BuyBookButtonService();
service.init();
```

## 🔧 Extensibilidade

Para adicionar um novo tipo de botão:

1. Criar novo `Creator` estendendo `IButtonCreator`
2. Adicionar case no `ButtonServiceFactory.createButtonCreator()`
3. Criar novo `Service` se necessário

**Exemplo:**
```javascript
// NewButtonCreator.js
export class NewButtonCreator extends IButtonCreator {
  getConfig() { /* ... */ }
  createButton(config) { /* ... */ }
}

// ButtonServiceFactory.js
static createButtonCreator(type) {
  switch (type) {
    case 'buy-book':
      return new BuyBookButtonCreator();
    case 'new-button':  // NOVO
      return new NewButtonCreator();
    // ...
  }
}
```

## ✅ Vantagens da Arquitetura SOLID

1. **Testabilidade**: Cada componente pode ser testado isoladamente
2. **Manutenibilidade**: Mudanças em um componente não afetam outros
3. **Extensibilidade**: Fácil adicionar novos tipos de botões
4. **Reusabilidade**: Componentes podem ser reutilizados
5. **Clareza**: Responsabilidades bem definidas
