/**
 * Meldet ein Ereignis an Umami, falls das Skript geladen ist (siehe
 * `Reichweite.astro`). Ohne Umami, mit Content-Blocker oder bei "Do Not Track"
 * passiert nichts.
 */
export function melde(ereignis: string, daten?: Record<string, string>): void {
  const umami = (window as { umami?: { track(name: string, data?: object): void } }).umami
  umami?.track(ereignis, daten)
}
