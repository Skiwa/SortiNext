import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <section>
          <h2>Albums populaires</h2>
          <div>
            <Link href="/albums/550e8400-e29b-41d4-a716-446655440010">
              <h3>Dans la radio</h3>
            </Link>
            <Link href="/albums/550e8400-e29b-41d4-a716-446655440011">
              <h3>Tout est magnifique</h3>
            </Link>
          </div>
        </section>

        <main></main>
      </div>
    </div>
  );
}
