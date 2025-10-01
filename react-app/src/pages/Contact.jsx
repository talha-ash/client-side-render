import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Calendar, dayjsLocalizer } from "react-big-calendar";
import * as Calendar from "react-big-calendar";
import dayjs from "dayjs";

const localizer = Calendar.dayjsLocalizer(dayjs);
console.log("Calendar", Calendar);
export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <Calendar.Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
