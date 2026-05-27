import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
 import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetStatsQuery } from '../redux/api/entryApiSlice';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard'

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const moodEmoji = {
    happy: '😄', sad: '😢',
    angry: '😠', anxious: '😰',
    calm: '😌', excited: '🤩',
    neutral: '😐',}
 
const  weekMood = [4, 5, 3, 0, 4, 1, 5]
const emojis = [ '😐','😒',  '😢', '😠',  '😰','😌', '🤩',]

const Dashboard =() => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  
  const {data: allStats, isLoading: fetching} = useGetStatsQuery();
  
    useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Create the same gradient from your original code
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
    gradient.addColorStop(0, '#5f4bb6');
    gradient.addColorStop(1, '#a78bfa');

    setChartData({
       
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: weekMood,
          borderColor: gradient,
          borderWidth: 4,
          pointBackgroundColor: '#5f4bb6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#5f4bb6',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
          
          tension: 0.2, // Set to 0.4 if you want smooth curved lines instead
          backgroundColor: 'rgba(95, 75, 182, 0.1)', // Light purple fill under the line
      fill: true, // Change from false to true
         },
      ],
    });
  }, [ ]);
 const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the dataset label box
      },
      tooltip: {
        backgroundColor: '#5f4bb6',
        titleFont: { size: 12 },
        bodyFont: { size: 14, weight: 'bold' },
        displayColors: false,
        callbacks: {
          // Simplifies tooltip to show just the number value
          title: () => '',
          label: (context) => `Mood: ${emojis[context.raw]}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Matches your clean layout without vertical grid lines
        },
        ticks: {
          color: '#6b7280', // Tailwind text-gray-500
          font: {
            size: 14,
            family: 'sans-serif',
          },
        },
      },
      y: {
        min: 0,  
        max: 6, 
        ticks: {
          stepSize: 1, // Forces grid ticks to jump exactly by 1 unit
          color: '#9ca3af', // Tailwind text-gray-400
          callback: function(value) {
          // If your data is 1-based, use: return moodEmojis[value - 1];
          return emojis[value] || ''; 
        },
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#f3f4f6', // Tailwind stroke-gray-100
        },
      },
    },
  };
  if (fetching) return <Loader />;
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-[#f6f7fb]">
  <Navbar />

  {/* STATS */}
  <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6 mb-6">
      <StatCard
      title= 'Total Entries'
      value={allStats.totalEntry}
      subtitle= '+12 this month'
      icon= '📝'
      > </StatCard> 
      <StatCard
        title= 'Total Entries'
      value={allStats.streak}
      subtitle= 'Keep it up!'
      icon= '🔥' 
      > </StatCard> 
      
    <StatCard
      title="avg Mood"
      value={allStats.commonMood}
      subtitle="Repiting mood"
      icon={moodEmoji?.[allStats?.commonMood]}
/>
       <StatCard
        title= 'Total Entries'
      value={allStats.totalEntry}
      subtitle= '+12 this month'
      icon= '📝'
      > </StatCard> 
  </section>

  {/* MIDDLE SECTION */}
  <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    
    {/* CHART */}
    <div className="xl:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold">Mood This Week</h3>
          <p className="text-xs text-gray-400">
            Emotional trend overview
          </p>
        </div>

        <button className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
          Weekly
        </button>
      </div>

      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>

    {/* STREAK */}
    <div className="bg-[#1e1b3a] text-white rounded-xl p-5 flex flex-col justify-between">
      <div>
        <p className="text-xs text-gray-300">Writing Streak</p>

        <h2 className="text-5xl font-semibold mt-2 mb-3">
          {allStats.streak}
        </h2>

        <p className="text-sm text-gray-300 leading-snug">
          You’ve written consistently for {allStats.streak} days.
        </p>
      </div>

      <div className="mt-6">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
           <div className={` h-10 bg-white rounded-lg text-lg transition

                      w-[${ allStats.totalEntry}0%]
                      `} />
        </div>

        <p className="text-[11px] text-gray-400 mt-2">
          Goal: {allStats.streak} days
        </p>
      </div>
    </div>
  </section>

  {/* RECENT ENTRIES */}
  <section className="mt-6 bg-white rounded-xl p-5 border border-gray-100">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h3 className="text-lg font-semibold">Recent Entries</h3>
        <p className="text-xs text-gray-400">
          Your latest journal moments
        </p>
      </div>

      <button className="text-xs px-4 py-2 rounded-md bg-[#1e1b3a] text-white hover:opacity-90 transition">
        View All
      </button>
    </div>

    <div className="space-y-3">
      {allStats.recentEntries.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
              {moodEmoji?.[entry?.mood]}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {entry.title}
              </h4>
              <p className="text-[11px] text-gray-400">
                {entry.date} • {entry.time}
              </p>
            </div>
          </div>
          <Link to={`/entries/${entry._id}`}>
            <button className="text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition">
              open
            </button>
          </Link>
        </div>
      ))}
    </div>
  </section>
</main>
  );
};

export default Dashboard;