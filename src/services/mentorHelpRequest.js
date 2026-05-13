export async function sendMentorHelpRequest(payload) {
  const response = await fetch("/api/mentor-help-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response
    .json()
    .catch(() => ({ ok: false, error: "Resposta inesperada do servidor." }));

  if (!response.ok || !result.ok) {
    throw new Error(
      result.error || "Não foi possível enviar o pedido. Tenta novamente.",
    );
  }

  return result;
}
