export default function SummaryWidget({counter,color,text}) {
  return (
    <div className="bg-cardbg rounded-lg p-4 relative overflow-hidden">
      <div className={`text-5xl font-bold text-${color}-500 mb-2`}>
        {counter}
      </div>
      <div className={`bg-${color}-800 bg-opacity-50 text-${color}-200 text-xs font-medium px-3 py-1 rounded-full inline-block capitalize`}>
        {text}
      </div>
    </div>
  );
}