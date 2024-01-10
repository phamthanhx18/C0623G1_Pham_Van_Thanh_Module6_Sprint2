import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DoanhThuChart = ({data}) => {

    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
            },
            // Cấu hình cho trục X (x-axis) nếu cần
        },
    };

    return <Bar style={{maxWidth: '100%'}} data={data} options={options} />;
};

export default DoanhThuChart;
