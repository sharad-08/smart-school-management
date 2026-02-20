// const ProfileCard = () => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md text-center">
//       <img
//         src="https://randomuser.me/api/portraits/men/32.jpg"
//         alt="profile"
//         className="w-20 h-20 rounded-full mx-auto mb-3"
//       />
//       <h2 className="font-semibold text-lg">Rahul Sharma</h2>
//       <p className="text-gray-500">Class 10-A</p>
//       <p className="text-gray-500">Roll No: 12</p>
//     </div>
//   );
// };

// export default ProfileCard;


const ProfileCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">Rahul Sharma</h2>
          <p className="text-gray-500">Class: 10-A</p>
          <p className="text-gray-500">Roll No: 23</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
