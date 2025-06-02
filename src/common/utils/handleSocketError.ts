/**
 * @param {unknown} error - Объект ошибки WebSocket.
 */
export const handleSocketError = (error: unknown) => {
  if (!navigator.onLine) {
    console.error("❌ Нет подключения к интернету. Проверьте соединение.");
    return;
  }

  if (!error) {
    console.error("❌ Произошла ошибка подключения к WebSocket.");
    return;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("401") || message.includes("unauthorized")) {
      console.error("❌ Ошибка авторизации WebSocket (401). Повторите вход в систему.");
      return;
    }

    if (message.includes("400") || message.includes("bad request")) {
      console.error("❌ Ошибка WebSocket (400). Неверный запрос или параметры.");
      return;
    }

    console.error("❌ WebSocket ошибка:", error.message);
    return;
  }

  console.error("❌ Неизвестная ошибка WebSocket:", error);
};
