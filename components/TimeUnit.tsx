const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[80px] border border-white/20 shadow-lg">
      <span className="text-4xl font-bold text-white tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="text-white/60 text-sm font-medium mt-2 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default TimeUnit;