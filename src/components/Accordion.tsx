"use client";

import { DownOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

interface AccordionProps {
  items: CollapseProps["items"];
}

function Accordion({ items }: AccordionProps) {
  return (
    <Collapse
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 90 : 0} />}
      accordion
      bordered={false}
      items={items}
    />
  );
}

export default Accordion;
