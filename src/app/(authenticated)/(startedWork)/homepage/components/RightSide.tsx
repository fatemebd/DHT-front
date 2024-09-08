import { Button, Modal, Typography } from "antd";
import { useGetRemindersList, useGetToDoList } from "../api";
import TaskComponent from "./Task";
import fa from "../fa.json";
import ReminderComponent from "./Reminder";
import { type MutableRefObject, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IoCloseOutline } from "react-icons/io5";
import AddTask from "./AddTask";
import AddReminder from "./AddReminder";

const RightSide = ({
  reminderRef,
  taskRef,
}: {
  reminderRef: MutableRefObject<null>;
  taskRef: MutableRefObject<null>;
}) => {
  const { data: remindersList } = useGetRemindersList();
  const { data: toDoListData } = useGetToDoList();
  const [modalContent, setModalContent] = useState<
    "addTask" | "addReminder" | undefined
  >();

  const handleCloseModal = () => {
    setModalContent(undefined);
  };

  return (
    <>
      <Modal
        open={modalContent === "addTask" || modalContent === "addReminder"}
        className="text-white"
        closeIcon={<IoCloseOutline className="text-white" />}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        title={modalContent === "addTask" ? fa.addTask : fa.addReminder}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        {modalContent === "addTask" ? (
          <AddTask handleClose={handleCloseModal} />
        ) : modalContent === "addReminder" ? (
          <AddReminder handleClose={handleCloseModal} />
        ) : (
          ""
        )}
      </Modal>
      <div className=" w-full rounded-md flex flex-col justify-between bg-white bg-opacity-10 px-2 py-1 md:max-h-[40%]  md:h-[40%] pb-3 space-y-3 ">
        <Typography className="text-md font-semibold">{fa.toDoList}</Typography>
        <div className="md:max-h-[65%] md:overflow-y-scroll  mt-2 ">
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

        <Button
          ref={taskRef}
          onClick={() => setModalContent("addTask")}
          className="w-full flex-row-reverse"
          icon={<PlusOutlined />}
        >
          {fa.addTask}
        </Button>
      </div>

      <div className="mt-3 w-full flex flex-col justify-between rounded-md bg-white bg-opacity-10 px-2 py-1 md:max-h-[40%]  md:h-[40%] pb-3 space-y-3">
        <Typography className="text-md font-semibold">
          {fa.reminderList}{" "}
        </Typography>
        <div className="md:max-h-[65%] md:overflow-y-scroll mt-2">
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
        <Button
          ref={reminderRef}
          onClick={() => setModalContent("addReminder")}
          className="w-full flex-row-reverse"
          icon={<PlusOutlined />}
        >
          {fa.addReminder}
        </Button>
      </div>
    </>
  );
};

export default RightSide;
