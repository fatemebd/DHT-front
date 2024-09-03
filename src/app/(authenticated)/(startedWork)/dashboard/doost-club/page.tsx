"use client"
import fa from "./fa.json";
import { Col, Row, Typography } from "antd";
import Feature from "./_components/Feature";
import { useGetFeaturesList } from "./api";

const Page = () => {
  const { data: featuresList } = useGetFeaturesList();

  return (
    <>
      <Typography className="text-xl mb-5">{fa.doostClub}</Typography>
      <Typography className="mb-5">{fa.explaination}</Typography>
      <Row className="md:px-14 md:h-fit h-[70%] md:overflow-hidden overflow-y-scroll py-1" gutter={[40,40]}>
        {featuresList?.map((feature) => (
          <Col key={feature.id} md={9} xs={24}>
            <Feature
              id={feature.id}
              name={feature.name}
              cost={feature.cost}
              description={feature.description}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Page;
