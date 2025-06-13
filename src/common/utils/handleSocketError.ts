/**
 * @param {unknown} error - Объект ошибки WebSocket.
 */
export const handleSocketError = (error: unknown) => {
  if (!navigator.onLine) {
    // Нет подключения к интернету
    return;
  }

  if (!error) {
    // Общая ошибка WebSocket
    return;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("401") || message.includes("unauthorized")) {
      // Ошибка авторизации WebSocket
      return;
    }

    if (message.includes("400") || message.includes("bad request")) {
      // Ошибка запроса WebSocket
      return;
    }

    // Общая ошибка с сообщением
    return;
  }

  // Неизвестная ошибка
};
