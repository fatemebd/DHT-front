import { getFormattedDateTime } from '@/utils/dateUtils'
import { Checkbox, Col, Row, Typography } from 'antd'
import React from 'react'

const Habit = () => {

    const data ={
        id:1,
        title: "task1",
        description:"des",
        done: false,
        deadline:"2024-08-28T23:55:10.242000Z"
    }
  return (
    <Row justify="space-between" align="middle" className="bg-white bg-opacity-20 rounded-md m-5 p-2">
        <Col span={8} className="flex items-center gap-2">
        <Checkbox />
            <Typography>
            {data.title}</Typography>
        </Col >
      
            <Col span={8} >
        <Typography className="text-gray-700 font-semibold text-end  text-xs">{getFormattedDateTime(data.deadline)}</Typography>
            </Col>
    </Row>
  )
}

export default Habit