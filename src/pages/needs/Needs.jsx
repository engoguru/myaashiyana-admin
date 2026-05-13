import { Table, Tag, Progress, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import {
  getAllneedsThunk,
  deleteneedsThunk,
  resetneedsState,
} from "../../features/needs/needSlice";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
    width: 70,
  },
  {
    title: "Campaign Info",
    dataIndex: "info",
    width: 300,
  },
  {
    title: "Goal (₹)",
    dataIndex: "goal",
    sorter: (a, b) => a.goal - b.goal,
  },
  {
    title: "Raised (₹)",
    dataIndex: "raised",
    sorter: (a, b) => a.raised - b.raised,
  },
  {
    title: "Progress",
    dataIndex: "progress",
    width: 200,
  },
  {
    title: "Products",
    dataIndex: "productsCount",
    align: "center",
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

const NeedsAdmin = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [needId, setNeedId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setNeedId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetneedsState());
    dispatch(getAllneedsThunk());
  }, [dispatch]);

  const { needs } = useSelector((state) => state.needs);

  const dataSource = needs?.map((need, idx) => {
    const percent = need.isCampaign && need.fundingGoal > 0 
      ? Math.round((need.amountRaised / need.fundingGoal) * 100) 
      : 0;

    return {
      key: idx + 1,
      goal: need.isCampaign ? need.fundingGoal : 0,
      raised: need.isCampaign ? need.amountRaised : 0,
      info: (
        <div className="d-flex align-items-center gap-3">
          {need.images?.[0]?.url ? (
            <img 
              src={need.images[0].url} 
              width={50} 
              height={50} 
              className="object-cover rounded shadow-sm border" 
              alt=""
            />
          ) : (
            <div className="bg-light rounded border d-flex align-items-center justify-content-center" style={{width:50, height:50}}>
              <small className="text-muted">No Image</small>
            </div>
          )}
          <div>
            <div className="fw-bold text-primary">{need.title}</div>
            {!need.isCampaign && <Tag color="default" className="ms-1" style={{fontSize:'10px'}}>Simple Need</Tag>}
          </div>
        </div>
      ),
      progress: need.isCampaign ? (
        <div className="pe-3">
          <Progress 
            percent={percent} 
            size="small" 
            status={percent >= 100 ? "success" : "active"} 
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <div className="d-flex justify-content-between mt-1">
             <small className="text-muted" style={{fontSize:'11px'}}>{percent}% funded</small>
          </div>
        </div>
      ) : (
        <span className="text-muted italic small">N/A</span>
      ),
      productsCount: (
        <Tooltip title={`${need.neededProducts?.length || 0} linked products`}>
           <div className="d-flex align-items-center justify-content-center gap-1">
             <MdOutlineProductionQuantityLimits className="fs-5 text-muted" />
             <span className="fw-bold">{need.neededProducts?.length || 0}</span>
           </div>
        </Tooltip>
      ),
      status: (
        <Tag color={need.status === 'urgent' ? 'red' : need.status === 'completed' ? 'green' : 'gold'} className="fw-bold">
          {need.status?.toUpperCase()}
        </Tag>
      ),
      action: (
        <div className="d-flex align-items-center">
          <Link
            to={`/admin/add_need/${need._id}`}
            className="ms-3 fs-3 text-primary"
            title="Edit"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(need._id)}
            title="Delete"
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    };
  });

  const deleteData = (id) => {
    dispatch(deleteneedsThunk(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllneedsThunk());
    }, 300);
  };

  return (
    <>
      <div className="p-2">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <h3 className="title m-0">Needs & Campaigns Management</h3>
          <Link to="/admin/add_need" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2">
            Add New Campaign
          </Link>
        </div>
        <div className="bg-white rounded shadow-sm border p-3">
          <Table 
            columns={columns} 
            dataSource={dataSource} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
          />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteData(needId)}
          title="Are you sure you want to delete this campaign/need?"
        />
      </div>
    </>
  );
};

export default NeedsAdmin;
