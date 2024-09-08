import type { TableProps } from "antd";
import type { Exercise } from "../api/api.types";
import { IoMdOpen } from "react-icons/io";

import fa from "../fa.json";

export const tableColumns = ({
  setExerciseId,
}: {
  setExerciseId: (id: number) => void;
}): TableProps<Exercise>["columns"] => [
  {
    title: fa.name,
    dataIndex: "name",
    key: "name",
  },
  {
    title: fa.description,
    dataIndex: "description",
    key: "description",
    ellipsis:true
  },
  {
    key: "open",
    render: (record: Exercise) => {
      return <IoMdOpen className="hover:cursor-pointer" onClick={() => setExerciseId(record.id)} />;
    },
    width:50
  },
];
