
import { sha256 } from "./hash";

export async function mineBlock(
  blockNo: number,
  data: string,
  previousHash: string,
  difficulty: number,
  startNonce = 0
): Promise<{ nonce: number; hash: string }> {
  const target = "0".repeat(difficulty);
  let nonce = startNonce;

  while (true) {
    const input = `${blockNo}${nonce}${data}${previousHash}`;
    const hash = await sha256(input);

    if (hash.startsWith(target)) {
      return { nonce, hash };
    }

    nonce++;
  }
}

