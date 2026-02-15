export default function Slide04() {
  const images = [
    "/images/slide4_1.jpg",
    "/images/slide4_2.jpg",
    "/images/slide4_3.jpg",
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-10">
      {/* "Page" container */}
      <div className="mx-auto w-full max-w-6xl">
        {/* Top text */}
        <div className="mb-10">
          <h1 className="text-center text-5xl md:text-6xl font-semibold tracking-tight text-black dark:text-white">
            Early dating era.
          </h1>
          <p className="mt-3 text-center text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300">
            The tension, the drama, the will he, won’t he.
          </p>
        </div>

        {/* Images row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((src) => (
            <div
              key={src}
              className="rounded-2xl bg-white dark:bg-zinc-900 ring-1 ring-black/10 dark:ring-white/10 shadow-sm overflow-hidden"
            >
              {/* Fixed-height frame so all images look uniform */}
              <div className="h-[420px] md:h-[460px]">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Optional little bottom line like your sketch */}
        <div className="mt-10 border-t border-black/10 dark:border-white/10" />
      </div>
    </div>
  );
}



