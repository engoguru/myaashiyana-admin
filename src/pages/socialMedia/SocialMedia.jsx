import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteSocMediaThunk, getSocMediaThunk, resetState } from "../../features/socialMedia/socialSlice";


const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Facebook",
      dataIndex: "facebook",
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
    },
    {
      title: "Youtube",
      dataIndex: "youtube",
    },
    {
        title: "twitter",
        dataIndex: "twitter",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const SocialMedia = () => {
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
    dispatch(getSocMediaThunk());
  }, []);

  const visMisState = useSelector((state) => state?.socMedia?.socMedia);

  const data1 = [];
  for (let i = 0; i < visMisState?.length; i++) {
    data1?.push({
      key: i + 1,
      facebook: (
        <>
          <div>
            <p>
            { visMisState[i]?.facebook }
            </p>
          </div>
        </>
      ),
      instagram: (
        <>
          <div>
            <p>
                { visMisState[i]?.instagram }
            </p>
          </div>
        </>
      ),
      youtube: (
        <>
          <div>
            <p>
                { visMisState[i]?.youtube }
            </p>
          </div>
        </>
      ), 
      twitter: (
        <>
          <div>
            <p>
                { visMisState[i]?.twitter }
            </p>
          </div>
        </>
      ), 
      action: (
        <>
          <Link
            to={`/admin/add_links/${visMisState[i]?._id}`}
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
    dispatch(deleteSocMediaThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSocMediaThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title"> Social Media Data</h3>
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

export default SocialMedia;


