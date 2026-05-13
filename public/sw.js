// Service Worker para GROTrack PWA
const CACHE_NAME = 'grotrack-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/runtime-config.js',
  '/manifest.json'
];

// Event: Install - Cachear arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Erro ao abrir cache:', error);
      })
  );
  self.skipWaiting();
});

// Event: Activate - Limpar caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antiga:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Event: Fetch - Estratégia Cache First com fallback para rede
self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorar requisições da API (usar Network First)
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Se a resposta for bem-sucedida, atualizar o cache
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Se falhar, tentar buscar do cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para outros recursos, usar Cache First
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Não cachear respostas não-200
          if (!response || response.status !== 200) {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        });
      })
      .catch(() => {
        // Retornar página offline se disponível
        return caches.match('/index.html');
      })
  );
});

// Event: Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Implementar sincronização de dados aqui
    console.log('Sincronizando dados...');
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
  }
}
