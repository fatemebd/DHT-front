import { Button, Col, Dropdown, Grid, Row, Typography } from "antd";
import React from "react";
import logo from "../../../../../../public/logo.png";
import Image from "next/image";
import fa from "@/fa.json";
import { FaUserLarge } from "react-icons/fa6";
import { BsClockHistory } from "react-icons/bs";
import { getUserItems } from "../constants/userMenu";
import { useGetUserDetail } from "../../api";
import Score from "@/components/Score";
import { useEndWork, useLogOut } from "@/app/(authenticated)/start-work/api";
import { isClient } from "@/utils/detectUtils";
import { useRouter } from "next/navigation";

const { useBreakpoint } = Grid;

const Header = () => {
  const { data: user } = useGetUserDetail();
  const { mutate: endWorkMutate, isPending: isEndWorkPending } = useEndWork();
  const { mutate: logOutMutate, isPending: isLogOutPending } = useLogOut();

  const router = useRouter();

  const handleLogOut = () => {
    if (isClient()) {
      logOutMutate();
      localStorage.removeItem("startWork");
      localStorage.removeItem("user");
      localStorage.removeItem("fcmToken");

      router.push("/login");
    }
  };

  const items = getUserItems({ logout: handleLogOut, isLogOutPending });

  const screens = useBreakpoint();

  const handleEndWork = () => {
    endWorkMutate();
    if (isClient()) {
      localStorage.removeItem("startWork");
    }
    router.push("/start-work");
  };

  return (
    <>
      <Row justify="space-between" className="mt-4 w-full">
        <Col md={8} className="flex items-center md:gap-5 gap-2">
          <Image
            alt="doost"
            width={screens.md ? 40 : 30}
            height={screens.md ? 30 : 20}
            src={logo}
          />
          <Typography className="md:text-4xl text-xl font-bold text-primary-1000">
            {fa.friend}
          </Typography>
        </Col>

        <Col
          md={8}
          className="flex items-center md:gap-5 gap-3 justify-end pl-2"
        >
          {screens.md && <Score score={user?.score} />}{" "}
          <Dropdown
            key="1"
            menu={{ items }}
            trigger={["hover"]}
            overlayClassName="pt-[0.5rem]"
          >
            <FaUserLarge className="text-white opacity-20 md:text-2xl text-lg" />
          </Dropdown>
          <Button
            type="primary"
            onClick={handleEndWork}
            icon={<BsClockHistory />}
            disabled={isEndWorkPending}
          >
            {fa.endWork}
          </Button>
          {/* <Link href="/dashboard/profile">
          </Link>
          <Link href="/">
            <MdOutlineSportsMartialArts className="text-white opacity-20 md:text-3xl text-2xl" />
          </Link> */}
        </Col>
      </Row>
      <Typography className="my-2">{user?.dailyQuote}</Typography>
    </>
  );
};

export default Header;
