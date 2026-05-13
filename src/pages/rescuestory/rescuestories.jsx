import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import {
  getAllRescueStoriesThunk,
  deleteRescueStoryThunk,
  resetRescueStoryState,
} from "../../features/rescuestory/rescuestoryslice";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Video",
    dataIndex: "video",
  },
  {
    title: "Journey",
    dataIndex: "journeyPreview",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const RescueStoriesAdmin = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [storyId, setStoryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setStoryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetRescueStoryState());
    dispatch(getAllRescueStoriesThunk());
  }, [dispatch]);

  const { stories } = useSelector((state) => state.rescue); // <-- adjust slice path

  const dataSource = stories?.map((story, idx) => ({
    key: idx + 1,
    image: story.images?.[0]?.url ? (
      <img
        src={story.images[0].url}
        alt="rescue"
        width={80}
        height={80}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
    ) : (
      "No Image"
    ),
    title: story.title,
    date: story.date?.slice(0, 10) || "No Date",
    video: story.video ? (
      <a href={story.video} target="_blank" rel="noreferrer">
        View Video
      </a>
    ) : (
      "No Link"
    ),
    journeyPreview: story.journey?.length
      ? story.journey.slice(0, 2).join(" | ") +
        (story.journey.length > 2 ? "..." : "")
      : "No Journey",
    action: (
      <>
        <Link
          to={`/admin/add_rescuestories/${story._id}`}
          className="ms-3 fs-3 text-primary"
        >
          <FiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(story._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteData = (id) => {
    dispatch(deleteRescueStoryThunk(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllRescueStoriesThunk());
    }, 300);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Rescue Stories Data</h3>
        <Table columns={columns} dataSource={dataSource} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteData(storyId)}
          title="Are you sure you want to delete this rescue story?"
        />
      </div>
    </>
  );
};

export default RescueStoriesAdmin;
