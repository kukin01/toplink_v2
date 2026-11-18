import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/services";

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#01034F] px-6 pt-8 pb-16 text-white md:px-12 md:pt-12 md:pb-24">
      <Link
        href="/#services"
        className="mb-12 w-fit font-karla text-white/75 underline underline-offset-4 hover:text-white"
      >
        Back to services
      </Link>
      <h1 className="mb-6 font-karla text-4xl font-bold md:text-6xl">
        {service.service}
      </h1>
      <p className="max-w-2xl font-karla text-lg leading-relaxed text-white/80">
        {service.description}
      </p>
    </main>
  );
}
