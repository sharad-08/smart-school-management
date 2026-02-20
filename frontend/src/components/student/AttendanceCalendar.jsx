import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const AttendanceCalendar = () => {

  const [value, setValue] = useState(new Date());

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="font-semibold mb-4">Attendance Calendar</h2>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default AttendanceCalendar;
