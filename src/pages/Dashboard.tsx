import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, Sparkles, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  // Mock data for demonstration
  const spendingData = [
    { name: "Mon", amount: 120 },
    { name: "Tue", amount: 85 },
    { name: "Wed", amount: 150 },
    { name: "Thu", amount: 95 },
    { name: "Fri", amount: 200 },
    { name: "Sat", amount: 180 },
    { name: "Sun", amount: 75 },
  ];

  const categoryData = [
    { name: "Food", value: 450, color: "hsl(var(--success))" },
    { name: "Transport", value: 200, color: "hsl(var(--accent))" },
    { name: "Shopping", value: 350, color: "hsl(var(--primary))" },
    { name: "Bills", value: 500, color: "hsl(var(--warning))" },
    { name: "Other", value: 150, color: "hsl(var(--muted))" },
  ];

  const totalIncome = 5000;
  const totalExpense = 1650;
  const balance = totalIncome - totalExpense;
  const savingsGoal = 2000;
  const currentSavings = 1200;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Prototype Notice */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              This is just a Prototype
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              Some functionality might be missing or won't work as expected. This is a demo version for testing purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Here's your financial overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-success" />}
          trend={+12.5}
          description="vs last month"
        />
        <SummaryCard
          title="Total Expense"
          value={`₹${totalExpense.toLocaleString()}`}
          icon={<TrendingDown className="h-5 w-5 text-destructive" />}
          trend={-8.2}
          description="vs last month"
        />
        <SummaryCard
          title="Balance"
          value={`₹${balance.toLocaleString()}`}
          icon={<TrendingUp className="h-5 w-5 text-accent" />}
          trend={+15.3}
          description="vs last month"
        />
        <SummaryCard
          title="Savings Goal"
          value={`${Math.round((currentSavings / savingsGoal) * 100)}%`}
          icon={<Target className="h-5 w-5 text-primary" />}
          description={`₹${currentSavings} of ₹${savingsGoal}`}
        />
      </div>

      {/* AI Insights */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-glow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <CardDescription>Personalized recommendations based on your spending habits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InsightCard
            type="success"
            title="Great job on food expenses!"
            description="You've saved ₹120 on food this week compared to last week. Keep it up!"
          />
          <InsightCard
            type="warning"
            title="Upcoming bill alert"
            description="Your Netflix subscription (₹199) is due in 3 days. Make sure you have sufficient balance."
          />
          <InsightCard
            type="info"
            title="Savings opportunity"
            description="If you reduce shopping expenses by ₹500/week, you'll reach your savings goal 2 weeks earlier."
          />
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Spending Trend</CardTitle>
            <CardDescription>Your daily expenses this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  formatter={(value: any) => [`₹${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`₹${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Savings Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Savings Goal</CardTitle>
          <CardDescription>Track your progress towards your savings target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current: ₹{currentSavings}</span>
            <span className="text-muted-foreground">Goal: ₹{savingsGoal}</span>
          </div>
          <Progress value={(currentSavings / savingsGoal) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground">
            ₹{savingsGoal - currentSavings} remaining to reach your goal
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  icon,
  trend,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  description: string;
}) => (
  <Card className="hover:shadow-glow transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        {trend !== undefined && (
          <span className={trend > 0 ? "text-success" : "text-destructive"}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
        {description}
      </p>
    </CardContent>
  </Card>
);

const InsightCard = ({
  type,
  title,
  description,
}: {
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}) => {
  const colors = {
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    info: "border-accent/30 bg-accent/5",
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[type]}`}>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Dashboard;