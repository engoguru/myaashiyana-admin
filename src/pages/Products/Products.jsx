import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import {
  getAllProductsThunk,
  deleteProductThunk,
  resetProductState,
} from "../../features/products/ProductSlice"; 

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
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price (₹)",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetProductState());
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  const dataSource = products?.map((product, idx) => ({
    key: idx + 1,
    image: product.images?.[0]?.url ? (
      <img
        src={product.images[0].url}
        alt="product"
        width={80}
        height={80}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
    ) : (
      "No Image"
    ),
    name: product.name,
    price: product.price,
    price: product.price,
    action: (
      <>
        <Link
          to={`/admin/add_products/${product._id}`}
          className="ms-3 fs-3 text-primary"
        >
          <FiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteData = (id) => {
    dispatch(deleteProductThunk(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllProductsThunk());
    }, 300);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Products Data</h3>
        <Table columns={columns} dataSource={dataSource} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteData(productId)}
          title="Are you sure you want to delete this product?"
        />
      </div>
    </>
  );
};

export default ProductAdmin;
