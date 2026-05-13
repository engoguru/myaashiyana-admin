import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteUpTeamThunk, getUpTeamThunk, resetState } from "../../features/upTeam/upTeamSlice";


const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Icon",
      dataIndex: "icon",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const Unhome = () => {
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
    dispatch(getUpTeamThunk());
  }, []);

  const visMisState = useSelector((state) => state?.upTeam?.upTeam);

  const data1 = [];
  for (let i = 0; i < visMisState?.length; i++) {
    data1?.push({
      key: i + 1,
      icon: (
        <>
          <div>
            <p>
            { visMisState[i]?.icon}
            </p>
          </div>
        </>
      ),
      title: (
        <>
          <div>
            <p>{visMisState[i]?.title}</p>
          </div>
        </>
      ), 
      action: (
        <>
          <Link
            to={`/admin/add-up-team/${visMisState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(visMisState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteUpTeamThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUpTeamThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title"> Data Before Teams</h3>
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

export default Unhome;
