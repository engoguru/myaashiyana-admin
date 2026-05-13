import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import { deleteSingleUser, ourAllUsers ,resetState, } from "../../features/auth/authSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
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
        title: "Role",
        dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const OurAllUser = () => {
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
    dispatch(ourAllUsers());
  }, []);

  const requestState = useSelector((state) => state?.auth?.users);
  

  const data1 = [];
  for (let i = 0; i < requestState?.length; i++) {
    data1.push({
      key: i + 1,
      username: (
        <>
          <div>
            <p>{requestState[i]?.username}</p>
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
      role: (
        <>
          <div>
          <p className="">
              {requestState[i]?.role}
          </p>
          </div>
        </>
      ),
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
    dispatch(deleteSingleUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(ourAllUsers());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Our Users</h3>
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

export default OurAllUser;
