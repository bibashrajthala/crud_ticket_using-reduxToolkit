import React from "react";
import { Button, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, editTicket } from "../../features/ticket/ticketSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./ticketform.css";

const { TextArea } = Input;
const { Option } = Select;

const TicketForm = ({ page }) => {
  // const [ticketInfo, setTicketInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  let id = param.id || null;

  const ticketsInitialValue = useSelector((state) => state.ticket.tickets);
  const initialValue =
    page === "editTicket"
      ? ticketsInitialValue.find((ticket) => ticket.ticketId === id)
      : {};

  const onFinish = async (values) => {
    // console.log("user form data:", values);

    // console.log(new Date());
    const date = moment(new Date()).format("LLLL");
    // console.log(date);

    id = page === "addTicket" ? uuidv4() : id;
    const formData = { ...values, date, ticketId: id };
    // console.log("ticket form data:", formData);
    // localStorage.setItem("ticketsData", JSON.stringify(formData));
    page === "addTicket"
      ? dispatch(addTicket(formData))
      : dispatch(editTicket({ id, formData }));
    // setTicketInfo(formData);
    navigate("/");
  };

  // console.log(ticketInfo);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form__container">
      <header className="form__header">
        <h2 className="form__header-heading">
          {page === "addTicket" ? "Report Your Problem" : "Edit Your Problem"}
        </h2>
      </header>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: "3rem" }}
        className="form"
        initialValues={initialValue}
      >
        <Form.Item
          name="ticketType"
          label={<label style={{ color: "#587a6f" }}>Problem Type</label>}
          // label="Problem Type"
          rules={[{ required: true, message: "Please select problem type!" }]}
          labelAlign="left"
        >
          <Select placeholder="Select Problem Type">
            <Option value="No Internet Connection Issue">
              No Internet Connection Issue
            </Option>
            <Option value="Slow Internet Connection Issue">
              Slow Internet Connection Issue
            </Option>
            <Option value="Other Queries">Other Queries</Option>
            <Option value="NetTV Issue">NetTV Issue</Option>
            <Option value="Billing related Issue">Billing related Issue</Option>
            <Option value="Others">Others</Option>
            <Option value="Online Gaming Issue">Online Gaming Issue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "#587a6f" }}>Problem Category</label>}
          // label="Problem Category"
          labelAlign="left"
          rules={[
            { required: true, message: "Please select problem category!" },
          ]}
          name="ticketCategory"
        >
          <Select placeholder="Select Problem Category">
            <Option value="Internet disconnects frequently.">
              Internet disconnects frequently.
            </Option>
            <Option value="WiFi connected but Internet not working.">
              WiFi connected but Internet not working.
            </Option>
            <Option value="NetTV is not working.">NetTV is not working.</Option>
            <Option value="NetTV channels are buffering.">
              NetTV channels are buffering.
            </Option>
            <Option value="Online payment issue.">Online payment issue.</Option>
            <Option value="Some sites and apps not working.">
              Some sites and apps not working.
            </Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="merchantAddress"
          label={<label style={{ color: "#587a6f" }}>Address</label>}
          // label="Address"
          rules={[{ required: true, message: "Please input address!" }]}
          labelAlign="left"
        >
          <Input placeholder="Merchant Adddress" />
        </Form.Item>

        <Form.Item name="additionalInfo">
          <TextArea rows={4} placeholder="Additional Info" />
        </Form.Item>

        <Form.Item className="form__button-container">
          {page === "addTicket" && (
            <Button type="primary" htmlType="submit" className="form__button">
              Open Ticket
            </Button>
          )}
          {page === "editTicket" && (
            <Button type="primary" htmlType="submit" className="form__button">
              Edit Ticket
            </Button>
          )}

          <Button
            type="primary"
            className="form__button-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TicketForm;
