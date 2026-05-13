import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonations } from "../../features/donation/donationSlice";
import { Card, Row, Col, Statistic, Table } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DonationDashboard = () => {
  const dispatch = useDispatch();
  const donationState = useSelector((state) => state?.donation?.donations);
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    thisMonth: 0,
    thisMonthAmount: 0,
    avgDonation: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    dispatch(getAllDonations());
  }, [dispatch]);

  useEffect(() => {
    if (donationState && donationState.length > 0) {
      calculateStats();
      calculateMonthlyData();
      calculateTopDonors();
    }
  }, [donationState]);

  const calculateStats = () => {
    const total = donationState.length;
    const totalAmount = donationState.reduce(
      (sum, d) => sum + (d.amount || 0),
      0
    );

    // This month donations
    const now = new Date();
    const thisMonthDonations = donationState.filter((d) => {
      const donationDate = new Date(d.createdAt);
      return (
        donationDate.getMonth() === now.getMonth() &&
        donationDate.getFullYear() === now.getFullYear()
      );
    });

    const thisMonth = thisMonthDonations.length;
    const thisMonthAmount = thisMonthDonations.reduce(
      (sum, d) => sum + (d.amount || 0),
      0
    );

    const avgDonation = total > 0 ? totalAmount / total : 0;

    setStats({
      total,
      totalAmount,
      thisMonth,
      thisMonthAmount,
      avgDonation,
    });
  };

  const calculateMonthlyData = () => {
    const monthlyMap = {};

    donationState.forEach((donation) => {
      const date = new Date(donation.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = {
          month: monthYear,
          count: 0,
          amount: 0,
        };
      }

      monthlyMap[monthYear].count += 1;
      monthlyMap[monthYear].amount += donation.amount || 0;
    });

    // Get last 6 months
    const data = Object.values(monthlyMap)
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA - dateB;
      })
      .slice(-6);

    setMonthlyData(data);
  };

  const calculateTopDonors = () => {
    const donorMap = {};

    donationState.forEach((donation) => {
      const name = donation.name;
      if (!donorMap[name]) {
        donorMap[name] = {
          name,
          totalAmount: 0,
          count: 0,
        };
      }
      donorMap[name].totalAmount += donation.amount || 0;
      donorMap[name].count += 1;
    });

    const top = Object.values(donorMap)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5);

    setTopDonors(top);
  };

  const COLORS = ["#D89D55", "#b87a37", "#8B6F47", "#6B5B3D", "#4A3F2F"];

  const topDonorsColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Donor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Donated",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `₹${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "Donations",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="page-container">
      <h3 className="title mb-4">Donation Dashboard</h3>

      {/* Stats Cards */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Donations"
              value={stats.total}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Amount"
              value={stats.totalAmount}
              prefix="₹"
              precision={0}
              valueStyle={{ color: "#D89D55" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="This Month"
              value={stats.thisMonth}
              prefix={<CalendarOutlined />}
              suffix="donations"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="This Month Amount"
              value={stats.thisMonthAmount}
              prefix="₹"
              precision={0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Average Donation */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Average Donation"
              value={stats.avgDonation}
              prefix="₹"
              precision={2}
              valueStyle={{ color: "#722ed1" }}
              suffix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Unique Donors"
              value={topDonors.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Monthly Donations Chart */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} lg={12}>
          <Card title="Monthly Donations (Count)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#D89D55" name="Donations" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Monthly Donations (Amount)" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#b87a37"
                  strokeWidth={2}
                  name="Amount (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Top Donors */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} lg={12}>
          <Card title="Top 5 Donors" bordered={false}>
            <Table
              columns={topDonorsColumns}
              dataSource={topDonors}
              pagination={false}
              rowKey="name"
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Top Donors Distribution" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topDonors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="totalAmount"
                >
                  {topDonors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Recent Donations" bordered={false}>
            <Table
              columns={[
                {
                  title: "Date",
                  dataIndex: "createdAt",
                  key: "createdAt",
                  render: (date) =>
                    new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                },
                {
                  title: "Donor",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                  key: "amount",
                  render: (amount) => `₹${amount.toLocaleString("en-IN")}`,
                },
                {
                  title: "Payment ID",
                  dataIndex: "razorpayPaymentId",
                  key: "razorpayPaymentId",
                  render: (id) => id?.substring(0, 20) + "..." || "N/A",
                },
              ]}
              dataSource={donationState?.slice(0, 5)}
              pagination={false}
              rowKey="_id"
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DonationDashboard;
