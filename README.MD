# Testes de Performance com Playwright-Performance

Este repositório utiliza o pacote [playwright-performance](https://www.npmjs.com/package/playwright-performance) para realizar testes de desempenho em aplicações web. Este README descreve como configurar, executar e interpretar os resultados dos testes de performance.

---

## Requisitos
- **Node.js** v16 ou superior
- **Playwright** instalado no projeto
- Dependências adicionais especificadas no `package.json`

---

## Instalação

Instale o pacote `playwright-performance` como uma dependência de desenvolvimento:

```bash
npm install playwright-performance --save-dev
```

Certifique-se de que o Playwright também está instalado:

```bash
npm install @playwright/test --save-dev
```

---

## Configuração

Crie ou ajuste o arquivo de configuração do Playwright, como `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
```

Configure o teste para usar `playwright-performance`:

```typescript
import base from '@playwright/test';
import { playwrightPerformance } from 'playwright-performance';
import type { PerformanceOptions, PlaywrightPerformance, PerformanceWorker } from 'playwright-performance';

const test = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>({
  performance: playwrightPerformance.performance,
  performanceOptions: [{}, { scope: 'worker' }],
  worker: [playwrightPerformance.worker, { scope: 'worker', auto: true }],
});

export { test };
```

---

## Exemplo de Teste

Crie um arquivo de teste, como `tests/performance.spec.ts`:

```typescript
import { test } from './helper'; // Altere o caminho para o arquivo correto

// Teste de desempenho
test('startup performance', async ({ page, performance }) => {
  await page.goto('https://example.com');
  const metrics = await performance.getMetrics();
  console.log('Metrics:', metrics);
});
```

---

## Executando os Testes

Para executar os testes, use o comando:

```bash
npx playwright test
```

Ou configure um script no `package.json`:

```json
"scripts": {
  "test:performance": "npx playwright test"
}
```

Execute o script:

```bash
npm run test:performance
```

---

## Interpretando os Resultados

O `playwright-performance` fornece métricas detalhadas de desempenho, como:
- **First Contentful Paint (FCP)**
- **Time to Interactive (TTI)**
- **DOM Load Time**
- **Page Load Time**

Esses dados serão exibidos no console após a execução dos testes. Use essas métricas para identificar gargalos de desempenho na sua aplicação.

---

## Personalização

Você pode personalizar as opções de performance editando o objeto `performanceOptions`. Veja o exemplo:

```typescript
const test = base.extend({
  performanceOptions: [{
    sampleInterval: 100, // Intervalo entre coletas de amostras em milissegundos
    scope: 'worker',
  }],
});
```

Consulte a [documentação do pacote](https://www.npmjs.com/package/playwright-performance) para mais informações sobre opções disponíveis.

---

## Solução de Problemas

### Erro: `No tests found`
Certifique-se de que:
- Os arquivos de teste estão localizados no diretório configurado no `playwright.config.ts`.
- Os arquivos de teste possuem extensão `.spec.ts` ou `.test.ts`.

### Erro: `MODULE_NOT_FOUND`
Verifique se o arquivo está sendo compilado corretamente pelo TypeScript e se o caminho no comando está correto.

### Outros erros
Use o comando abaixo para depurar erros de configuração:

```bash
npx playwright test --config playwright.config.ts --debug
```

---

## Referências

- [Documentação oficial do playwright-performance](https://www.npmjs.com/package/playwright-performance)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)

