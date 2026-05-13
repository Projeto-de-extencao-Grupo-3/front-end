import { useEffect, useState, useCallback } from 'react';
import PwaService from '../service/pwaService';

/**
 * Hook para gerenciar estado e funcionalidades de PWA
 * @returns {Object} Estado e funções da PWA
 */
export const usePwa = () => {
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasUpdates, setHasUpdates] = useState(false);
  const [storageQuota, setStorageQuota] = useState(null);

  useEffect(() => {
    // Verificar se está instalada
    setIsPwaInstalled(PwaService.isPwaInstalled());

    // Monitorar status online/offline
    const unsubscribe = PwaService.watchOnlineStatus((online) => {
      setIsOnline(online);
    });

    return unsubscribe;
  }, []);

  // Função para enviar notificação
  const notify = useCallback(async (title, options = {}) => {
    const hasPermission = await PwaService.requestNotificationPermission();
    if (hasPermission) {
      await PwaService.sendNotification(title, options);
    }
  }, []);

  // Função para verificar atualizações
  const checkUpdates = useCallback(async () => {
    const updates = await PwaService.checkForUpdates();
    setHasUpdates(updates);
    return updates;
  }, []);

  // Função para obter quota de armazenamento
  const getStorageInfo = useCallback(async () => {
    const quota = await PwaService.checkStorageQuota();
    setStorageQuota(quota);
    return quota;
  }, []);

  // Função para solicitar armazenamento persistente
  const persistStorage = useCallback(async () => {
    return await PwaService.requestPersistentStorage();
  }, []);

  return {
    isPwaInstalled,
    isOnline,
    hasUpdates,
    storageQuota,
    notify,
    checkUpdates,
    getStorageInfo,
    persistStorage
  };
};

/**
 * Hook para detectar mudanças de online/offline
 * @returns {boolean} Status de conexão
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const unsubscribe = PwaService.watchOnlineStatus(setIsOnline);
    return unsubscribe;
  }, []);

  return isOnline;
};

/**
 * Hook para gerenciar atualizações do Service Worker
 * @returns {Object} Estado de atualização
 */
export const useServiceWorkerUpdate = () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdateReady, setIsUpdateReady] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let registration;

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setIsUpdateReady(true);
      });

      navigator.serviceWorker.ready.then((reg) => {
        registration = reg;

        // Verificar atualizações a cada hora
        const interval = setInterval(() => {
          reg.update();
        }, 60 * 60 * 1000);

        reg.addEventListener('updatefound', () => {
          setHasUpdate(true);
        });

        return () => clearInterval(interval);
      });
    }
  }, []);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    hasUpdate,
    isUpdateReady,
    reloadPage
  };
};

export default usePwa;
