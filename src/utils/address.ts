export function generateAddress(): string {
  const bytes = new Uint8Array(20); // 20 bytes = 40 hex chars
  crypto.getRandomValues(bytes);

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return "0x" + hex;
}