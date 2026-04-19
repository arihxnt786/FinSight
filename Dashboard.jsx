import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingUp, AlertCircle, ShoppingBag } from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/dashboard/stats').then(res => res.json()).then(setData);
    }, []);

    if (!data) return <div className="bg-slate-900 text-white h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Financial Overview</h1>
                <p className="text-slate-400">Welcome back, here is your spending insight.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Income" value={`$${data.total_income}`} icon={<Wallet className="text-green-400" />} />
                <StatCard title="Total Expenses" value={`$${data.total_expenses}`} icon={<ShoppingBag className="text-red-400" />} />
                <StatCard 
                    title="Savings Rate" 
                    value={`${data.savings_rate}%`} 
                    icon={<TrendingUp className="text-blue-400" />} 
                    color={data.savings_rate > 20 ? 'text-green-400' : 'text-yellow-400'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Breakdown */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={Object.entries(data.category_breakdown).map(([name, value]) => ({name, value}))} 
                                    dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    {Object.entries(data.category_breakdown).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Smart Insights */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle className="text-blue-400" /> Smart Insights
                    </h3>
                    <div className="space-y-4">
                        <InsightItem text="You spent 15% more on Food this month compared to last." type="warning" />
                        <InsightItem text="Your savings rate is healthy! Keep it up." type="success" />
                        <InsightItem text="Unexpected spike in 'Utilities' detected on the 15th." type="info" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color = "text-white" }) => (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">{icon}</div>
    </div>
);

const InsightItem = ({ text, type }) => {
    const colors = { warning: 'border-yellow-500', success: 'border-green-500', info: 'border-blue-500' };
    return (
        <div className={`p-3 bg-slate-900 border-l-4 ${colors[type]} rounded-r-lg text-sm`}>
            {text}
        </div>
    );
};

export default Dashboard;