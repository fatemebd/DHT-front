import { Col, Row, Typography } from "antd";
import React from "react";
import logo from "../../../../../../public/logo.png";
import Image from "next/image";
import fa from "@/fa.json";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";
import { useGetUserDetail } from "../../api";
import Score from "@/components/Score";

const Header = () => {
  const { data: user } = useGetUserDetail();

  return (
    <>
    <Row justify="space-between" className="mt-4 w-full">
      <Col md={8} className="flex items-center gap-5 ">
        <Image alt="doost" width={40} height={30} src={logo} />
        <Typography className="text-4xl font-bold text-primary-1000">
          {fa.friend}
        </Typography>
      </Col>

      <Col md={8} className="flex items-center gap-5 justify-end">
        <Score score={user?.score} />
        <Link href="/dashboard/profile">
          <FaUserLarge className="text-white opacity-20 text-2xl" />
        </Link>
        <Link href="/">
          <MdOutlineSportsMartialArts className="text-white opacity-20 text-3xl" />
        </Link>
      </Col>
    </Row>
    <Typography className="my-2">{user?.dailyQuote} امیدوار باش</Typography>
    </>
  );
};

export default Header;
