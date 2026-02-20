const FeeCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="font-semibold mb-2">Fee Summary</h2>
      <p className="text-2xl font-bold text-red-500">₹10,000</p>
      <p className="text-gray-500">Due: 31 March 2026</p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Pay Now
      </button>
    </div>
  );
};

export default FeeCard;
