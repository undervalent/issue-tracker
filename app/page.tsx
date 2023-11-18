import Pagination from "@/lib/components/pagination";

export default function Home() {
  return (
    <section>
      <Pagination itemCount={100} currentPage={1} pageSize={10} />
    </section>
  )
}
