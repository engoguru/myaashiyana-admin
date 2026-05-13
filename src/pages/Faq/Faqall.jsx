import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { getFaqs, deleteFaq, resetState } from "../../features/faq/Faqslice";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "FAQ Question",
    dataIndex: "question",
  },
  {
    title: "FAQ Answer",
    dataIndex: "answer",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Faq = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [appId, setAppId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setAppId(id);
  };

  const hideModal = () => setOpen(false);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getFaqs());
  }, [dispatch]);

  const { faqs, isLoading } = useSelector((state) => state.faq);

  const dataSource = faqs?.map((faq, index) => ({
    key: index + 1,
    question: <p>{faq?.question}</p>,
    answer: <p>{faq?.answer}</p>,
    action: (
      <>
        <Link to={`/admin/add__Faq__details/${faq?._id}`} className="ms-3 fs-3 text-primary">
          <FiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(faq?._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const handleDelete = (id) => {
    dispatch(deleteFaq(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getFaqs());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">FAQ List</h3>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
      />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDelete(appId)}
        title="Are you sure you want to delete this FAQ?"
      />
    </div>
  );
};

export default Faq;
