export default function Slide14() {
  const images = [
    "/images/slide14_1.jpg",
    "/images/slide14_2.jpg",
    "/images/slide14_3.jpg",
    "/images/slide14_4.jpg",
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Top divider */}
        <div className="mb-6 border-t border-black/20 dark:border-white/15" />

        {/* Title */}
        <h1 className="text-center text-5xl md:text-6xl font-semibold text-pink-500 mb-10">
          Ending the year with the best person I know ♡
        </h1>

        {/* Collage strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {images.map((src, i) => (
            <div
              key={src}
              className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-zinc-900"
            >
              {/* fixed height so they align nicely */}
              <div className="h-[380px] md:h-[420px]">
                <img
                  src={src}
                  alt={`slide14-${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom pink line like your sketch */}
        <div className="mt-10 border-t-4 border-pink-500" />
      </div>
    </div>
  );
}
