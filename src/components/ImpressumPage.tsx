import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Impressum</h1>
        <p className="mt-2 text-sm text-muted-foreground">Angaben gemäß § 5 TMG</p>

        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          <section>
            <h2 className="mt-8 text-xl font-semibold">Verantwortlich für den Inhalt</h2>
            <p className="mt-2 leading-relaxed">
              Pharrel Sandjo Djomou
              <br />
              {/* TODO: Echte ladungsfähige Anschrift einfügen */}
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">Kontakt</h2>
            <p className="mt-2 leading-relaxed">
              E-Mail:{' '}
              <a href="mailto:studsandph@gmail.com" className="text-primary hover:underline">
                studsandph@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">
              Verantwortlich i.S.d. § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2 leading-relaxed">
              Pharrel Sandjo Djomou
              <br />
              {/* TODO: Anschrift wie oben */}
              [Anschrift wie oben]
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">Haftung für Inhalte</h2>
            <p className="mt-2 leading-relaxed">
              Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">Haftung für Links</h2>
            <p className="mt-2 leading-relaxed">
              Diese Seite enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
              Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="mt-8 text-xl font-semibold">Urheberrecht</h2>
            <p className="mt-2 leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
