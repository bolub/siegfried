import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Sign signatures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto py-10">
        <h1 className="text-2xl">Welcome to siegfried signatures</h1>
      </header>

      <main>
        <section className="container mx-auto">
          <Link
            className="rounded-md bg-black px-6 py-3 font-medium text-white ring-offset-2 focus:outline-none focus:ring-2 focus:ring-black"
            href="/login"
          >
            Login
          </Link>
        </section>
      </main>
    </>
  );
}
