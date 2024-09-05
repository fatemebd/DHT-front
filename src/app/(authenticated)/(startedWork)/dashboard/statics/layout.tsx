"use client";
import { useState, useEffect, type ReactNode } from "react";
import { Tabs } from "antd";

import { usePathname, useRouter } from "next/navigation";
import { items } from "./constants/tabOption";

const { TabPane } = Tabs;

interface LayoutProps {
  children: ReactNode;
}

const BarChartInTab = ({ children }: LayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set true for mobile screens
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);
  const handleTabChange = (key: string) => {
    router.push(`/dashboard/statics/${key}`);
  };

  return (
    <>
      <Tabs
        // defaultActiveKey="habits"
        onChange={handleTabChange}
        activeKey={pathname.split("/")[3]}
        items={items}
      />
      <div className="align-middle flex justify-center w-full h-full">
        {children}
      </div>
    </>
  );
};

// {/* <TabPane tab="Bar Chart" key="1" className="flex justify-center">
//   <div
//     style={{ width: "70vw", height: "450px" }}
//     className="align-middle flex justify-center"
//   >
//     <ResponsiveContainer
//       width="100%"
//       height="100%"
//       className="align-middle flex justify-center"
//     >
//       <BarChart
//         data={data}
//         margin={{
//           top: 20,
//           // right: 30,
//           // left: 50,
//           bottom: isMobile ? 80 : 20,
//         }}
//         className="w-full align-middle"
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey={(item) =>
//             `${item.start_of_week} - ${item.end_of_week}`
//           }
//           angle={isMobile ? 90 : 0} // Rotate labels on mobile
//           textAnchor={isMobile ? "end" : "middle"} // Align labels properly when rotated
//           interval={0} // Display all labels
//           dy={isMobile ? 10 : 0} // Adjust position of labels when rotated
//           fontSize={8}
//         />
//         <YAxis
//           textAnchor={isMobile ? "start" : "middle"} // Align labels properly when rotated
//         />
//         <Tooltip />
//         <Bar dataKey="completion_rate" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// </TabPane> */}
// {/* <TabPane tab="Another Tab" key="2">
//   <p>Content for another tab</p>
// </TabPane> */}
// {/* </Tabs> */}
export default BarChartInTab;
