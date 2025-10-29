import { Shield, Lock, Eye } from "lucide-react";

export const PrivacySection = () => {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Data is Safe with Us
          </h2>
          <p className="text-xl text-primary font-medium">
            No Personal Information Stored
          </p>
        </div>

        <div className="bg-gradient-card backdrop-blur-sm rounded-2xl p-8 shadow-card border border-border/50 space-y-6">
          <p className="text-lg text-foreground/90 leading-relaxed">
            We respect your privacy. All birth details are processed for your unique reading and immediately discarded. 
            Your journey is personal, and so is your data.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Secure Processing</h3>
              <p className="text-sm text-muted-foreground">Data used only for readings</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Zero Storage</h3>
              <p className="text-sm text-muted-foreground">Nothing saved on servers</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Complete Privacy</h3>
              <p className="text-sm text-muted-foreground">Your secrets stay yours</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center italic">
              Your privacy is our priority. When you close the app, your information disappears with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};