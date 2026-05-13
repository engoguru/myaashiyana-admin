// pages/Membership/MemberForm.jsx
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { deleteQuery, getAllQuery, resetState } from "../../features/membership/membershipSlice";

const columns = [
    {
        title: "S.No.",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
    },
    {
        title: "Message",
        dataIndex: "message",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const MemberForm = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [appId, setAppId] = useState("");

    const { memberForm, isLoading } = useSelector((state) => state.members) || []

    useEffect(() => {
        dispatch(resetState());
        dispatch(getAllQuery());
    }, [dispatch]);

    const showModal = (id) => {
        setAppId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const deleteData = (id) => {
        dispatch(deleteQuery(id)).then(() => {
            dispatch(getAllQuery());
        });
        setOpen(false);
    };

    const dataSource = memberForm?.map((item, index) => ({
        key: index + 1,
        name: <p>{item?.name}</p>,
        email: <a href={`mailto:${item?.email}`}>{item?.email}</a>,
        phone: <a href={`tel:+91${item?.phone}`}>{item?.phone}</a>,
        message: <p>{item?.message}</p>,
        date: item?.createdAt
            ? new Date(item?.createdAt).toLocaleString()
            : "N/A",
        action: (
            <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(item._id)}
            >
                <AiFillDelete />
            </button>
        ),
    }));

    return (
        <div>
            <h3 className="mb-4 title">Membership Form Submissions</h3>
            <Table columns={columns} dataSource={dataSource} loading={isLoading} />

            <CustomModal
                open={open}
                hideModal={hideModal}
                performAction={() => deleteData(appId)}
                title="Are you sure you want to delete this data?"
            />
        </div>
    );
};

export default MemberForm;
