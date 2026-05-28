import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { clearCredentials } from "../redux/features/userSlices";
import { useDispatch } from "react-redux";
const Settings = () => {
const [logout] = useLogoutMutation();
const navigate = useNavigate();
const dispatch = useDispatch()
const handleLogout = async() => {
  await logout()
  dispatch(clearCredentials());
  navigate('/login')
}
  return ( 
    <div className="min-h-screen bg-[#f6f7fb] flex text-gray-800">

  <main className="flex-1 p-6 overflow-y-auto">

    {/* HEADER */}
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

      <div>
        <h2 className="text-2xl font-semibold">
          Settings
        </h2>

        <p className="text-xs text-gray-400 mt-1 max-w-xl">
          Manage profile, preferences, and account security.
        </p>
      </div>

      <button className="px-4 py-2 text-xs rounded-md bg-[#1e1b3a] text-white hover:opacity-90 transition">
        Save changes
      </button>

    </section>

    <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">

      {/* LEFT CONTENT */}
      <div className="2xl:col-span-3 space-y-6">

        {/* PROFILE */}
        <section className="bg-white rounded-xl p-5 border border-gray-100">

          <div className="flex flex-col lg:flex-row gap-6">

            {/* AVATAR */}
            <div className="relative w-fit">
              <div className="w-20 h-20 rounded-xl bg-[#1e1b3a] text-white flex items-center justify-center text-2xl font-semibold">
                M
              </div>

              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-md bg-white border border-gray-200 text-xs">
                📷
              </button>
            </div>

            {/* FIELDS */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                defaultValue=""
                placeholder="Full name"
                className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />

              <input
                defaultValue="email@example.com"
                placeholder="Email"
                className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />

              <textarea
                className="md:col-span-2 px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                rows={3}
                defaultValue="CS student writing thoughts at 3AM."
              />
            </div>

          </div>

        </section>

        {/* PREFERENCES */}
        <section className="bg-white rounded-xl p-5 border border-gray-100 space-y-5">

          <h3 className="text-sm font-semibold">
            Preferences
          </h3>

          {/* THEME */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">

            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-gray-400">Light or dark mode</p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs rounded-md bg-[#1e1b3a] text-white">
                Light
              </button>

              <button className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-600">
                Dark
              </button>
            </div>

          </div>

          {/* NOTIFICATIONS */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">

            <div>
              <p className="text-sm font-medium">Reminders</p>
              <p className="text-xs text-gray-400">Daily writing nudges</p>
            </div>

            <input type="checkbox" className="accent-[#1e1b3a] w-4 h-4" defaultChecked />

          </div>

          {/* PRIVACY */}
          <div className="flex items-center justify-between py-3">

            <div>
              <p className="text-sm font-medium">Reminder Time</p>
              <p className="text-xs text-gray-400"> Reminder every day at this time</p>
            </div>

            <input type="time" className="bg-white "   />

          </div>

        </section>

        {/* SECURITY */}
        <section className="bg-white rounded-xl p-5 border border-gray-100">

          <h3 className="text-sm font-semibold mb-4">
            Security
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="password"
              placeholder="Current password"
              className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100"
            />

            <input
              type="password"
              placeholder="New password"
              className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100"
            />

          </div>

          <button className="mt-4 px-4 py-2 text-xs rounded-md bg-[#1e1b3a] text-white">
            Update password
          </button>

        </section>

      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-5">

        {/* PROFILE SUMMARY */}
        <div className="bg-[#1e1b3a] text-white rounded-xl p-5">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
              M
            </div>

            <div>
              <p className="font-medium">Musi</p>
              <p className="text-xs text-gray-300">Journal user</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-300">

            <div className="flex justify-between">
              <span>Entries</span>
              <span className="text-white">32</span>
            </div>

            <div className="flex justify-between">
              <span>Streak</span>
              <span className="text-white">7</span>
            </div>

            <div className="flex justify-between">
              <span>Mood</span>
              <span className="text-white">😊</span>
            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 space-y-2">

          <button className="w-full px-3 py-2 text-xs rounded-md bg-gray-100">
            Export entries
          </button>

          <button className="w-full px-3 py-2 text-xs rounded-md bg-gray-100"
          onClick={handleLogout}>
            Log Out
           </button>

          <button className="w-full px-3 py-2 text-xs rounded-md bg-red-50 text-red-500">
            Delete account
          </button>

        </div>

      </aside>

    </div>

  </main>
</div>
  )
}
export default Settings;