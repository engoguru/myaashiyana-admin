import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import {
  getAllWishlistThunk,
  deleteWishlistThunk,
  resetWishlistState,
} from "../../features/wishlist/wishlistSlice";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Item",
    dataIndex: "item",
  },
  {
    title: "Monthly Need",
    dataIndex: "need",
  },
  {
    title: "Cost",
    dataIndex: "cost",
  },
  {
    title: "Amazon Link",
    dataIndex: "amazon",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const WishlistList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setItemId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetWishlistState());
    dispatch(getAllWishlistThunk());
  }, [dispatch]);

  const { items } = useSelector((state) => state.wishlist);

  const dataSource = items?.map((item, idx) => ({
    key: idx + 1,
    item: item.item,
    need: item.need,
    cost: item.cost,
    amazon: (
      <a href={item.amazon} target="_blank" rel="noopener noreferrer">
        Amazon
      </a>
    ),
    action: (
      <>
        <Link
          to={`/admin/add__wishlist/${item._id}`}
          className="ms-3 fs-3 text-primary"
        >
          <FiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(item._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteData = (id) => {
    dispatch(deleteWishlistThunk(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllWishlistThunk());
    }, 100);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Wishlist Items</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteData(itemId)}
          title="Are you sure you want to delete this wishlist item?"
        />
      </div>
    </>
  );
};

export default WishlistList;
