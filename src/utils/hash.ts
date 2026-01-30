
export async function sha256(input: string): Promise<string> {
  // Encode string → Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Compute SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert buffer → hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
