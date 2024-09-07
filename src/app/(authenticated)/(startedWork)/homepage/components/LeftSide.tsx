import { Typography } from "antd";
import { MoodTracker } from "@/components/moodTracker";
import { useGetUserDetail } from "../../api";
import { useGetTodayHabitsList } from "../api";
import HabitComponent from "./Habit";

const LeftSide = () => {
  const { data: user } = useGetUserDetail();
  const { data: habitsList } = useGetTodayHabitsList();
  return (
    <>
      <MoodTracker mood={user?.mood} />
      <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 ">
        <Typography className="text-md font-semibold">
          عادت‌های امروز
        </Typography>
        {habitsList?.map((habit) => (
          <HabitComponent
            key={habit.id}
            id={habit.id}
            name={habit.name}
            description={habit.description}
          />
        ))}
      </div>
    </>
  );
};

export default LeftSide;
