// // import React from "react";

// // const StudentFees = () => {
// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow">
// //       <h1 className="text-xl font-bold mb-4">Student Fees</h1>

// //       <div className="grid grid-cols-3 gap-4 mb-6">
// //         <input className="p-2 border rounded" placeholder="Total Fee ₹50000" />
// //         <input className="p-2 border rounded" placeholder="Paid ₹30000" />
// //         <input className="p-2 border rounded" placeholder="Remaining ₹20000" />
// //       </div>

// //       <button className="bg-green-600 text-white px-5 py-2 rounded">
// //         Add Payment
// //       </button>
// //     </div>
// //   );
// // };

// // export default StudentFees;

// import React, { useState } from "react";
// import { FaEye, FaMoneyBillWave, FaHistory } from "react-icons/fa";

// const StudentFees = () => {
//   /* ================= SAMPLE DATA ================= */
//   const [students, setStudents] = useState([
//     {
//       id: 1,
//       admissionId: "ADM1001",
//       name: "Rahul Sharma",
//       roll: "101",
//       class: "10A",
//       totalFee: 50000,
//       paid: 30000,
//       lastPayment: "12 Jan 2026",
//       transactions: [
//         { date: "01 Jan 2026", amount: 20000, mode: "Cash" },
//         { date: "12 Jan 2026", amount: 10000, mode: "UPI" },
//       ],
//     },
//     {
//       id: 2,
//       admissionId: "ADM1002",
//       name: "Priya Singh",
//       roll: "102",
//       class: "10A",
//       totalFee: 50000,
//       paid: 50000,
//       lastPayment: "10 Jan 2026",
//       transactions: [
//         { date: "10 Jan 2026", amount: 50000, mode: "Bank Transfer" },
//       ],
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [collectModal, setCollectModal] = useState(false);
//   const [historyModal, setHistoryModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [mode, setMode] = useState("Cash");

//   /* ================= FILTER BY ROLL ================= */
//   const filteredStudents = students.filter((student) =>
//     student.roll.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ================= COLLECT FEE ================= */
//   const handleCollect = () => {
//     if (!amount) return;

//     const updatedStudents = students.map((student) => {
//       if (student.id === selectedStudent.id) {
//         return {
//           ...student,
//           paid: student.paid + Number(amount),
//           lastPayment: new Date().toLocaleDateString(),
//           transactions: [
//             ...student.transactions,
//             {
//               date: new Date().toLocaleDateString(),
//               amount: Number(amount),
//               mode,
//             },
//           ],
//         };
//       }
//       return student;
//     });

//     setStudents(updatedStudents);
//     setCollectModal(false);
//     setAmount("");
//   };

//   /* ================= STATUS FUNCTION ================= */
//   const getStatus = (student) => {
//     if (student.paid === 0) return "Pending";
//     if (student.paid < student.totalFee) return "Partial";
//     return "Paid";
//   };

//   /* ================= CALCULATIONS ================= */
//   const totalCollected = students.reduce((acc, s) => acc + s.paid, 0);
//   const totalPending = students.reduce(
//     (acc, s) => acc + (s.totalFee - s.paid),
//     0
//   );

//   return (
//     <div className="p-6 space-y-6">

//       {/* ================= DASHBOARD CARDS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card title="Total Collected" value={`₹${totalCollected}`} color="bg-green-100 text-green-700" />
//         <Card title="Total Pending" value={`₹${totalPending}`} color="bg-red-100 text-red-700" />
//         <Card title="Total Students" value={students.length} color="bg-blue-100 text-blue-700" />
//       </div>

//       {/* ================= FILTER ================= */}
//       <div className="bg-white p-4 rounded-xl shadow">
//         <input
//           type="text"
//           placeholder="Search by Roll Number..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded-lg w-full"
//         />
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-white shadow rounded-xl overflow-x-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 text-xs uppercase">
//             <tr>
//               <th className="px-6 py-3">Admission ID</th>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Roll</th>
//               <th className="px-6 py-3">Class</th>
//               <th className="px-6 py-3">Total Fee</th>
//               <th className="px-6 py-3">Paid</th>
//               <th className="px-6 py-3">Due</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">{student.admissionId}</td>
//                 <td className="px-6 py-4">{student.name}</td>
//                 <td className="px-6 py-4">{student.roll}</td>
//                 <td className="px-6 py-4">{student.class}</td>
//                 <td className="px-6 py-4">₹{student.totalFee}</td>
//                 <td className="px-6 py-4 text-green-600">₹{student.paid}</td>
//                 <td className="px-6 py-4 text-red-600">
//                   ₹{student.totalFee - student.paid}
//                 </td>
//                 <td className="px-6 py-4 font-semibold">
//                   {getStatus(student)}
//                 </td>
//                 <td className="px-6 py-4 flex gap-3">
//                   <FaMoneyBillWave
//                     className="cursor-pointer text-green-600"
//                     onClick={() => {
//                       setSelectedStudent(student);
//                       setCollectModal(true);
//                     }}
//                   />
//                   <FaHistory
//                     className="cursor-pointer text-blue-600"
//                     onClick={() => {
//                       setSelectedStudent(student);
//                       setHistoryModal(true);
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= COLLECT MODAL ================= */}
//       {collectModal && (
//         <Modal title="Collect Fee" onClose={() => setCollectModal(false)}>
//           <div className="space-y-3">
//             <input
//               type="number"
//               placeholder="Enter Amount"
//               className="w-full border px-3 py-2 rounded"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             <select
//               className="w-full border px-3 py-2 rounded"
//               value={mode}
//               onChange={(e) => setMode(e.target.value)}
//             >
//               <option>Cash</option>
//               <option>UPI</option>
//               <option>Bank Transfer</option>
//               <option>Card</option>
//             </select>

//             <button
//               onClick={handleCollect}
//               className="bg-green-600 text-white px-4 py-2 rounded w-full"
//             >
//               Confirm Payment
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* ================= HISTORY MODAL ================= */}
//       {historyModal && (
//         <Modal title="Transaction History" onClose={() => setHistoryModal(false)}>
//           <div className="space-y-2">
//             {selectedStudent.transactions.map((t, i) => (
//               <div key={i} className="border p-3 rounded">
//                 <p>Date: {t.date}</p>
//                 <p>Amount: ₹{t.amount}</p>
//                 <p>Mode: {t.mode}</p>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// /* ================= REUSABLE COMPONENTS ================= */

// const Card = ({ title, value, color }) => (
//   <div className={`p-5 rounded-xl shadow ${color}`}>
//     <h3 className="text-sm">{title}</h3>
//     <p className="text-2xl font-bold mt-2">{value}</p>
//   </div>
// );

// const Modal = ({ title, children, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//     <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
//       <div className="flex justify-between mb-4">
//         <h2 className="font-bold">{title}</h2>
//         <button onClick={onClose}>✕</button>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// export default StudentFees;
import React, { useState } from "react";
import { FaMoneyBillWave, FaHistory, FaUndo } from "react-icons/fa";

const StudentFee = () => {
  /* ================= SAMPLE DATA ================= */
  const [students, setStudents] = useState([
    {
      id: 1,
      admissionId: "ADM1001",
      name: "Rahul Sharma",
      roll: "101",
      class: "10-A",
      totalFee: 50000,
      paid: 20000,
      dueDate: "2026-03-01",
      lastPayment: "2026-01-12",
      transactions: [],
      refunds: [],
    },
    {
      id: 2,
      admissionId: "ADM1002",
      name: "Priya Singh",
      roll: "102",
      class: "10-A",
      totalFee: 50000,
      paid: 50000,
      dueDate: "2026-03-01",
      lastPayment: "2026-01-10",
      transactions: [],
      refunds: [],
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [collectModal, setCollectModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    date: "",
    mode: "Cash",
    transactionId: "",
    remarks: "",
    installment: "Term 1",
  });

  /* ================= STATUS LOGIC ================= */
  const getStatus = (student) => {
    const due = student.totalFee - student.paid;
    if (student.paid === 0) return "Pending";
    if (due === 0) return "Paid";
    if (due > 0 && new Date(student.dueDate) < new Date()) return "Overdue";
    return "Partial";
  };

  /* ================= DASHBOARD CALCULATIONS ================= */
  const totalCollected = students.reduce((a, s) => a + s.paid, 0);
  const totalPending = students.reduce(
    (a, s) => a + (s.totalFee - s.paid),
    0
  );
  const totalTransactions = students.reduce(
    (a, s) => a + s.transactions.length,
    0
  );
  const totalRefund = students.reduce(
    (a, s) => a + s.refunds.reduce((sum, r) => sum + r.amount, 0),
    0
  );

  const classCollection = students.reduce((acc, s) => {
    if (!acc[s.class]) acc[s.class] = 0;
    acc[s.class] += s.paid;
    return acc;
  }, {});

  /* ================= COLLECT FEE ================= */
  const handleCollect = () => {
    const receiptNo = "RCPT" + Math.floor(100000 + Math.random() * 900000);

    const updated = students.map((s) => {
      if (s.id === selectedStudent.id) {
        const newTransaction = {
          ...form,
          receiptNo,
          collectedBy: "Admin",
          status: "Success",
        };

        setReceiptData({
          ...s,
          ...form,
          receiptNo,
          collectedBy: "Admin",
        });

        return {
          ...s,
          paid: s.paid + Number(form.amount),
          lastPayment: form.date,
          transactions: [...s.transactions, newTransaction],
        };
      }
      return s;
    });

    setStudents(updated);
    setCollectModal(false);
    setReceiptModal(true);
  };

  /* ================= REFUND ================= */
  const handleRefund = (amount, reason) => {
    const updated = students.map((s) => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          paid: s.paid - Number(amount),
          refunds: [
            ...s.refunds,
            {
              amount,
              reason,
              date: new Date().toISOString().slice(0, 10),
              approvedBy: "Admin",
            },
          ],
        };
      }
      return s;
    });

    setStudents(updated);
    setRefundModal(false);
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= DASHBOARD ================= */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="💰 Total Collected" value={`₹${totalCollected}`} />
        <Card title="⏳ Total Pending" value={`₹${totalPending}`} />
        <Card title="🧾 Transactions" value={totalTransactions} />
        <Card title="🔄 Refund Amount" value={`₹${totalRefund}`} />
      </div>

      {/* ================= CLASS COLLECTION ================= */}
      <div className="bg-white shadow p-4 rounded-xl">
        <h3 className="font-bold mb-3">📊 Class Wise Collection</h3>
        {Object.entries(classCollection).map(([cls, amount]) => (
          <p key={cls}>
            {cls} :
            <span className="font-semibold text-green-600">
              {" "}₹{amount}
            </span>
          </p>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Admission ID</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Last Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-3">{student.admissionId}</td>
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.roll}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">₹{student.totalFee}</td>
                <td className="px-4 py-3 text-green-600">₹{student.paid}</td>
                <td className="px-4 py-3 text-red-600">
                  ₹{student.totalFee - student.paid}
                </td>
                <td className="px-4 py-3">{student.lastPayment}</td>
                <td className="px-4 py-3 font-semibold">
                  {getStatus(student)}
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <FaMoneyBillWave
                    className="cursor-pointer text-green-600"
                    onClick={() => {
                      setSelectedStudent(student);
                      setCollectModal(true);
                    }}
                  />
                  <FaHistory
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      setSelectedStudent(student);
                      setHistoryModal(true);
                    }}
                  />
                  <FaUndo
                    className="cursor-pointer text-red-600"
                    onClick={() => {
                      setSelectedStudent(student);
                      setRefundModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= COLLECT MODAL ================= */}
      {collectModal && (
        <Modal title="Collect Fee" onClose={() => setCollectModal(false)}>
          <div className="space-y-3">
            <input type="number" placeholder="Payment Amount"
              className="input"
              onChange={(e)=>setForm({...form,amount:e.target.value})}
            />
            <input type="date"
              className="input"
              onChange={(e)=>setForm({...form,date:e.target.value})}
            />
            <select className="input"
              onChange={(e)=>setForm({...form,mode:e.target.value})}>
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Cheque</option>
            </select>
            <input placeholder="Transaction ID"
              className="input"
              onChange={(e)=>setForm({...form,transactionId:e.target.value})}
            />
            <input placeholder="Remarks"
              className="input"
              onChange={(e)=>setForm({...form,remarks:e.target.value})}
            />
            <select className="input"
              onChange={(e)=>setForm({...form,installment:e.target.value})}>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Transport</option>
              <option>Exam Fee</option>
            </select>
            <button
              onClick={handleCollect}
              className="bg-green-600 text-white w-full py-2 rounded">
              Confirm Payment
            </button>
          </div>
        </Modal>
      )}

      {/* ================= RECEIPT MODAL ================= */}
      {receiptModal && receiptData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white `w-[500px]` p-6 rounded-xl shadow-xl">
            <div className="text-center border-b pb-3 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                alt="School Logo"
                className="h-16 mx-auto mb-2"
              />
              <h2 className="text-xl font-bold">
                Green Valley Public School
              </h2>
              <p className="text-sm text-gray-500">
                Official Fee Receipt
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Receipt No:</strong> {receiptData.receiptNo}</p>
              <p><strong>Date:</strong> {receiptData.date}</p>
              <p><strong>Student Name:</strong> {receiptData.name}</p>
              <p><strong>Roll Number:</strong> {receiptData.roll}</p>
              <p><strong>Class:</strong> {receiptData.class}</p>
              <p><strong>Installment:</strong> {receiptData.installment}</p>
              <p><strong>Payment Mode:</strong> {receiptData.mode}</p>
              <p><strong>Transaction ID:</strong> {receiptData.transactionId || "-"}</p>
              <p><strong>Amount Paid:</strong> ₹{receiptData.amount}</p>
              <p><strong>Collected By:</strong> {receiptData.collectedBy}</p>
              <p><strong>Remarks:</strong> {receiptData.remarks || "-"}</p>
            </div>

            <div className="mt-6 flex justify-between text-sm">
              <p>__________________<br />Authorized Signature</p>
              <p>__________________<br />Parent Signature</p>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => window.print()}
                className="bg-green-600 text-white px-4 py-2 rounded">
                Print Receipt
              </button>
              <button
                onClick={() => setReceiptModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded-xl">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-xl font-bold mt-2">{value}</p>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white w-96 p-6 rounded-xl">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold">{title}</h2>
        <button onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

export default StudentFee;
