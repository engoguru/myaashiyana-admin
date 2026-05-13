import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deletedEmails, getEmail, resetState } from "../../features/emails/emailSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Email",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const EmailDet = () => {
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
    dispatch(getEmail());
  }, []);

  const addState = useSelector((state) => state?.email?.email);

  

  const data1 = [];
  for (let i = 0; i < addState?.length; i++) {
    data1.push({
      key: i + 1,
      title: (
        <>
          <div>
            <p>{ addState[i]?.title }</p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add_email__details/${addState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(addState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deletedEmails(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEmail());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Email Data</h3>
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

export default EmailDet;


