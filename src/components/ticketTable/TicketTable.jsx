import React from "react";
import { Table, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTicket } from "../../features/ticket/ticketSlice";
import "./ticketTable.css";

const TicketTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.ticket);

  // const ticketsData = JSON.parse(localStorage.getItem("ticketsData"));

  // console.log(ticketsData);
  // console.log(tickets);

  const columns = [
    {
      title: "Ticket Key",
      dataIndex: "ticketId",
      key: "ticketId",
      render: (ticketId, record) => {
        // console.log(record);
        const { key } = record;

        return (
          <Link to={`/ticket/${key}`} className="table__edit-link">
            {ticketId}
          </Link>
        );
      },
    },
    {
      title: "Merchant Address",
      dataIndex: "merchantAddress",
      key: "merchantAddress",
    },
    {
      title: "Problem Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Problem Category",
      dataIndex: "ticketCategory",
      key: "ticketCatogory",
    },
    {
      title: "Additional Info",
      dataIndex: "additionalInfo",
      key: "additionalInfo",
      align: "center",
      render: (text) => <div>{text ? text : "--"}</div>,
    },
    {
      title: "Created At",
      dataIndex: "date",
      key: "ticketDate",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        // console.log(record)
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/ticket/${record.key}`}>🖊</Link>
          <button
            onClick={() => dispatch(deleteTicket(record.ticketId))}
            style={{ cursor: "pointer" }}
          >
            ❌
          </button>
        </div>
      ),
    },
  ];

  const data = tickets?.map((ticket) => {
    const {
      ticketId,
      ticketType,
      ticketCategory,
      date,
      additionalInfo,
      merchantAddress,
    } = ticket;

    return {
      key: ticketId,
      ticketId,
      ticketType,
      ticketCategory,
      date,
      additionalInfo,
      merchantAddress,
      // startDate: moment(orgStartDate).format("LL"),
    };
  });

  // const {
  //   ticketId,
  //   ticketType,
  //   ticketCategory,
  //   date,
  //   additionalInfo,
  //   merchantAddress,
  // } = ticketsData;
  // const data = [
  //   {
  //     key: ticketId,
  //     ticketId,
  //     ticketType,
  //     ticketCategory,
  //     date,
  //     additionalInfo,
  //     merchantAddress,
  //     // startDate: moment(orgStartDate).format("LL"),
  //   },
  // ];
  return (
    <div>
      <header className="table__header">Your Tickets</header>
      <Button onClick={() => navigate("/tickets")} className="table__button">
        Create New Ticket
      </Button>
      <div className="table__container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="table"
        />
      </div>
    </div>
  );
};

export default TicketTable;
