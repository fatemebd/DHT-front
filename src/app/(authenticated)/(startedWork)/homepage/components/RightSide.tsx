import { Typography } from "antd";
import { MoodTracker } from "@/components/moodTracker";
import { useGetUserDetail } from "../../api";
import { useGetHabitsList, useGetRemindersList, useGetToDoList } from "../api";
import HabitComponent from "./Habit";
import TaskComponent from "./Task";
import fa from "../fa.json";
import ReminderComponent from "./Reminder";

const RightSide = () => {
  const { data: user } = useGetUserDetail();
  const { data: habitsList } = useGetHabitsList();
  const { data: remindersList } = useGetRemindersList();
  const { data: toDoListData } = useGetToDoList();

  return (
    <>
      <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 md:h-[40%]">
        <Typography className="text-md font-semibold">{fa.toDoList}</Typography>
        <div className="md:max-h-[90%] md:overflow-y-scroll mt-2">
          {toDoListData?.map((task) => (
            <TaskComponent
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              done={task.done}
            />
          ))}
        </div>
      </div>

      <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 md:h-[40%]">
        <Typography className="text-md font-semibold">
          یادآورهای امروز{" "}
        </Typography>
        <div className="md:max-h-[90%] md:overflow-y-scroll mt-2">
          {remindersList?.map((habit) => (
            <ReminderComponent
            reminderTime={habit.reminderTime}
              key={habit.id}
              id={habit.id}
              name={habit.name}
              description={habit.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSide;
