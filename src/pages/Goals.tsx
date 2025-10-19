import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  // Mock goals
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 50000,
      currentAmount: 32000,
      deadline: "2025-12-31",
      category: "Savings",
    },
    {
      id: 2,
      name: "Vacation to Bali",
      targetAmount: 80000,
      currentAmount: 15000,
      deadline: "2025-08-15",
      category: "Travel",
    },
    {
      id: 3,
      name: "New Laptop",
      targetAmount: 120000,
      currentAmount: 85000,
      deadline: "2025-03-30",
      category: "Purchase",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Goal Created",
      description: `${newGoal.name} - Target: ₹${newGoal.targetAmount}`,
    });
    setIsOpen(false);
    setNewGoal({ name: "", targetAmount: "", currentAmount: "", deadline: "" });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Financial Goals</h1>
          <p className="text-muted-foreground">Track and achieve your savings targets</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a financial target and track your progress
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input
                    id="goal-name"
                    placeholder="e.g., Emergency Fund, Vacation"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (₹)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="50000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-amount">Current Amount (₹)</Label>
                  <Input
                    id="current-amount"
                    type="number"
                    placeholder="10000"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, currentAmount: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" variant="gradient">Create Goal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Total Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Math.round(
                goals.reduce((acc, goal) => acc + calculateProgress(goal.currentAmount, goal.targetAmount), 0) /
                  goals.length
              )}
              %
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Nearest Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Math.min(...goals.map(g => calculateDaysRemaining(g.deadline)))} days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysRemaining = calculateDaysRemaining(goal.deadline);
          const remaining = goal.targetAmount - goal.currentAmount;

          return (
            <Card key={goal.id} className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{goal.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {goal.category} • {daysRemaining} days remaining
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">₹{goal.currentAmount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      of ₹{goal.targetAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-xl font-bold text-primary">₹{remaining.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Daily target</p>
                    <p className="text-xl font-bold">
                      ₹{daysRemaining > 0 ? Math.ceil(remaining / daysRemaining).toLocaleString() : 0}
                    </p>
                  </div>
                </div>

                {progress < 100 && (
                  <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
                    <p className="text-sm">
                      <strong>AI Tip:</strong> Save ₹
                      {daysRemaining > 0 ? Math.ceil(remaining / daysRemaining) : 0} daily to reach your
                      goal by the deadline. Consider reducing discretionary spending by 15% this month.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;