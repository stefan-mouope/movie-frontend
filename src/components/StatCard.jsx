// src/components/StatCard.jsx
function StatCard({ title, value, icon, color }) {
    return (
      <div className={`bg-gradient-to-r ${color} p-6 rounded-xl text-white flex items-center space-x-4`}>
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    );
  }
  
  export default StatCard;