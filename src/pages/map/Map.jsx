import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deletedMapThunk, getMapThunk, resetState} from "../../features/map/mapSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Map Link",
      dataIndex: "link",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const Map = () => {
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
    dispatch(getMapThunk());
  }, []);

  const mapState = useSelector((state) => state?.map?.map);

  

  const data1 = [];
  for (let i = 0; i < mapState?.length; i++) {
    data1.push({
      key: i + 1,
      link: (
        <>
          <div>
            <p>{ mapState[i]?.link }</p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add--map/${mapState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(mapState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deletedMapThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getMapThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Map Link</h3>
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

export default Map;


