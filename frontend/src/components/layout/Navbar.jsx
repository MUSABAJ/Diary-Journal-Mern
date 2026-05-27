
const Navbar = () => {
 

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Hello, Musi </h2>

        <p className="text-gray-500 text-lg">
          Here’s your journaling overview for today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search entries..."
            className="bg-white pl-12 pr-5 py-3 rounded-2xl shadow-sm border border-gray-100 focus:outline-none w-72"
          />
        </div>

        <div className="w-12 h-12 rounded-full bg-[#5f4bb6] text-white flex items-center justify-center text-lg font-bold shadow-lg">
          M
        </div>
      </div>
    </div>
  )
}

export default Navbar;
