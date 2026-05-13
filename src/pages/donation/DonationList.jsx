import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import {
  deleteDonation,
  getAllDonations,
  resetState,
} from "../../features/donation/donationSlice";
import "../../App.css";

const columns = [
  { title: "S.No.", dataIndex: "key" },
  { title: "Donor Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Amount (₹)", dataIndex: "amount" },
  { title: "Status", dataIndex: "status" },
  { title: "Payment ID", dataIndex: "payment" },
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
];

const DonationList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [donationId, setDonationId] = useState("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllDonations());
  }, []);

  const donationState = useSelector((state) => state?.donation?.donations);

  const showModal = (id) => {
    setOpen(true);
    setDonationId(id);
  };

  const hideModal = () => setOpen(false);

  const deleteData = () => {
    dispatch(deleteDonation(donationId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllDonations());
    }, 200);
  };

  const dataSource =
    donationState?.map((item, index) => ({
      key: index + 1,
      name: item?.name,
      email: item?.email,
      phone: item?.phone,
      amount: item?.amount,
      status: (
        <span className={`badge ${item?.paymentStatus === 'success' ? 'bg-success' : 'bg-warning text-dark'}`}>
          {item?.paymentStatus || "pending"}
        </span>
      ),
      payment: item?.razorpayPaymentId || "N/A",
      date: new Date(item?.createdAt).toLocaleDateString(),
      action: (
        <button
          className="fs-5 text-danger bg-transparent border-0"
          onClick={() => showModal(item?._id)}
        >
          <AiFillDelete />
        </button>
      ),
    })) || [];

  return (
    <>
      <div className="page-container">
        <h3 className="title mb-4">Donations List</h3>

        <Table columns={columns} dataSource={dataSource} />

        <CustomModal
          open={open}
          hideModal={hideModal}
          performAction={deleteData}
          title="Are you sure you want to delete this donation?"
        />
      </div>
    </>
  );
};

export default DonationList;
