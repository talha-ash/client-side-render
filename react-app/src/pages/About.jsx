import * as dayjs from "dayjs";


export default function About() {
  return (
    <div>
      <h1>About </h1>
      <div> {dayjs().millisecond()}</div>
    </div>
  );
}
