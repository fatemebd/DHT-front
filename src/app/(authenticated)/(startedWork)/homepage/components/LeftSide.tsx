import { Typography } from "antd";
import { MoodTracker } from "@/components/moodTracker";
import { useGetUserDetail } from "../../api";

const LeftSide = () => {
    const { data: user } = useGetUserDetail();

  return (
    <>
      <MoodTracker mood={user?.mood} />
      <div className="bg-white bg-opacity-10 w-full rounded-md px-2 py-1 mt-3 ">
        <Typography className="text-md font-semibold">
          عادت‌های امروز
        </Typography>
        {/* <Habit
          id={1}
          title={"habit1"}
          description={"habit1"}
          deadline={"task.deadline"}
        />
        <Habit
          id={2}
          title={"habit2"}
          description={"habit2"}
          deadline={"task.deadline"}
        /> */}
      </div>
    </>
  );
};

export default LeftSide;
