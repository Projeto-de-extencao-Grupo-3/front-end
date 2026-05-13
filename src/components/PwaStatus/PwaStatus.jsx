import { useEffect } from 'react';
import { usePwa, useOnlineStatus, useServiceWorkerUpdate } from '../hooks/usePwa';
import './PwaStatus.css';

/**
 * Componente que mostra status da PWA e oferece funcionalidades
 */
export const PwaStatus = () => {
  const { isPwaInstalled, notify, checkUpdates, persistStorage } = usePwa();
  const isOnline = useOnlineStatus();
  const { hasUpdate, isUpdateReady, reloadPage } = useServiceWorkerUpdate();

  useEffect(() => {
    // Se está online e há atualização, notificar
    if (isOnline && hasUpdate) {
      notify('Nova versão disponível', {
        body: 'Clique para atualizar',
        tag: 'update-notification',
        requireInteraction: true
      });
    }
  }, [isOnline, hasUpdate, notify]);

  useEffect(() => {
    // Solicitar armazenamento persistente
    persistStorage();
  }, [persistStorage]);

  return (
    <div className="pwa-status">
      {/* Status Online/Offline */}
      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
        <span className="status-dot"></span>
        <span className="status-text">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Indicador de Instalação */}
      {isPwaInstalled && (
        <div className="installed-indicator">
          <span className="app-icon">📱</span>
          <span>App Instalada</span>
        </div>
      )}

      {/* Notificação de Atualização */}
      {hasUpdate && (
        <div className="update-notification">
          <span>⚡ Atualização disponível</span>
          <button onClick={reloadPage} className="update-btn">
            Atualizar agora
          </button>
        </div>
      )}

      {/* Botão de Teste */}
      <div className="pwa-actions">
        <button
          onClick={() => notify('Teste de Notificação', {
            body: 'Se você vê isto, as notificações PWA estão funcionando!'
          })}
          className="action-btn"
        >
          📢 Testar Notificação
        </button>
        <button
          onClick={checkUpdates}
          className="action-btn"
        >
          🔄 Verificar Atualizações
        </button>
      </div>
    </div>
  );
};

export default PwaStatus;
