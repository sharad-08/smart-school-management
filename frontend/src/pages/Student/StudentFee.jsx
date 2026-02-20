 import React, { useState } from "react";

const StudentFee = () => {

  const student = {
    name: "Rahul Sharma",
    roll: "ST2026-001",
    class: "10th A",
    bank: "State Bank of India",
    account: "XXXXXX4587"
  };

  const [fees, setFees] = useState([
    { id: 1, type: "Tuition Fee", amount: 15000, status: "Pending" },
    { id: 2, type: "Transport Fee", amount: 5000, status: "Pending" },
    { id: 3, type: "Exam Fee", amount: 3000, status: "Paid" },
  ]);

  const [history, setHistory] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const handlePay = (fee) => {

    const transactionId = "TXN" + Math.floor(Math.random() * 1000000);
    const now = new Date();

    const updatedFees = fees.map(f =>
      f.id === fee.id ? { ...f, status: "Paid" } : f
    );

    setFees(updatedFees);

    const paymentDetails = {
      ...fee,
      transactionId,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    setHistory([...history, paymentDetails]);
    setReceipt(paymentDetails);
  };

  const downloadReceipt = () => {
    const content = `
SCHOOL PAYMENT RECEIPT
----------------------------
Student Name: ${student.name}
Roll Number: ${student.roll}
Class: ${student.class}

Fee Type: ${receipt.type}
Amount: ₹${receipt.amount}

Transaction ID: ${receipt.transactionId}
Date: ${receipt.date}
Time: ${receipt.time}

Bank: ${student.bank}
Account: ${student.account}

STATUS: SUCCESS
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Receipt.txt";
    link.click();
  };

  const totalPaid = fees
    .filter(f => f.status === "Paid")
    .reduce((acc, f) => acc + f.amount, 0);

  const totalPending = fees
    .filter(f => f.status === "Pending")
    .reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="min-h-screen   p-6">

      <h1 className="text-3xl font-bold mb-6">💳 Fee Management</h1>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-gray-500">Total Paid</h2>
          <p className="text-2xl font-bold text-green-600">₹{totalPaid}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-gray-500">Total Pending</h2>
          <p className="text-2xl font-bold text-red-600">₹{totalPending}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-gray-500">Student</h2>
          <p className="font-semibold">{student.name}</p>
          <p className="text-sm text-gray-500">Roll: {student.roll}</p>
        </div>

      </div>

      {/* FEE CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {fees.map((fee) => (
          <div
            key={fee.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            <h2 className="text-xl font-semibold">{fee.type}</h2>
            <p className="text-gray-600 mt-2">Amount: ₹{fee.amount}</p>

            <div className="mt-4">
              {fee.status === "Paid" ? (
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                  ✅ Paid
                </span>
              ) : (
                <button
                  onClick={() => handlePay(fee)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT HISTORY */}
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h2 className="text-xl font-bold mb-4">📜 Payment History</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Fee Type</th>
                  <th className="py-2 text-left">Amount</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2">{h.type}</td>
                    <td className="py-2">₹{h.amount}</td>
                    <td className="py-2">{h.date}</td>
                    <td className="py-2">{h.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {receipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            <h2 className="text-2xl font-bold text-center mb-4">
              🧾 Payment Receipt
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll No:</strong> {student.roll}</p>
              <p><strong>Class:</strong> {student.class}</p>

              <hr />

              <p><strong>Fee Type:</strong> {receipt.type}</p>
              <p><strong>Amount:</strong> ₹{receipt.amount}</p>

              <hr />

              <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
              <p><strong>Date:</strong> {receipt.date}</p>
              <p><strong>Time:</strong> {receipt.time}</p>

              <hr />

              <p><strong>Bank:</strong> {student.bank}</p>
              <p><strong>Account:</strong> {student.account}</p>

              <p className="text-green-600 font-semibold mt-2">
                Payment Successful ✔
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={downloadReceipt}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
              >
                Download
              </button>

              <button
                onClick={() => setReceipt(null)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default StudentFee;
