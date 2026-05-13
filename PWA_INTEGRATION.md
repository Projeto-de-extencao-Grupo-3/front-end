# Guia de Integração PWA - GROTrack

## 📌 Checklist de Implementação

- [x] Service Worker configurado (`public/sw.js`)
- [x] Manifest configurado (`public/manifest.json`)
- [x] Plugin PWA no Vite configurado
- [x] Hooks React criados (`src/hooks/usePwa.js`)
- [x] Serviço PWA criado (`src/service/pwaService.js`)
- [x] Componente de Status PWA criado
- [ ] **Ícones gerados e adicionados** ⬅️ PRÓXIMO PASSO
- [ ] Integrar componente PwaStatus em seu layout
- [ ] Testar em diferentes navegadores
- [ ] Deploy para produção

## 🎨 Próximos Passos

### 1️⃣ Gerar Ícones (IMPORTANTE!)

Sua app PWA precisa de ícones para funcionar corretamente. Recomendações:

**Opção A: Usar PWA Builder (Recomendado)**
1. Acesse [PWA Builder](https://www.pwabuilder.com/)
2. Clique em "Generate"
3. Faça upload de uma imagem 512x512px
4. Download dos ícones
5. Copie para `/public/`

**Opção B: Gerar com CLI**
```bash
# Instalar ferramenta
npm install -g pwa-asset-generator

# Gerar ícones
pwa-asset-generator ./seu-logo.png ./public/icon -i ./seu-logo.png -m ./public/icon-manifest.json
```

**Ícones Necessários:**
```
public/
├── icon-192.png (192x192)
├── icon-512.png (512x512)
├── icon-maskable-192.png (192x192)
├── icon-maskable-512.png (512x512)
├── screenshot-narrow.png (540x720)
└── screenshot-wide.png (1280x720)
```

### 2️⃣ Integrar Componente PwaStatus

Adicione o componente ao seu layout principal:

```jsx
// src/App.jsx ou seu Layout principal
import { PwaStatus } from './components/PwaStatus/PwaStatus';

function App() {
  return (
    <div>
      <PwaStatus /> {/* Adicione aqui */}
      {/* resto da sua aplicação */}
    </div>
  );
}

export default App;
```

### 3️⃣ Usar Hooks em Componentes

**Exemplo 1: Mostrar mensagem quando offline**

```jsx
import { useOnlineStatus } from '@/hooks';

export function MinhaPage() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {!isOnline && (
        <div className="offline-banner">
          ⚠️ Você está offline. Algumas funcionalidades podem estar limitadas.
        </div>
      )}
      {/* resto do componente */}
    </div>
  );
}
```

**Exemplo 2: Enviar Notificação**

```jsx
import { usePwa } from '@/hooks';

export function Notificacoes() {
  const { notify } = usePwa();

  const handleAction = async () => {
    await notify('Sucesso!', {
      body: 'Ação executada com sucesso',
      tag: 'success-notification'
    });
  };

  return <button onClick={handleAction}>Executar Ação</button>;
}
```

**Exemplo 3: Gerenciar Atualizações**

```jsx
import { useServiceWorkerUpdate } from '@/hooks';
import { useEffect } from 'react';

export function AppUpdater() {
  const { hasUpdate, isUpdateReady, reloadPage } = useServiceWorkerUpdate();

  useEffect(() => {
    if (isUpdateReady) {
      console.log('Nova versão carregada!');
      // Automaticamente recarregar ou mostrar botão
    }
  }, [isUpdateReady]);

  if (hasUpdate) {
    return (
      <div className="update-banner">
        <p>Nova versão disponível!</p>
        <button onClick={reloadPage}>Atualizar Agora</button>
      </div>
    );
  }

  return null;
}
```

**Exemplo 4: Verificar Armazenamento**

```jsx
import { usePwa } from '@/hooks';
import { useEffect } from 'react';

export function StorageMonitor() {
  const { getStorageInfo, storageQuota } = usePwa();

  useEffect(() => {
    getStorageInfo();
  }, [getStorageInfo]);

  if (storageQuota) {
    const percentage = storageQuota.percentage.toFixed(2);
    return (
      <p>Armazenamento: {percentage}% usado</p>
    );
  }

  return null;
}
```

## 🚀 Build e Deploy

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Para testar Service Worker, use preview (produção)
npm run build
npm run preview
```

### Produção
```bash
# Build
npm run build

# O build gerará arquivos otimizados em dist/
```

### Verificar PWA

**Chrome DevTools:**
1. F12 → Guia "Application"
2. Service Workers - verifique se está registrado
3. Manifest - verifique dados
4. Storage - verifique cache

**Lighthouse:**
1. F12 → Guia "Lighthouse"
2. Clique "Analyze page load"
3. Procure pela seção "PWA"

## 📋 Checklist de Produção

- [ ] Ícones gerados e testados
- [ ] HTTPS habilitado (obrigatório para PWA)
- [ ] manifest.json válido (teste em https://www.pwabuilder.com/)
- [ ] Service Worker registrado corretamente
- [ ] Cache atualiza corretamente
- [ ] Funcionalidade offline testada
- [ ] Notificações funcionando
- [ ] Instalação funciona em mobile
- [ ] Lighthouse PWA score > 90

## 🔐 Segurança e Performance

### Boas Práticas
- ✅ Use HTTPS em produção
- ✅ Valide dados do cache antes de usar
- ✅ Limite tamanho do cache
- ✅ Teste em conexões lentas (3G)
- ✅ Monitore tamanho do Service Worker

### Monitoramento
```javascript
// Adicionar em seu tracking/analytics
import { usePwa } from '@/hooks';

export function Analytics() {
  const { isPwaInstalled, isOnline } = usePwa();

  // Enviar dados de telemetria
  console.log('PWA Status:', {
    installed: isPwaInstalled,
    online: isOnline,
    userAgent: navigator.userAgent
  });
}
```

## 🐛 Troubleshooting

### Problem: "Instalar" não aparece
**Solução:**
- Verificar se está em HTTPS (exceto localhost)
- Testar manifest em [PWA Builder](https://www.pwabuilder.com/)
- Limpar cache: DevTools → Application → Clear site data

### Problem: Service Worker não atualiza
**Solução:**
- Aguarde 24h ou force atualização
- Verificar em DevTools se há "installing" worker
- Use `registration.update()` no código

### Problem: Notificações não funcionam
**Solução:**
- Verificar permissão do navegador
- Testar em HTTPS
- Verificar se Service Worker está ativo

## 📚 Recursos

- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox Docs](https://developers.google.com/web/tools/workbox)

---

**Dúvidas?** Consulte `PWA_SETUP.md` para mais detalhes técnicos.
