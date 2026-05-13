import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteProgThunk, getProgThunk, resetState } from "../../features/programme/programmeSlice";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "images",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Species",
    dataIndex: "species",
  },
  {
    title: "Breed",
    dataIndex: "breed",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Monthly Care Cost",
    dataIndex: "monthlyCareCost",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Programme = () => {
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
    dispatch(getProgThunk());
  }, []);

  const progState = useSelector((state) => state?.programme?.programme);

  const data1 = [];
  for (let i = 0; i < progState?.length; i++) {
    data1.push({
      key: i + 1,
      images: (
        progState[i]?.images?.[0]?.url ? (
          <img height={80} width={80} src={progState[i]?.images[0]?.url} alt="animal" />
        ) : (
          "No Image"
        )
      ),
      name: progState[i]?.name,
      species: progState[i]?.species,
      breed: progState[i]?.breed,
      age: progState[i]?.age,
      monthlyCareCost: progState[i]?.monthlyCareCost,
      status: progState[i]?.status,
      action: (
        <>
          <Link
            to={`/admin/add__programmes__details/${progState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(progState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteProgThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProgThunk());
    }, 100);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Programmes Data</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteData(appId);
          }}
          title="Are you sure you want to delete this programme?"
        />
      </div>
    </>
  );
};

export default Programme;
