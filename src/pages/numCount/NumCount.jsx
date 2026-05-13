import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteNumCountThunk, getAllNumThunk ,resetState  } from "../../features/numCount/numSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Icons",
      dataIndex: "icons",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const NumCount = () => {
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
    dispatch(getAllNumThunk());
  }, []);

  const addState = useSelector((state) => state?.numCount?.numCount);

  

  const data1 = [];
  for (let i = 0; i < addState?.length; i++) {
    data1.push({
      key: i + 1,
      icons: (
        <>
        <div>
          <p>{ addState[i]?.icons }</p>
        </div>
        </>
      ),
      number: (
        <>
          <div>
            <p>{ addState[i]?.number }</p>
          </div>
        </>
      ),
      content: (
        <>
          <div>
            <p>{ addState[i]?.content }</p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add_number_counter_details/${addState[i]?._id}`}
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
    dispatch(deleteNumCountThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllNumThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Number Counter</h3>
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

export default NumCount;


