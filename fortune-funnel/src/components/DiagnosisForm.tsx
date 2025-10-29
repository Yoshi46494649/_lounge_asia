import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Sparkles, Heart, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DiagnosisResult } from "./DiagnosisResult";

type DiagnosisType = "today" | "compatibility" | null;

export const DiagnosisForm = () => {
  const { toast } = useToast();
  const [diagnosisType, setDiagnosisType] = useState<DiagnosisType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    diagnosis: string;
    compatibilityScore?: number | null;
    emotionalScore?: number | null;
    communicationScore?: number | null;
    growthScore?: number | null;
    diagnosisType: "today" | "compatibility";
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    partnerName: "",
    partnerBirthDate: "",
    partnerBirthTime: "",
    partnerBirthPlace: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diagnosisType) {
      toast({
        title: "Please select a diagnosis type",
        description: "Choose between Today's Fortune or Compatibility Check",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: formData.birthPlace,
      };

      const partnerData = diagnosisType === "compatibility" ? {
        name: formData.partnerName,
        birthDate: formData.partnerBirthDate,
        birthTime: formData.partnerBirthTime,
        birthPlace: formData.partnerBirthPlace,
      } : undefined;

      const { data, error } = await supabase.functions.invoke('fortune-diagnosis', {
        body: { diagnosisType, userData, partnerData }
      });

      if (error) throw error;

      setDiagnosisResult({
        diagnosis: data.diagnosis,
        compatibilityScore: data.compatibilityScore,
        emotionalScore: data.emotionalScore,
        communicationScore: data.communicationScore,
        growthScore: data.growthScore,
        diagnosisType: data.diagnosisType,
      });
      setShowResult(true);
      
      toast({
        title: "✨ Your destiny has been revealed!",
        description: "Scroll down to see your reading",
      });
    } catch (error) {
      console.error("Diagnosis error:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showResult && diagnosisResult) {
    return (
      <DiagnosisResult
        diagnosis={diagnosisResult.diagnosis}
        compatibilityScore={diagnosisResult.compatibilityScore}
        emotionalScore={diagnosisResult.emotionalScore}
        communicationScore={diagnosisResult.communicationScore}
        growthScore={diagnosisResult.growthScore}
        diagnosisType={diagnosisResult.diagnosisType}
        onBack={() => setShowResult(false)}
      />
    );
  }

  return (
    <section id="diagnosis-form" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Start Your <span className="bg-gradient-destiny bg-clip-text text-transparent">Love Reading</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Takes 60 seconds • 100% Free • No signup required
          </p>
        </div>

        <Card className="p-8 shadow-card border-border/50 bg-gradient-card backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Your Details
              </h3>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    What's your first name? <span className="text-muted-foreground text-sm">(Optional, for a personal touch)</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    When were you born?
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    What time were you born? <span className="text-muted-foreground text-sm">(Approximate is fine)</span>
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthPlace" className="text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Where were you born? <span className="text-muted-foreground text-sm">(City, Country)</span>
                  </Label>
                  <Input
                    id="birthPlace"
                    placeholder="e.g., Brisbane, Australia"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground border border-border/30">
                <p className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Your privacy is our priority. No data is stored.
                </p>
              </div>
            </div>

            {/* Diagnosis Type Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                What destiny would you like to explore today?
              </h3>
              
              <RadioGroup
                value={diagnosisType || ""}
                onValueChange={(value) => setDiagnosisType(value as DiagnosisType)}
                className="grid md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="today" id="today" className="peer sr-only" />
                  <Label
                    htmlFor="today"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-card p-6 hover:bg-accent hover:border-primary cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                  >
                    <Sparkles className="w-8 h-8 mb-3 text-primary" />
                    <div className="text-center space-y-1">
                      <div className="font-semibold text-foreground">Today's Love Fortune</div>
                      <div className="text-sm text-muted-foreground">Daily insights for your love life</div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="compatibility" id="compatibility" className="peer sr-only" />
                  <Label
                    htmlFor="compatibility"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-card p-6 hover:bg-accent hover:border-secondary cursor-pointer peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 transition-all"
                  >
                    <Heart className="w-8 h-8 mb-3 text-secondary" />
                    <div className="text-center space-y-1">
                      <div className="font-semibold text-foreground">Compatibility Check</div>
                      <div className="text-sm text-muted-foreground">Discover your ideal match</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Partner Information (only for compatibility) */}
            {diagnosisType === "compatibility" && (
              <div className="space-y-6 animate-fade-in border-t border-border/50 pt-8">
                <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-6 h-6 text-secondary" />
                  Tell us about the person you're curious about!
                </h3>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="partnerName" className="text-foreground">
                      Their name <span className="text-muted-foreground text-sm">(Optional)</span>
                    </Label>
                    <Input
                      id="partnerName"
                      placeholder="Enter their name"
                      value={formData.partnerName}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="border-border/50 focus:border-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnerBirthDate" className="text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      Their birth date
                    </Label>
                    <Input
                      id="partnerBirthDate"
                      type="date"
                      value={formData.partnerBirthDate}
                      onChange={(e) => setFormData({ ...formData, partnerBirthDate: e.target.value })}
                      className="border-border/50 focus:border-secondary"
                      required={diagnosisType === "compatibility"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnerBirthTime" className="text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      Their birth time <span className="text-muted-foreground text-sm">(If known)</span>
                    </Label>
                    <Input
                      id="partnerBirthTime"
                      type="time"
                      value={formData.partnerBirthTime}
                      onChange={(e) => setFormData({ ...formData, partnerBirthTime: e.target.value })}
                      className="border-border/50 focus:border-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnerBirthPlace" className="text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      Their birth place <span className="text-muted-foreground text-sm">(If known)</span>
                    </Label>
                    <Input
                      id="partnerBirthPlace"
                      placeholder="e.g., Sydney, Australia"
                      value={formData.partnerBirthPlace}
                      onChange={(e) => setFormData({ ...formData, partnerBirthPlace: e.target.value })}
                      className="border-border/50 focus:border-secondary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="destiny" 
              size="xl" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Stars are aligning...
                </>
              ) : diagnosisType === "compatibility" ? (
                <>
                  <Heart className="w-5 h-5" />
                  Reveal My Compatibility!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Diagnose My Destiny!
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};