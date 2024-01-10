import React, { useEffect, useState } from 'react';
import Layout from "./Layout";
import DoanhThuChart from "../../components/DoanhThuChart";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/order/revenue?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`,{ withCredentials: true });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);
    const getDatesBetweenDates = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const processDataForChart = () => {
        const allDates = getDatesBetweenDates(startDate, endDate);
        const dataMap = new Map(allDates.map(date => [date, 0]));

        orders.forEach(order => {
            const date = order.orderDate;
            dataMap.set(date, (dataMap.get(date) || 0) + order.totalOrder);
        });

        return {
            labels: Array.from(dataMap.keys()),
            datasets: [
                {
                    label: 'Doanh thu',
                    data: Array.from(dataMap.values()),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }
            ]
        };
    };


    const chartData = processDataForChart();

    return (
        <>
            <Layout>
                <div className="container-fluid p-5">
                    <h3>Tổng quan</h3>
                    <div className="row">
                        <div className="col-lg-auto">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label me-2">Ngày bắt đầu</label>
                                <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                        </div>
                        <div className="col-lg-auto">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label me-2">Ngày kết thúc</label>
                                <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                        </div>
                        <div className="col-lg-auto">
                            <button className="btn btn-primary" onClick={fetchData}>Load Data</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {loading ? <p>Loading...</p> : orders.length > 0 ? <DoanhThuChart data={chartData} /> : <p>Chưa có dữ liệu cho khoảng thời gian này.</p>}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;
