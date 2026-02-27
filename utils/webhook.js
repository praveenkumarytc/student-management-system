/**
 * Outgoing webhooks for student events.
 * Set STUDENT_WEBHOOK_URL (or WEBHOOK_URL) in .env to receive POST callbacks
 * when students are created, updated, or deleted.
 *
 * Payload: { event, data, timestamp }
 * - event: 'student.created' | 'student.updated' | 'student.deleted'
 * - data: student payload (id, name, school_id, etc.)
 * - timestamp: ISO string
 */

const webhookUrl = process.env.STUDENT_WEBHOOK_URL || process.env.WEBHOOK_URL;

function notifyStudentEvent(event, data) {
  if (!webhookUrl) return;

  const payload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error(`[Webhook] Failed to notify ${event}:`, err.message);
  });
}

module.exports = { notifyStudentEvent };
