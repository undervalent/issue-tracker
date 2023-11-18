import Pagination from "@/lib/components/pagination";

export default function Home({ searchParams }: {
  searchParams: {
    page: string
  }
}) {

  return (
    <section>
      <Pagination itemCount={100} currentPage={parseInt(searchParams.page)} pageSize={10} />
    </section>
  )
}
