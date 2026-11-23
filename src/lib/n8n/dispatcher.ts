import { env } from "../config/env";
import { logger } from "../core/logger";

export type N8nEventName =
  | "tenant.created"
  | "order.created"
  | "order.paid"
  | "tier.upgraded"
  | "withdrawal.requested"
  | "cart.recovery_needed";

export interface N8nEventPayload {
  event: N8nEventName;
  timestamp: string;
  data: Record<string, unknown>;
}

/**
 * Dispatches an event to the internal n8n automation microservice.
 * Executes as fire-and-forget so it never blocks the user-facing request.
 */
export async function emitN8nEvent(
  event: N8nEventName,
  data: Record<string, unknown>
): Promise<void> {
  const url = `${env.N8N_WEBHOOK_BASE_URL}/${event}`;
  const payload: N8nEventPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  try {
    // Fire-and-forget: we do not await the full response body in production
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-etalase-secret": env.N8N_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
    }).catch((err) => {
      logger.warn(`Failed to dispatch n8n event: ${event}`, "n8n-dispatcher", err);
    });
  } catch (err) {
    logger.warn(`n8n dispatch setup error for: ${event}`, "n8n-dispatcher", err);
  }
}
