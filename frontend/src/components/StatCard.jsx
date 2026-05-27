const StatCard = ({title='title', subtitle='subtitle', value='value',icon=''}) => {

return(
 <div
        key={title}
        className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500">{title}</p>
          <span className="text-lg opacity-70">{icon} </span>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900">
          {value}
        </h3>

        <p className="text-[11px] text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>
)
}
export default StatCard;