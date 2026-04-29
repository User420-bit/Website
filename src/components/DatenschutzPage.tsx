import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Datenschutzerklärung</h1>
        <p className="mt-2 text-sm text-muted-foreground">Stand: April 2026</p>

        <div className="prose prose-neutral mt-8 max-w-none text-foreground space-y-6">
          <section>
            <h2 className="mt-8 text-xl font-semibold">1. Verantwortlicher</h2>
            <p className="mt-2 leading-relaxed">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              <br />
              Pharrel Sandjo Djomou
              <br />
              {/* TODO: Echte ladungsfähige Anschrift einfügen */}
              [Straße und Hausnummer], [PLZ Ort], Deutschland
              <br />
              E-Mail:{' '}
              <a href="mailto:studsandph@gmail.com" className="text-primary hover:underline">
                studsandph@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">2. Hosting (GitHub Pages)</h2>
            <p className="mt-2 leading-relaxed">
              Diese Website wird über GitHub Pages der GitHub, Inc. (88 Colin P Kelly Jr St, San
              Francisco, CA 94107, USA) ausgeliefert. Beim Aufruf der Website werden vom Anbieter
              technisch notwendig folgende Daten in Server-Logfiles verarbeitet: IP-Adresse,
              Datum und Uhrzeit, übertragene Datenmenge, User-Agent (Browser/Betriebssystem) sowie
              Referrer-URL. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer technisch fehlerfreien Bereitstellung).
            </p>
            <p className="mt-2 leading-relaxed">
              Weitere Informationen finden sich in der Datenschutzerklärung von GitHub:{' '}
              <a
                href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                docs.github.com/.../privacy-statement
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">3. Verarbeitete Daten</h2>
            <p className="mt-2 leading-relaxed">
              Diese Website setzt <strong>keine Tracking-Cookies</strong> und kein Web-Analytics
              ein. Es findet kein Profiling statt. Externe Schriften, Iframes oder CDN-Skripte
              werden nicht zur Laufzeit nachgeladen; alle Assets sind lokal eingebunden.
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>
                <strong>Kontaktaufnahme per E-Mail (mailto):</strong> Wenn Sie mich per E-Mail
                kontaktieren, werden Ihre Angaben (E-Mail-Adresse, Inhalt) zur Bearbeitung der
                Anfrage gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder f DSGVO.
              </li>
              <li>
                <strong>localStorage:</strong> Es werden ausschließlich UI-Präferenzen (z. B.
                aktives Theme, Inhalte des Admin-Bereichs) lokal in Ihrem Browser gespeichert.
                Diese Daten verlassen Ihr Gerät nicht und werden nicht an mich oder Dritte
                übermittelt.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">4. Ihre Rechte</h2>
            <p className="mt-2 leading-relaxed">Sie haben jederzeit das Recht auf:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Beschwerde bei einer Aufsichtsbehörde, z. B. dem Bayerischen Landesbeauftragten
                für den Datenschutz (Art. 77 DSGVO)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">5. Änderungen dieser Erklärung</h2>
            <p className="mt-2 leading-relaxed">
              Diese Datenschutzerklärung kann angepasst werden, wenn sich rechtliche oder
              technische Rahmenbedingungen ändern. Die jeweils aktuelle Fassung ist auf dieser
              Seite abrufbar.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
