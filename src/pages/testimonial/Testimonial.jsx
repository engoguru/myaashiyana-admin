import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteTestimonialThunk, getTestimonialThunk, resetState } from "../../features/testimonial/testimonialSlice";


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
        title: "Comment",
        dataIndex: "comment",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];


const Testimonial = () => {


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
    dispatch(getTestimonialThunk());
  }, []);

  const imgState = useSelector((state) => state?.testimonial?.testimonial);
  

  const data1 = [];
  for (let i = 0; i < imgState?.length; i++) {
    data1.push({
      key: i + 1,
      images: (
        <Link to={`${imgState[i]?.images[0]?.url}`}><img height={100} width={100} src={imgState[i]?.images[0]?.url} /> </Link>
      ),
      comment: (
        <>
          <div>
            <p>{ imgState[i]?.comment }</p>
          </div>
        </>
      ),
      name: (
        <>
          <div>
            <p>{ imgState[i]?.name }</p>
          </div>
        </>
      ),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(imgState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
}

  const deleteData = (e) => {
    dispatch(deleteTestimonialThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getTestimonialThunk());
    }, 100);
  };


  return (
    <>
    <div>
      <h3 className="mb-4 title">Our Testimonial</h3>
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


export default Testimonial;