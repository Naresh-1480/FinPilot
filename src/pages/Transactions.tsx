import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Sparkles, MessageSquare, Upload, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Transactions = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [smsText, setSmsText] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedTransactions, setParsedTransactions] = useState<any[]>([]);

  // Mock transactions
  const transactions = [
    { id: 1, date: "2025-01-15", description: "Zomato Food Delivery", amount: -350, category: "Food" },
    { id: 2, date: "2025-01-14", description: "Salary Deposit", amount: 5000, category: "Income" },
    { id: 3, date: "2025-01-14", description: "Uber Ride", amount: -120, category: "Transport" },
    { id: 4, date: "2025-01-13", description: "Amazon Shopping", amount: -899, category: "Shopping" },
    { id: 5, date: "2025-01-12", description: "Electricity Bill", amount: -500, category: "Bills" },
    { id: 6, date: "2025-01-11", description: "Freelance Payment", amount: 2000, category: "Income" },
  ];

  const handleAISuggest = () => {
    // Simulate AI suggestion
    if (newTransaction.description.toLowerCase().includes("zomato")) {
      setNewTransaction(prev => ({
        ...prev,
        category: "Food",
        amount: "300",
      }));
      toast({
        title: "AI Suggestion Applied",
        description: "Category: Food, Amount: ₹300",
      });
    }
  };

  const parseSMS = () => {
    if (!smsText.trim()) {
      toast({
        title: "Error",
        description: "Please enter SMS text to parse",
        variant: "destructive",
      });
      return;
    }

    // Simple SMS parsing logic
    const lines = smsText.split('\n');
    const parsed = [];
    
    for (const line of lines) {
      // Look for common patterns in SMS
      const amountMatch = line.match(/₹?(\d+(?:\.\d{2})?)/);
      const debitMatch = line.match(/debited|spent|paid|purchase/i);
      const creditMatch = line.match(/credited|received|deposit/i);
      
      if (amountMatch) {
        const amount = parseFloat(amountMatch[1]);
        const isDebit = debitMatch && !creditMatch;
        const description = line.replace(/₹?\d+(?:\.\d{2})?/g, '').trim();
        
        if (description) {
          parsed.push({
            description,
            amount: isDebit ? -amount : amount,
            category: isDebit ? "Expense" : "Income",
            date: new Date().toISOString().split('T')[0]
          });
        }
      }
    }
    
    setParsedTransactions(parsed);
    toast({
      title: "SMS Parsed",
      description: `Found ${parsed.length} transactions`,
    });
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setCsvFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const parsed = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= 3) {
          parsed.push({
            description: values[0] || 'Unknown',
            amount: parseFloat(values[1]) || 0,
            category: values[2] || 'Other',
            date: values[3] || new Date().toISOString().split('T')[0]
          });
        }
      }
      
      setParsedTransactions(parsed);
      toast({
        title: "CSV Parsed",
        description: `Found ${parsed.length} transactions`,
      });
    };
    
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction Added",
      description: `${newTransaction.description} - ₹${newTransaction.amount}`,
    });
    setIsOpen(false);
    setNewTransaction({ description: "", amount: "", category: "" });
  };

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">Manage and track all your expenses</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Choose how you'd like to add transactions
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="manual" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Manual
                </TabsTrigger>
                <TabsTrigger value="sms" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS Parsing
                </TabsTrigger>
                <TabsTrigger value="csv" className="gap-2">
                  <Upload className="h-4 w-4" />
                  CSV Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <div className="flex gap-2">
                        <Input
                          id="description"
                          placeholder="e.g., Zomato, Uber, Amazon"
                          value={newTransaction.description}
                          onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleAISuggest}
                          title="AI Suggest"
                        >
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="300"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newTransaction.category}
                        onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Bills">Bills</SelectItem>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter className="mt-6">
                    <Button type="submit" variant="gradient">Add Transaction</Button>
                  </DialogFooter>
                </form>
              </TabsContent>

              <TabsContent value="sms" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-text">Paste SMS Text</Label>
                    <Textarea
                      id="sms-text"
                      placeholder="Paste your bank SMS here...&#10;&#10;Example:&#10;₹350 debited from your account for Zomato order&#10;₹5000 credited to your account as salary"
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Paste multiple SMS messages, one per line. The AI will extract transaction details automatically.
                    </p>
                  </div>

                  <Button onClick={parseSMS} variant="gradient" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Parse SMS with AI
                  </Button>

                  {parsedTransactions.length > 0 && (
                    <div className="space-y-2">
                      <Label>Parsed Transactions ({parsedTransactions.length})</Label>
                      <div className="max-h-40 overflow-y-auto space-y-2 border rounded-lg p-3">
                        {parsedTransactions.map((txn, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{txn.description}</span>
                            <span className={txn.amount > 0 ? "text-success" : "text-destructive"}>
                              {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Transactions Added",
                            description: `${parsedTransactions.length} transactions added successfully`,
                          });
                          setParsedTransactions([]);
                          setSmsText("");
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Add All Transactions
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="csv" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csv-file">Upload CSV File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload a CSV file with your transactions
                      </p>
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="max-w-xs mx-auto"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Expected format: Description, Amount, Category, Date
                      </p>
                    </div>
                  </div>

                  {csvFile && (
                    <div className="text-sm text-muted-foreground">
                      Selected: {csvFile.name}
                    </div>
                  )}

                  {parsedTransactions.length > 0 && (
                    <div className="space-y-2">
                      <Label>Parsed Transactions ({parsedTransactions.length})</Label>
                      <div className="max-h-40 overflow-y-auto space-y-2 border rounded-lg p-3">
                        {parsedTransactions.map((txn, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{txn.description}</span>
                            <span className={txn.amount > 0 ? "text-success" : "text-destructive"}>
                              {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Transactions Added",
                            description: `${parsedTransactions.length} transactions added successfully`,
                          });
                          setParsedTransactions([]);
                          setCsvFile(null);
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Add All Transactions
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold">{transaction.description}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={transaction.amount > 0 ? "default" : "secondary"}>
                    {transaction.category}
                  </Badge>
                  <span
                    className={`text-lg font-bold ${
                      transaction.amount > 0 ? "text-success" : "text-foreground"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;