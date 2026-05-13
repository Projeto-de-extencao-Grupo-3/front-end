// Serviço para gerenciar notificações Push e recursos PWA

export const PwaService = {
  /**
   * Verifica se a aplicação está instalada como PWA
   */
  isPwaInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
  },

  /**
   * Solicita permissão para notificações
   */
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.warn('Notificações não são suportadas neste navegador');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  /**
   * Envia uma notificação
   */
  async sendNotification(title, options = {}) {
    try {
      if ('serviceWorker' in navigator && 'ServiceWorkerRegistration' in window) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, {
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          ...options
        });
      } else if ('Notification' in window) {
        new Notification(title, {
          icon: '/icon-192.png',
          ...options
        });
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  },

  /**
   * Verifica se há atualizações do Service Worker
   */
  async checkForUpdates() {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const newRegistration = await registration.update();

        if (newRegistration?.installing) {
          console.log('Atualização disponível!');
          return true;
        }
      }
    } catch (error) {
      console.error('Erro ao verificar atualizações:', error);
    }
    return false;
  },

  /**
   * Solicita acesso ao armazenamento persistente
   */
  async requestPersistentStorage() {
    if (!navigator.storage?.persist) {
      console.warn('API de armazenamento persistente não suportada');
      return false;
    }

    try {
      const persistent = await navigator.storage.persist();
      console.log(`Armazenamento persistente: ${persistent ? 'concedido' : 'negado'}`);
      return persistent;
    } catch (error) {
      console.error('Erro ao solicitar armazenamento persistente:', error);
      return false;
    }
  },

  /**
   * Verifica a quota de armazenamento
   */
  async checkStorageQuota() {
    if (!navigator.storage?.estimate) {
      console.warn('API de quota não suportada');
      return null;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage,
        quota: estimate.quota,
        percentage: (estimate.usage / estimate.quota) * 100
      };
    } catch (error) {
      console.error('Erro ao verificar quota:', error);
      return null;
    }
  },

  /**
   * Detecta status online/offline
   */
  onlineStatus() {
    return window.navigator.onLine;
  },

  /**
   * Monitora mudanças no status online/offline
   */
  watchOnlineStatus(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));

    return () => {
      window.removeEventListener('online', () => callback(true));
      window.removeEventListener('offline', () => callback(false));
    };
  },

  /**
   * Registra um listener para mensagens do Service Worker
   */
  onServiceWorkerMessage(callback) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        callback(event.data);
      });
    }
  }
};

export default PwaService;
