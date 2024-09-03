import React, { useEffect, useState } from "react";
import type { Feature } from "../api/api.types";
import { Col, Modal, Row, Typography } from "antd";
import Image from "next/image";
import coin from "../../../../../../../public/coin.png";
import { IoCloseOutline } from "react-icons/io5";
import { useGetBuyFeature } from "../api";
import fa from "../fa.json";
import { toast } from "react-toastify";
import { useGetUserDetail } from "../../../api";
import { twMerge } from "tailwind-merge";

const FeatureComponent = ({
  id,
  name,
  description,
  //   type,
  cost,
}: Feature) => {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const { data: user } = useGetUserDetail();

  const [featureDisabled, setFeatureDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      setFeatureDisabled(user.score < cost);
    }
  }, [user, cost]);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { mutate: buyFeatureMutate } = useGetBuyFeature();

  const handleButFeature = () => {
    setBuyModalOpen(true);
  };

  const handleCloseModal = () => {
    setBuyModalOpen(false);
  };

  const handleSuccessBuy = () => {
    toast.success(fa.buySucceed);
    handleCloseModal();
  };

  const handleOk = () => {
    buyFeatureMutate(id, {
      onSuccess: handleSuccessBuy,
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <>
      <Modal
        closeIcon={<IoCloseOutline className="text-white " />}
        open={buyModalOpen}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        onOk={handleOk}
      >
        <Typography>{fa.areYouSure}</Typography>
      </Modal>
      <Row
        onClick={featureDisabled ? undefined : handleButFeature}
        justify="space-between"
        align="top"
        className={twMerge(
          featureDisabled
            ? "border-gray-700, bg-gray-400 cursor-not-allowed grayscale border border-gray-400 opacity-60"
            : " border border-primary-1000 cursor-pointer hover:bg-primary-900 ",
          "w-full px-5 py-3 bg-white bg-opacity-10 rounded-lg md:h-24  duration-500"
        )}
      >
        <Col className="space-y-5">
          <Typography className="md:font-bold md:text-lg font-semibold text-base">
            {name}
          </Typography>
          <Typography className="font-medium text-gray-400 text-sm md:text-base">
            {description}
          </Typography>
        </Col>
        <Col className="flex gap-2 items-center text-sm">
          {cost}
          <Image alt="coin" src={coin} width={20} height={20} />
        </Col>
      </Row>
    </>
  );
};

export default FeatureComponent;
