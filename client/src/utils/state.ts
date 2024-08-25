export function generateCryptoRandomState(): string {
  const randomValues = new Uint32Array(2);
  window.crypto.getRandomValues(randomValues);

  // Encode as UTF-8
  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(
    String.fromCharCode.apply(null, Array.from(randomValues))
  );

  // Base64 encode the UTF-8 data
  return btoa(String.fromCharCode.apply(null, Array.from(utf8Array)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
