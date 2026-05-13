import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import { deleteQuery, getAllQuery,resetState } from "../../features/contactusform/contactFormSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: " Name",
      dataIndex: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
        title: "Message",
        dataIndex: "message",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const ContactForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [appId, setappId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setappId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllQuery());
  }, []);

  const requestState = useSelector((state) => state?.contactForm?.contactQuery);
  

  const data1 = [];
  for (let i = 0; i < requestState?.length; i++) {
    data1.push({
      key: i + 1,
      name: (
        <>
          <div>
            <p>{requestState[i]?.name}</p>
          </div>
        </>
      ),
      
      email: (
        <>
          <div>
          <p className="mb-0">
              <a href={`mailto:${requestState[i]?.email}`}>{requestState[i]?.email}</a>
          </p>
          </div>
        </>
      ),
      phone: (
        <>
          <div>
          <p className="mb-0">
              <a href={`tel:+91${requestState[i]?.phone}`}>{requestState[i]?.phone}</a>
          </p>
          </div>
        </>
      ),
      message: (
        <>
          <div>
          <p className="">
              {requestState[i]?.message}
          </p>
          </div>
        </>
      ),
      date: new Date(requestState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(requestState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteQuery(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllQuery());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Contact Request</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
         hideModal={hideModal}
         open={open}
        performAction={() => {
          deleteData(appId);
        }}
        title="Are you sure you want to delete this Data?"
      />
    </div>
  </>
  )
}

export default ContactForm;
