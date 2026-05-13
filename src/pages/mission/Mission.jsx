import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deletedMissionThunk, getMissionThunk , resetState} from "../../features/mission/missionSlice";


const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Images",
      dataIndex: "images",
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

const Mission = () => {
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
    dispatch(getMissionThunk());
  }, []);

  const visMisState = useSelector((state) => state?.mission?.mission);

  const data1 = [];
  for (let i = 0; i < visMisState?.length; i++) {
    data1?.push({
      key: i + 1,
      images: (
        <img height={100} width={100} src={visMisState[i]?.images[0]?.url} />
      ),
      content: (
        <>
          <div>
            <p>{visMisState[i]?.content}</p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add-mission/${visMisState[i]?._id}`}
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
    dispatch(deletedMissionThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getMissionThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title"> Mission Data</h3>
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

export default Mission;


