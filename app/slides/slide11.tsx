export default function Slide11() {
  const images = [
    "/images/slide11_1.jpg",
    "/images/slide11_2.jpg",
    "/images/slide11_3.jpg",
    "/images/slide11_4.jpg",
    "/images/slide11_5.jpg",
    "/images/slide11_6.jpg",
  ];

  return (
    <div className="min-h-screen bg-black px-8 py-12 flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-6xl">
        {/* Title */}
        <h1 className="text-center text-5xl md:text-6xl font-bold text-white mb-10">
          And had many, many fun dates together
        </h1>

        {/* Scattered collage container */}
        <div className="relative w-full h-[600px]">
          {/* Image 1 - museum (top left, rotated) */}
          <div 
            className="absolute w-72 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              top: '5%', 
              left: '8%',
              transform: 'rotate(-8deg)',
              zIndex: 1
            }}
          >
            <img src={images[0]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>

          {/* Image 2 - dinner date (center, slight rotation) */}
          <div 
            className="absolute w-80 h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              top: '15%', 
              left: '32%',
              transform: 'rotate(4deg)',
              zIndex: 3
            }}
          >
            <img src={images[1]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>

          {/* Image 3 - painting class (top right) */}
          <div 
            className="absolute w-64 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              top: '8%', 
              right: '10%',
              transform: 'rotate(6deg)',
              zIndex: 2
            }}
          >
            <img src={images[2]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>

          {/* Image 4 - raffle winner (bottom left) */}
          <div 
            className="absolute w-64 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              bottom: '12%', 
              left: '5%',
              transform: 'rotate(3deg)',
              zIndex: 2
            }}
          >
            <img src={images[3]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>

          {/* Image 5 - ice skating (bottom right) */}
          <div 
            className="absolute w-72 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              bottom: '8%', 
              right: '8%',
              transform: 'rotate(-5deg)',
              zIndex: 1
            }}
          >
            <img src={images[4]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>

          {/* Image 6 - night out (middle bottom) */}
          <div 
            className="absolute w-60 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            style={{ 
              bottom: '18%', 
              left: '38%',
              transform: 'rotate(-3deg)',
              zIndex: 4
            }}
          >
            <img src={images[5]} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}