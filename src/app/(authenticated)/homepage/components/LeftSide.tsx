import { Col, Row } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import neutral from "../../../../../public/neutral.png";
import sad from "../../../../../public/sad.png";
import verySad from "../../../../../public/verySad.png";
import happy from "../../../../../public/happy.png";
import thrilled from "../../../../../public/thrilled.png";

const LeftSide = () => {
  const [selectedMood, setSelectedMood] = useState<number | undefined>();
  return (
    <>
      <Row justify="space-around">
        <Col span={4}>
          <Image
            alt="thrilled"
            src={thrilled}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
        </Col>
        <Col span={4}>
          <Image
            alt="happy"
            src={happy}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
        </Col>
        <Col span={4}>
          <Image
            alt="neutral"
            src={neutral}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
        </Col>

        <Col span={4}>
          <Image
            alt="sad"
            src={sad}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
        </Col>
        <Col span={4}>
          <Image
            alt="verySad"
            src={verySad}
            width={50}
            height={50}
            className="grayscale hover:grayscale-0 duration-500 cursor-pointer"
          />
        </Col>
      </Row>
    </>
  );
};

export default LeftSide;
