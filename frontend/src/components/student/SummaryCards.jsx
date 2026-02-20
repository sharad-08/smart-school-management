const SummaryCards = () => {

  const cards = [
    { title: "Attendance", value: "92%", color: "bg-blue-500", icon: "bx bx-calendar" },
    { title: "Average Marks", value: "85%", color: "bg-green-500", icon: "bx bx-bar-chart" },
    { title: "Fees Due", value: "₹10,000", color: "bg-red-500", icon: "bx bx-credit-card" },
    { title: "Rank", value: "5th", color: "bg-purple-500", icon: "bx bx-trophy" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
          <div className={`p-3 rounded-lg ${card.color}`}>
            <i className={`${card.icon} text-white text-xl`}></i>
          </div>
          <div>
            <p className="text-gray-500">{card.title}</p>
            <h2 className="text-xl font-semibold">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
