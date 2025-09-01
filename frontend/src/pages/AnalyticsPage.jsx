import { useEffect, useState } from "react";
import { getAnalytics, recalcAnalytics } from "../services/analytics";
import Card from "../components/Card";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [toast, setToast] = useState("");

  const loadAnalytics = async () => {
    const res = await getAnalytics();
    setAnalytics(res);
  };

  useEffect(() => { loadAnalytics(); }, []);

  const handleRecalc = async () => {
    await recalcAnalytics();
    setToast("Analytics recalculated");
    loadAnalytics();
  };

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div>
      {/* <Card title="Analytics Dashboard" actions={<Button onClick={handleRecalc}>Recalculate</Button>}>
        <h3>Deals by Stage</h3>
        <PieChart width={400} height={300}>
          <Pie data={analytics.dealsByStage} dataKey="count" nameKey="stage" outerRadius={100}>
            {analytics.dealsByStage.map((_, idx) => (
              <Cell key={idx} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][idx % 4]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <h3>Deals by Month</h3>
        <BarChart width={500} height={300} data={analytics.dealsByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0077cc" />
        </BarChart>
      </Card> */}
      <Card title="Analytics Dashboard" actions={<Button onClick={handleRecalc}>Recalculate</Button>}>
  <h3>Total Deals: {analytics.totalDeals}</h3>

  <h3>Deals by Stage</h3>
  <PieChart width={400} height={300}>
    <Pie data={analytics.dealsByStage} dataKey="count" nameKey="stage" outerRadius={100}>
      {analytics.dealsByStage.map((_, idx) => (
        <Cell key={idx} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][idx % 4]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  <h3>Deals by Month</h3>
  <BarChart width={500} height={300} data={analytics.dealsByMonth}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#0077cc" />
  </BarChart>
</Card>

      <Toast message={toast} />
    </div>
  );
}
