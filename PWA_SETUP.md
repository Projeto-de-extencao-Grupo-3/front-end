# Configuração PWA - GROTrack

Este documento detalha a configuração de Progressive Web App (PWA) para a aplicação GROTrack.

## 📱 O que é PWA?

Progressive Web Apps (PWA) são aplicações web que funcionam como apps nativas. Permitem:
- ✅ Instalação como aplicativo
- ✅ Funcionalidade offline
- ✅ Notificações push
- ✅ Acesso à câmera, localização, etc
- ✅ Sincronização em background

## 🚀 Como Usar

### 1. Build para Produção
```bash
npm run build
npm run preview
```

### 2. Testar Instalação
Acesse `http://localhost:5173` (ou a URL configurada) e você verá um botão "Instalar" ou um prompt no navegador para instalar como app.

### 3. Instalar em Diferentes Dispositivos

#### Desktop (Chrome, Edge)
1. Clique no ícone de instalação na barra de endereço
2. Confirme a instalação
3. A app abrirá em janela independente

#### Mobile (Android)
1. Abra a app no Chrome
2. Toque no menu (3 pontos)
3. Selecione "Instalar app"

#### iOS (Safari)
1. Abra a app no Safari
2. Toque no compartilhamento
3. Selecione "Adicionar à Tela inicial"

## 📋 Arquivos Configurados

### 1. **manifest.json**
Define metadados da PWA:
- Nome e ícones
- Tema e cores
- Comportamento de instalação

Localização: `/public/manifest.json`

### 2. **Service Worker (sw.js)**
Gerencia cache e funcionalidade offline:
- Cache First: para recursos estáticos
- Network First: para requisições de API
- Background Sync: sincronização em background

Localização: `/public/sw.js`

### 3. **vite.config.js**
Configuração do plugin VitePWA:
- Estratégia de cache (Workbox)
- Atualização automática
- Runtime caching de CDNs e APIs

### 4. **index.html**
Metadags PWA:
- Link ao manifest
- Ícones para diferentes plataformas
- Metadags de aparência

### 5. **main.jsx**
Registra o Service Worker na aplicação

### 6. **pwaService.js**
Funções utilitárias para gerenciar PWA

## 🔧 Usando o PwaService

### Exemplo: Verificar Status PWA

```javascript
import PwaService from './service/pwaService';

// Verificar se está instalada como PWA
if (PwaService.isPwaInstalled()) {
  console.log('App instalada como PWA');
}

// Monitorar conexão
PwaService.watchOnlineStatus((isOnline) => {
  console.log(isOnline ? 'Online' : 'Offline');
});

// Enviar notificação
PwaService.requestNotificationPermission().then(granted => {
  if (granted) {
    PwaService.sendNotification('Olá!', {
      body: 'Bem-vindo ao GROTrack',
      tag: 'grotrack-notification'
    });
  }
});

// Verificar quota de armazenamento
const quota = await PwaService.checkStorageQuota();
console.log(`Usando ${quota.percentage.toFixed(2)}% do armazenamento`);

// Solicitar armazenamento persistente
await PwaService.requestPersistentStorage();

// Verificar atualizações
const hasUpdates = await PwaService.checkForUpdates();
if (hasUpdates) {
  // Mostrar notificação de atualização
}
```

## 📦 Ícones Necessários

Para uma PWA funcional, você precisa adicionar os seguintes ícones em `/public/`:

- **icon-192.png** (192x192px) - Ícone padrão
- **icon-512.png** (512x512px) - Ícone grande
- **icon-maskable-192.png** (192x192px) - Ícone com área segura
- **icon-maskable-512.png** (512x512px) - Ícone com área segura
- **screenshot-narrow.png** (540x720px) - Screenshot para mobile
- **screenshot-wide.png** (1280x720px) - Screenshot para desktop

### Ferramenta Recomendada para Gerar Ícones:
- [PWA Icon Generator](https://www.pwabuilder.com/)
- [Icon Converter](https://icoconvert.com/)

## 🔄 Estratégias de Cache

### 1. Cache First (Recursos Estáticos)
- Busca primeiro no cache
- Se não encontrar, busca na rede
- Ideal para: CSS, JS, imagens

### 2. Network First (APIs)
- Busca primeiro na rede
- Se falhar, busca no cache
- Ideal para: requisições de API

### 3. Stale While Revalidate
- Retorna do cache imediatamente
- Atualiza no background
- Ideal para: conteúdo que pode estar levemente desatualizado

## 🌐 Suporte Offline

O Service Worker fornecido permite:
- ✅ Acesso a páginas visitadas sem conexão
- ✅ Carregamento de CSS e JS em cache
- ✅ Sincronização de dados quando voltar online

Para melhor experiência offline:
1. Implemente uma página de erro offline customizada
2. Use IndexedDB para armazenar dados locais
3. Implemente Background Sync para sincronizar dados

## 🔐 Segurança

- ✅ Service Worker só funciona em HTTPS (exceto localhost)
- ✅ Verificar permissões antes de acessar câmera/localização
- ✅ Validar dados do cache antes de usar

## 📊 Testando com DevTools

### Chrome DevTools
1. Abra DevTools (F12)
2. Vá para Application → Service Workers
3. Verifique status e cache

### Ferramentas de Teste
```bash
npm run build  # Build para produção
npm run preview  # Servidor de preview
```

## 🐛 Troubleshooting

### Service Worker não registra
- Verifique HTTPS (ou localhost)
- Verifique console para erros
- Limpe cache e recarregue

### App não instala
- Verifique manifest.json
- Teste com [PWA Builder](https://www.pwabuilder.com/)
- Verifique requisitos mínimos

### Cache não atualiza
- Espere 24h ou acesse com ?v=new
- Use `registration.update()` no código

## 📚 Recursos Úteis

- [PWA Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)

## 📝 Próximos Passos

1. ✅ Gerar ícones (192x192, 512x512, maskable)
2. ✅ Testar instalação em diferentes navegadores
3. ✅ Implementar notificações push
4. ✅ Adicionar IndexedDB para dados offline
5. ✅ Configurar background sync
6. ✅ Adicionar tela de splash customizada
