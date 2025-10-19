import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fintech.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative container mx-auto px-4 py-32 md:py-48">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Financial Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Your Personal CFO,
              <br />
              Powered by AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              FinPilot doesn't just track your money — it thinks for it. 
              Get personalized insights, predictions, and smart recommendations from day one.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                variant="gradient"
                onClick={() => navigate("/auth")}
                className="group"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-success" />}
              title="Smart Predictions"
              description="AI analyzes your habits to predict spending, upcoming bills, and help you stay ahead of financial surprises."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-warning" />}
              title="Instant Insights"
              description="Get personalized recommendations and what-if simulations to optimize your financial decisions instantly."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-accent" />}
              title="Cold Start Ready"
              description="Start seeing value from day one with AI-simulated data based on your profile — no waiting period required."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-gradient-card border border-border p-12 md:p-20 text-center overflow-hidden shadow-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
            <div className="relative space-y-6 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to take control?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands who are making smarter financial decisions with AI
              </p>
              <Button 
                size="lg" 
                variant="gradient"
                onClick={() => navigate("/auth")}
                className="group"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="group relative rounded-2xl bg-card border border-border p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
    <div className="mb-4 inline-block rounded-lg bg-muted p-3">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Landing;