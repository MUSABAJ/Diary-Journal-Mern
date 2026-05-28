import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { userInfo } = useSelector((state) => state.user);

   return (
    <div className=" bg-gradient-to-br from-blue-50 via-slate-100 to-white    text-gray-900">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0">
        <h1 className="font-semibold text-sm">My Diary</h1>

        <nav className="flex items-center gap-4 text-xs text-gray-500">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#how" className="hover:text-gray-900">How it works</a>
          <a href="#pricing" className="hover:text-gray-900"> </a>
        </nav>

        <div className="flex gap-2">
          <a href="/login" className="text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50">
            Login
          </a>

          <a href="/signup" className="text-xs px-3 py-1.5 rounded-md bg-gray-900 text-white hover:opacity-90">
            Get started
          </a>
        </div>
      </header>

         <section className="w-full  px-52 py-32 text-center">
       
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Your thoughts, organized<br />
            without the chaos
          </h2>

          <p className="text-xs md:text-sm text-gray-500 mt-4 max-w-xl mx-auto">
            A minimal journaling app to capture thoughts, track mood, and build consistency —
            without distractions, noise, or overcomplicated tools.
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <a
          href="/signup"
          className="bg-gray-900 text-white px-4 py-2 text-xs rounded-md hover:opacity-90"
            >
          Start writing
            </a>

            <a
          href="#features"
          className="bg-white border border-gray-200 px-4 py-2 text-xs rounded-md hover:bg-gray-50"
            >
          See features
            </a>
          </div>

          {/* MINI STATS */}
        <div className="grid grid-cols-3 gap-4 mt-16 text-center text-xs text-gray-500">

          <div className='border border-slate-400 px-0 py-8  rounded-md'>
            <p className="text-lg font-semibold text-gray-900  " >100%</p>
            Private
          </div>

          <div className='border border-slate-400 px-0 py-8  rounded-md'>
            <p className="text-lg font-semibold text-gray-900">7+</p>
            Day streak tracking
          </div>

          <div className='border border-slate-400 px-0 py-8  rounded-md'>
            <p className="text-lg font-semibold text-gray-900">∞</p>
            Unlimited entries
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-12">

        <h3 className="text-xl font-semibold mb-8">Features</h3>

        <div className="grid md:grid-cols-3 gap-4">

          {[
            {
              title: "Daily Journaling",
              desc: "Write thoughts quickly with a distraction-free editor."
            },
            {
              title: "Mood Tracking",
              desc: "Track emotional patterns over time."
            },
            {
              title: "Writing Streaks",
              desc: "Stay consistent with visual progress tracking."
            },
            {
              title: "Private by Design",
              desc: "Your entries are fully private and secure."
            },
            {
              title: "Search Everything",
              desc: "Instantly find past thoughts and entries."
            },
            {
              title: "Minimal Interface",
              desc: "No clutter. Just writing."
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-sky-50 py-10 border border-gray-100 rounded-xl p-4"
            >
              <h4 className="text-sm font-medium">{f.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-16">

        <h3 className="text-xl font-semibold mb-8">How it works</h3>

        <div className="space-y-4">

          {[
            "Create an account in seconds",
            "Write your first entry",
            "Track moods and streaks automatically",
            "Reflect on your growth over time"
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-sky-50 border border-gray-100 rounded-xl p-4"
            >
              <div className="w-6 h-6 rounded-md bg-gray-900 text-white flex items-center justify-center text-xs">
                {i + 1}
              </div>

              <p className="text-xs text-gray-700">{step}</p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h3 className="text-2xl font-semibold">
          Start writing your thoughts today
        </h3>

        <p className="text-xs text-gray-500 mt-3">
          No distractions. No noise. Just clarity.
        </p>

        <a
          href="/signup"
          className="inline-block mt-6 bg-gray-900 text-white px-5 py-2 text-xs rounded-md hover:opacity-90"
        >
          Get started
        </a>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} My Diary. Built by Musab ajr..
      </footer>

    </div>
  );
}
export default Landing;