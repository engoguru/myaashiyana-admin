import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { deleteOurTeam, getOurTeam, resetState } from "../../features/ourTeam/ourTeamSlice";


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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];


const OurTeam = () => {

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
    dispatch(getOurTeam());
  }, []);

  const carouselState = useSelector((state) => state?.ourTeam?.ourTeam);
  

  const data1 = [];
  for (let i = 0; i < carouselState?.length; i++) {
    data1.push({
      key: i + 1,
      images: (
        <img height={100} width={100} src={carouselState[i]?.images[0]?.url} />
      ),
      name: (
        <>
          <div>
            <p>{ carouselState[i]?.name }</p>
          </div>
        </>
      ),
      position: (
        <>
          <div>
            <p>{ carouselState[i]?.position }</p>
          </div>
        </>
      ),
      description: (
        <>
          <div>
            <p>{ carouselState[i]?.description }</p>
          </div>
        </>
      ),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(carouselState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteOurTeam(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getOurTeam());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Our Director</h3>
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


export default OurTeam;