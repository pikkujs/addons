import type { AuthenticationState } from '@whiskeysockets/baileys'

/**
 * Options passed to BaileysGatewayAdapter constructor.
 */
export interface BaileysAdapterOptions {
  /** Auth dir path (default '.baileys-auth') or pre-built { state, saveCreds } */
  auth?: string | { state: AuthenticationState; saveCreds: () => Promise<void> }
  /** Callback invoked with the QR string when pairing is needed.
   *  If omitted, the adapter prints the QR to the terminal via qrcode-terminal. */
  onQR?: (qr: string) => void
  /** Any additional Baileys socket config overrides (logger, browser, etc.) */
  [key: string]: unknown
}
