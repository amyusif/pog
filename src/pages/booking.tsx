import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    time: "",
    venue: "",
    guests: "",
    package: "",
    addons: [] as string[],
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAddonToggle = (addon: string) => {
    setFormData(prev => {
      if (prev.addons.includes(addon)) {
        return { ...prev, addons: prev.addons.filter(a => a !== addon) };
      }
      return { ...prev, addons: [...prev.addons, addon] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.eventType !== "";
      case 2: return formData.date !== "";
      case 3: return formData.venue !== "";
      case 4: return formData.package !== "";
      case 5: return true; // addons optional
      case 6: return formData.name !== "" && formData.email !== "";
      default: return false;
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-40 pb-32 bg-black min-h-[80vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-xl mx-auto px-6"
          >
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4">Request Received</h1>
            <p className="text-white/60 text-lg mb-8">
              Thank you for considering Power of Grace for your event. Our team will review your details and respond within 24 hours with a custom proposal.
            </p>
            <Button onClick={() => window.location.href='/'}>Return to Home</Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Book The Band</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Fill out the details below to check our availability and receive a customized quote for your event.</p>
        </div>
      </section>

      <section className="py-12 bg-black min-h-[60vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Main Form Area */}
            <div className="flex-1">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <div 
                      key={num} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                        step === num ? "border-primary text-primary" :
                        step > num ? "bg-primary border-primary text-black" : "border-white/20 text-white/30"
                      }`}
                    >
                      {step > num ? <CheckCircle2 className="w-4 h-4" /> : num}
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((step - 1) / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/10 p-8 rounded-sm shadow-2xl">
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">What type of event is this?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["Wedding", "Corporate Event", "Private Party", "Concert/Festival", "Birthday", "Other"].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateForm('eventType', type)}
                            className={`p-4 border text-left rounded-sm transition-all ${
                              formData.eventType === type 
                              ? "border-primary bg-primary/10 text-primary font-bold" 
                              : "border-white/10 text-white/70 hover:border-white/30"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">When is the event?</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Date</label>
                          <input 
                            type="date" 
                            value={formData.date}
                            onChange={(e) => updateForm('date', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Estimated Start Time</label>
                          <input 
                            type="time" 
                            value={formData.time}
                            onChange={(e) => updateForm('time', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">Where is it happening?</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Venue Name & City</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Kempinski Hotel, Accra"
                            value={formData.venue}
                            onChange={(e) => updateForm('venue', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Estimated Guest Count</label>
                          <select 
                            value={formData.guests}
                            onChange={(e) => updateForm('guests', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          >
                            <option value="">Select range...</option>
                            <option value="Under 50">Under 50</option>
                            <option value="50 - 150">50 - 150</option>
                            <option value="150 - 300">150 - 300</option>
                            <option value="300 - 500">300 - 500</option>
                            <option value="500+">500+</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">Select a Package</h2>
                      <div className="space-y-4">
                        {[
                          { id: "Standard", title: "Standard Package", desc: "4-piece band. Perfect for intimate gatherings." },
                          { id: "Premium", title: "Premium Package", desc: "6-piece band with brass. Our most popular option." },
                          { id: "Luxury", title: "Luxury Experience", desc: "10-piece collective with choir and full horn section." }
                        ].map(pkg => (
                          <div 
                            key={pkg.id}
                            onClick={() => updateForm('package', pkg.id)}
                            className={`p-6 border rounded-sm cursor-pointer transition-all flex items-center gap-4 ${
                              formData.package === pkg.id 
                              ? "border-primary bg-primary/10" 
                              : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.package === pkg.id ? "border-primary" : "border-white/30"}`}>
                              {formData.package === pkg.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                            </div>
                            <div>
                              <h3 className={`font-bold ${formData.package === pkg.id ? "text-primary" : "text-white"}`}>{pkg.title}</h3>
                              <p className="text-sm text-white/60 mt-1">{pkg.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">Add-ons (Optional)</h2>
                      <div className="space-y-3">
                        {[
                          "Full PA / Sound System",
                          "Stage Lighting",
                          "MC / Event Host",
                          "DJ Services for breaks"
                        ].map(addon => (
                          <label key={addon} className="flex items-center gap-4 p-4 border border-white/10 rounded-sm cursor-pointer hover:bg-white/5">
                            <input 
                              type="checkbox" 
                              checked={formData.addons.includes(addon)}
                              onChange={() => handleAddonToggle(addon)}
                              className="w-5 h-5 accent-primary bg-black border-white/20"
                            />
                            <span className="text-white">{addon}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-serif font-bold text-white mb-6">Your Details</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">Full Name</label>
                            <input 
                              type="text" required
                              value={formData.name}
                              onChange={(e) => updateForm('name', e.target.value)}
                              className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">Phone Number</label>
                            <input 
                              type="tel" required
                              value={formData.phone}
                              onChange={(e) => updateForm('phone', e.target.value)}
                              className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Email Address</label>
                          <input 
                            type="email" required
                            value={formData.email}
                            onChange={(e) => updateForm('email', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">Special Requests / Questions</label>
                          <textarea 
                            rows={4}
                            value={formData.requests}
                            onChange={(e) => updateForm('requests', e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none resize-none"
                          />
                        </div>
                        
                        {/* Honeypot */}
                        <div className="hidden">
                          <input type="text" name="website" />
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                  <Button 
                    variant="ghost" 
                    onClick={prevStep}
                    disabled={step === 1}
                    className="text-white/60 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {step < 6 ? (
                    <Button 
                      onClick={nextStep}
                      disabled={!isStepValid()}
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!isStepValid()}
                      className="bg-primary text-black font-bold"
                    >
                      Submit Request
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="w-full md:w-80 shrink-0">
              <div className="sticky top-32 bg-zinc-950 border border-white/10 p-6 rounded-sm">
                <h3 className="font-serif font-bold text-xl text-white mb-6 pb-4 border-b border-white/10">Your Event</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-white/40 uppercase tracking-widest text-xs mb-1">Type</div>
                    <div className="text-white font-medium">{formData.eventType || "—"}</div>
                  </div>
                  
                  {(formData.date || formData.time) && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">When</div>
                      <div className="text-white font-medium">
                        {formData.date} {formData.time && `at ${formData.time}`}
                      </div>
                    </div>
                  )}
                  
                  {formData.venue && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">Where</div>
                      <div className="text-white font-medium">{formData.venue}</div>
                    </div>
                  )}
                  
                  {formData.package && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">Package</div>
                      <div className="text-primary font-bold">{formData.package}</div>
                    </div>
                  )}

                  {formData.addons.length > 0 && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">Add-ons</div>
                      <ul className="text-white/80 list-disc list-inside pl-2">
                        {formData.addons.map(a => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
