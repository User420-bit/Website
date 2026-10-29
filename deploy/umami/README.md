# Umami auf dem Hetzner-Server

Cookielose Reichweitenmessung für web-klartext.de, selbst gehostet. Die Website selbst bleibt auf
GitHub Pages; auf dem Hetzner-Server läuft nur Umami unter `statistik.web-klartext.de`.

## Einmalig einrichten

1. **DNS:** Beim Domain-Anbieter einen A-Eintrag `statistik` auf die IPv4-Adresse des Servers
   setzen (bei IPv6 zusätzlich AAAA).
2. **Server:** Docker mit Compose-Plugin installiert, Ports 80 und 443 offen (Hetzner-Firewall
   und `ufw`, falls aktiv).
3. **Dateien hochladen und Geheimnisse setzen:**

   ```bash
   scp -r deploy/umami root@SERVER-IP:/opt/umami
   ssh root@SERVER-IP
   cd /opt/umami
   cp .env.example .env
   # POSTGRES_PASSWORD und APP_SECRET je mit `openssl rand -hex 32` füllen
   docker compose up -d
   ```

4. **Anmelden:** `https://statistik.web-klartext.de`, Benutzer `admin`, Passwort `umami`.
   **Das Passwort sofort ändern** (Einstellungen → Profil).
5. **Website anlegen:** Einstellungen → Websites → Hinzufügen, Domain `web-klartext.de`. Die
   angezeigte Website-ID in `src/lib/reichweite.json` bei `websiteId` eintragen, committen,
   nach `main` mergen. Erst dann misst die Seite, und die Datenschutzerklärung beschreibt Umami.
6. **Auftragsverarbeitung:** Den AV-Vertrag mit Hetzner im Hetzner-Kundenkonto
   (accounts.hetzner.com, Bereich Auftragsverarbeitung) abschließen. Die Datenschutzerklärung behauptet, dass er besteht.
7. **Eigene Besuche ausschließen:** Auf web-klartext.de in der Browser-Konsole
   `localStorage.setItem('umami.disabled', 1)` ausführen.

## Betrieb

- Aktualisieren: Version in `docker-compose.yml` erhöhen, dann
  `docker compose pull && docker compose up -d`.
- Sicherung: `docker compose exec db pg_dump -U umami umami > umami-$(date +%F).sql`.
