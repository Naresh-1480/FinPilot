import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, DollarSign, Bell, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    monthlyIncome: "50000",
    currency: "INR",
  });

  const [notifications, setNotifications] = useState({
    billReminders: true,
    goalUpdates: true,
    weeklyReports: false,
    aiInsights: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast({
      title: "Notification Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').trim()} has been ${!notifications[key] ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>Update your personal details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income</Label>
                <Input
                  id="income"
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => setProfile(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={profile.currency}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" variant="gradient">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* Financial Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-success" />
            <CardTitle>Financial Preferences</CardTitle>
          </div>
          <CardDescription>Customize your financial tracking experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Monthly Budget Tracking</p>
                <p className="text-sm text-muted-foreground">Track spending against monthly limits</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Savings Goals</p>
                <p className="text-sm text-muted-foreground">Enable automatic savings calculations</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Investment Tracking</p>
                <p className="text-sm text-muted-foreground">Monitor your investment portfolio</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-warning" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Manage how you receive updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bill Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about upcoming bills</p>
              </div>
              <Switch
                checked={notifications.billReminders}
                onCheckedChange={() => handleNotificationToggle('billReminders')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Goal Updates</p>
                <p className="text-sm text-muted-foreground">Progress notifications for your goals</p>
              </div>
              <Switch
                checked={notifications.goalUpdates}
                onCheckedChange={() => handleNotificationToggle('goalUpdates')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Weekly financial summary emails</p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationToggle('weeklyReports')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">AI Insights</p>
                <p className="text-sm text-muted-foreground">Personalized financial recommendations</p>
              </div>
              <Switch
                checked={notifications.aiInsights}
                onCheckedChange={() => handleNotificationToggle('aiInsights')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Change Password
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Enable Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;