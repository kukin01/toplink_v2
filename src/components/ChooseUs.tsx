
"use client";

export default function ChooseUs() {
  return (
    <section className="w-full bg-[#01034F] px-6 py-20 text-white sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">

        <div className="flex flex-col">
          <h2 className="mb-8 font-karla text-3xl font-bold text-yellow-400 tracking-tight text-white sm:text-4xl">
            Why it should be us?
          </h2>
          <span className="font-karla text-7xl font-bold leading-none tracking-tight text-white sm:text-8xl md:text-9xl">
            7+
          </span>

          <p className="mt-4 font-karla text-lg font-medium tracking-wide text-white/65 sm:text-xl">
            Years of expertise
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="font-karla text-lg leading-relaxed text-white/80 sm:text-xl md:text-2xl md:leading-relaxed">
            Great brands need more than good design. They need a clear vision,
            thoughtful execution, and digital experiences that move people.
            We bring it all together, helping businesses build stronger
            identities, connect with their audiences, and grow with purpose.
          </p>
        </div>

      </div>
    </section>
  );
}
