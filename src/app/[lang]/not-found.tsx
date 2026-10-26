import Link from 'next/link'

export default function NotFound() {
  return (
    <section data-shell="nacre" className="flex min-h-dvh items-center px-5 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="display text-[clamp(3.5rem,12vw,9rem)] font-extrabold">404</h1>
        <p className="mt-6 text-xl text-mist">This page doesn’t exist. Questa pagina non esiste.</p>
        <Link href="/" className="mt-10 inline-block rounded-full bg-nacre px-7 py-3.5 font-medium text-abyss">
          dodoshell
        </Link>
      </div>
    </section>
  )
}
