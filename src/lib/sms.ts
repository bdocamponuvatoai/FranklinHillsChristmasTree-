/** `sms:` link that opens a pre-filled text message on the visitor's own device. */
export function smsHref(phoneE164: string, body: string): string {
  return `sms:${phoneE164}?body=${encodeURIComponent(body)}`;
}
