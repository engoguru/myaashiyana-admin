import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteBlogThunk, getBlogsThunk, resetState } from "../../features/blog/BlogSlice";

const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
      width: 80,
    },
    {
      title: "Images",
      dataIndex: "images",
      width: 120,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "Excerpt",
      dataIndex: "excerpt",
      width: 250,
    },
    {
      title: "Author",
      dataIndex: "author",
      width: 120,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 120,
    },
];

const Blogs = () => {
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
    dispatch(getBlogsThunk());
  }, []);

  const blogState = useSelector((state) => state?.blog?.blogs);

  const data1 = [];
  for (let i = 0; i < blogState?.length; i++) {
    data1?.push({
      key: i + 1,
      images: (
        <img 
          height={100} 
          width={100} 
          src={blogState[i]?.images[0]?.url} 
          alt={blogState[i]?.title}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      ),
      title: (
        <div>
          <p style={{ margin: 0, fontWeight: '500' }}>
            {blogState[i]?.title}
          </p>
        </div>
      ),
      excerpt: (
        <div>
          <p style={{ margin: 0 }}>
            {blogState[i]?.excerpt}
          </p>
        </div>
      ),
      author: (
        <div>
          <p style={{ margin: 0 }}>
            {blogState[i]?.author || 'Admin'}
          </p>
        </div>
      ),
      date: (
        <div>
          <p style={{ margin: 0 }}>
            {blogState[i]?.date || new Date(blogState[i]?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      ),
      status: (
        <div>
          <span 
            style={{ 
              padding: '4px 12px', 
              borderRadius: '12px',
              backgroundColor: blogState[i]?.status === 'published' ? '#52c41a' : '#faad14',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {blogState[i]?.status || 'published'}
          </span>
        </div>
      ),
      action: (
        <>
          <Link
            to={`/admin/add___blogs___details/${blogState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteBlogThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogsThunk());
    }, 100);
  };

  return (
    <>
    <div>
      <h3 className="mb-4 title"> Blogs Data</h3>
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

export default Blogs;