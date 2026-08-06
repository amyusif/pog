import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { fadeUp, staggerContainer, smoothEase } from '@/hooks/useScrollReveal';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ── Pricing configs ─────────────────────────────────────────────────────────
const LIVE_EVENT_OPTIONS = [
  {
    id: "Within Kumasi",
    label: "Within Kumasi",
    price: "GH₵5,000",
    desc: "Live performance at any venue within the Kumasi metropolitan area",
  },
  {
    id: "Outside Kumasi",
    label: "Outside Kumasi",
    price: "GH₵6,500 – 8,000",
    desc: "Live performance at venues outside Kumasi — price varies by distance",
  },
];

const RENTAL_PACKAGES = [
  {
    id: "Standard",
    label: "Standard",
    price: "GH₵1,500 – 2,500",
    desc: "Essential instrument set — ideal for smaller, intimate events",
  },
  {
    id: "Premium",
    label: "Premium",
    price: "GH₵3,000 – 4,500",
    desc: "Full instrument lineup for mid-size events and functions",
  },
  {
    id: "Luxury",
    label: "Luxury",
    price: "GH₵5,000 – 8,000",
    desc: "Complete premium instrument collection for large-scale events",
  },
];

const LED_PACKAGES = [
  {
    id: "Standard",
    label: "Standard",
    price: "GH₵1,500",
    desc: "10 LED screen panels — perfect for smaller venues",
  },
  {
    id: "Premium",
    label: "Premium",
    price: "GH₵3,000",
    desc: "20 LED screen panels — great coverage for mid-size events",
  },
  {
    id: "Luxury",
    label: "Luxury",
    price: "GH₵6,000",
    desc: "40 LED screen panels — maximum impact for large events",
  },
];

const EVENT_SERVICES = [
  "Wedding",
  "Funeral",
  "Corporate Event",
  "Private Party",
  "Concert / Festival",
  "Birthday",
  "Traditional Ceremony",
  "Gospel Rock Show",
  "SRC Programs",
  "Other",
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    bookingType: "",       // "Live Band" | "LED Screens"
    subType: "",           // "Live Event" | "Musical Instrument Rentals" (Live Band only)
    package: "",           // Selected package/location tier
    customSpec: "",        // Custom specification (if package = "Other")
    eventType: "",         // Service: Wedding, Funeral, etc.
    customEventType: "",   // If eventType = "Other"
    date: "",
    time: "",
    venue: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
    requests: "",
    clientBudget: "",
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // Reset downstream state when type changes
  const setBookingType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      bookingType: type,
      subType: "",
      package: "",
      customSpec: "",
    }));
  };

  const setSubType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      subType: type,
      package: "",
      customSpec: "",
      clientBudget: "",
    }));
  };

  const getPackageOptions = () => {
    if (formData.bookingType === "LED Screens") return LED_PACKAGES;
    if (formData.subType === "Musical Instrument Rentals") return RENTAL_PACKAGES;
    if (formData.subType === "Live Event") return LIVE_EVENT_OPTIONS;
    return [];
  };

  const packageOptions = getPackageOptions();
  const selectedPackage = packageOptions.find((opt) => opt.id === formData.package);
  const packageHasRange = selectedPackage ? selectedPackage.price.includes("–") : false;

  // Dynamic step keys based on user choices
  const getStepKeys = () => {
    const s = ["bookingType"];
    if (formData.bookingType === "Live Band") s.push("subType");
    s.push("package");
    if (packageHasRange) s.push("budgetAmount");
    s.push("eventType", "when", "where", "details");
    return s;
  };

  const stepKeys = getStepKeys();
  const totalSteps = stepKeys.length;
  const currentKey = stepKeys[step - 1];

  const isStepValid = () => {
    switch (currentKey) {
      case "bookingType": return !!formData.bookingType;
      case "subType":     return !!formData.subType;
      case "package":     return !!formData.package;
      case "budgetAmount":return !!formData.clientBudget;
      case "eventType":   return !!formData.eventType;
      case "when":        return !!formData.date;
      case "where":       return !!formData.venue;
      case "details":     return !!formData.name && !!formData.email && !!formData.phone;
      default:            return false;
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const packageStepTitle = () => {
    if (formData.subType === "Live Event") return "Select Location / Coverage";
    return "Select a Package";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const budgetStr =
      formData.package === "Other"
        ? `Custom: ${formData.customSpec}`
        : formData.package;

    const eventStr =
      formData.eventType === "Other"
        ? formData.customEventType || "Other"
        : formData.eventType;

    try {
      const res = await fetch("https://server-bay-ten-49.vercel.app/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: formData.name,
          event: eventStr,
          date: new Date(formData.date).toISOString(),
          location: formData.venue,
          budget: budgetStr,
          bookingType: formData.bookingType,
          subType: formData.subType,
          customSpec: formData.customSpec,
          phone: formData.phone,
          email: formData.email,
          time: formData.time,
          clientBudget: formData.clientBudget,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <Layout>
        <section className="pt-48 pb-36 bg-background min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-center max-w-xl mx-auto px-6 relative z-10 bg-card p-12 rounded-2xl border border-border shadow-xl"
          >
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-medium text-foreground mb-4">
              Request Received
            </h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Thank you for choosing Powers of Grace. Our team will review your
              request and get back to you within 24 hours with a custom proposal.
            </p>
            <Button size="lg" className="rounded-full px-8" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <Layout>
      {/* Hero */}
      <motion.section 
        className="pt-48 pb-28 md:py-48 bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden border-b border-border"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Reserve Your Date
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter">
              Make a Booking
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Fill out the details below to check our availability and receive a
              customised quote for your event.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-28 md:py-36 bg-muted/30 min-h-[60vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* ── Form Column ─────────────────────────────────────────── */}
            <div className="flex-1 w-full">
              {/* Progress bar */}
              <div className="mb-12">
                <div className="flex justify-between mb-4 relative z-10">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                    (num) => (
                      <div
                        key={num}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 bg-background ${
                          step === num
                            ? "border-primary text-primary shadow-[0_0_15px] shadow-primary/20 scale-110"
                            : step > num
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {step > num ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          num
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="h-2 bg-border w-full rounded-full overflow-hidden relative -mt-9 z-0 translate-y-4">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: smoothEase }}
                  />
                </div>
              </div>

              {/* Step content card */}
              <div className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-sm min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* ── STEP: Booking Type ─────────────────────────── */}
                  {currentKey === "bookingType" && (
                    <motion.div
                      key="bookingType"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        What would you like to book?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Choose the type of service you need.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          {
                            id: "Live Band",
                            sub: "Live performances & instrument rentals",
                          },
                          {
                            id: "LED Screens",
                            sub: "LED screen setup & display services",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setBookingType(opt.id)}
                            className={`p-8 border text-left rounded-xl transition-all duration-300 relative overflow-hidden group ${
                              formData.bookingType === opt.id
                                ? "border-primary bg-primary/5 shadow-[0_0_20px] shadow-primary/10"
                                : "border-border bg-background hover:border-primary/50 hover:bg-card hover:shadow-md"
                            }`}
                          >
                            <div className={`absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0 ${formData.bookingType === opt.id ? "translate-y-0" : ""}`} />
                            <div className="relative z-10">
                              <p
                                className={`font-semibold text-xl mb-2 transition-colors ${
                                  formData.bookingType === opt.id
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {opt.id}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {opt.sub}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Sub-type (Live Band only) ───────────── */}
                  {currentKey === "subType" && (
                    <motion.div
                      key="subType"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        Which Live Band service?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Select the specific type of booking you need.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          {
                            id: "Live Event",
                            desc: "Full live band performance at your event",
                          },
                          {
                            id: "Musical Instrument Rentals",
                            desc: "Rent professional instruments for your event",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSubType(opt.id)}
                            className={`p-8 border text-left rounded-xl transition-all duration-300 relative overflow-hidden group ${
                              formData.subType === opt.id
                                ? "border-primary bg-primary/5 shadow-[0_0_20px] shadow-primary/10"
                                : "border-border bg-background hover:border-primary/50 hover:bg-card hover:shadow-md"
                            }`}
                          >
                            <div className={`absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0 ${formData.subType === opt.id ? "translate-y-0" : ""}`} />
                            <div className="relative z-10">
                              <p
                                className={`font-semibold text-xl mb-2 transition-colors ${
                                  formData.subType === opt.id
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {opt.id}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Package / Location ───────────────────── */}
                  {currentKey === "package" && (
                    <motion.div
                      key="package"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        {packageStepTitle()}
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Choose the option that best fits your needs.
                      </p>
                      <div className="space-y-4">
                        {/* Regular options */}
                        {packageOptions.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => update("package", opt.id)}
                            className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-6 group hover:shadow-md ${
                              formData.package === opt.id
                                ? "border-primary bg-primary/5 shadow-[0_0_20px] shadow-primary/10"
                                : "border-border bg-background hover:border-primary/50"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                formData.package === opt.id
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/30 group-hover:border-primary/50"
                              }`}
                            >
                              {formData.package === opt.id && (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                                <h3
                                  className={`font-semibold text-lg ${
                                    formData.package === opt.id
                                      ? "text-primary"
                                      : "text-foreground"
                                  }`}
                                >
                                  {opt.label}
                                </h3>
                                <span
                                  className={`text-sm font-bold tracking-wide shrink-0 ${
                                    formData.package === opt.id
                                      ? "text-primary"
                                      : "text-foreground/80"
                                  }`}
                                >
                                  {opt.price}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* Other / Custom option */}
                        <div
                          onClick={() => update("package", "Other")}
                          className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 group hover:shadow-md ${
                            formData.package === "Other"
                              ? "border-primary bg-primary/5 shadow-[0_0_20px] shadow-primary/10"
                              : "border-border bg-background hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                formData.package === "Other"
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/30 group-hover:border-primary/50"
                              }`}
                            >
                              {formData.package === "Other" && (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <h3
                                className={`font-semibold text-lg mb-2 ${
                                  formData.package === "Other"
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                Other / Custom
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Have specific requirements? Describe them below
                                (optional).
                              </p>
                            </div>
                          </div>
                          <AnimatePresence>
                            {formData.package === "Other" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <textarea
                                  rows={3}
                                  placeholder="e.g. I need 15 LED screens with a custom mounting rig..."
                                  value={formData.customSpec}
                                  onChange={(e) =>
                                    update("customSpec", e.target.value)
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-6 w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm placeholder:text-muted-foreground/50"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Budget (If package has range) ────────── */}
                  {currentKey === "budgetAmount" && (
                    <motion.div
                      key="budgetAmount"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        What's your budget?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        The package you selected has a flexible price range ({selectedPackage?.price}). Let us know your target budget.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Enter your budget (GH₵)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={formData.clientBudget}
                          onChange={(e) => update("clientBudget", e.target.value)}
                          className="w-full bg-background border border-border p-5 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 text-lg"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Event / Service Type ──────────────────── */}
                  {currentKey === "eventType" && (
                    <motion.div
                      key="eventType"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        What type of event is this?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Select the occasion for your booking.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {EVENT_SERVICES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => update("eventType", type)}
                            className={`p-4 border text-center rounded-xl transition-all duration-300 text-sm font-medium ${
                              formData.eventType === type
                                ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px] shadow-primary/20 scale-105"
                                : "border-border bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <AnimatePresence>
                        {formData.eventType === "Other" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <label className="block text-sm font-medium text-foreground mb-3 mt-4">
                              Describe your event
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Traditional Naming Ceremony..."
                              value={formData.customEventType}
                              onChange={(e) =>
                                update("customEventType", e.target.value)
                              }
                              className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ── STEP: When ─────────────────────────────────── */}
                  {currentKey === "when" && (
                    <motion.div
                      key="when"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        When is the event?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Choose the date for your event.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Event Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal p-6 bg-background border-border text-base md:text-lg hover:border-primary/50 hover:bg-card transition-all",
                                !formData.date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-5 w-5 text-primary shrink-0" />
                              {formData.date ? (
                                format(new Date(formData.date + "T00:00:00"), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 z-50 bg-card border-border shadow-2xl" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.date ? new Date(formData.date + "T00:00:00") : undefined}
                              onSelect={(d) => {
                                if (d) {
                                  const year = d.getFullYear();
                                  const month = String(d.getMonth() + 1).padStart(2, "0");
                                  const day = String(d.getDate()).padStart(2, "0");
                                  update("date", `${year}-${month}-${day}`);
                                } else {
                                  update("date", "");
                                }
                              }}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Where ────────────────────────────────── */}
                  {currentKey === "where" && (
                    <motion.div
                      key="where"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        Where is it happening?
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        Tell us the venue and expected attendance.
                      </p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Venue Name & City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kempinski Hotel, Accra"
                            value={formData.venue}
                            onChange={(e) => update("venue", e.target.value)}
                            className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Estimated Guest Count{" "}
                            <span className="text-muted-foreground/70 font-normal">
                              (optional)
                            </span>
                          </label>
                          <select
                            value={formData.guests}
                            onChange={(e) => update("guests", e.target.value)}
                            className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                          >
                            <option value="">Select range...</option>
                            <option value="Under 50">Under 50</option>
                            <option value="50 - 150">50 – 150</option>
                            <option value="150 - 300">150 – 300</option>
                            <option value="300 - 500">300 – 500</option>
                            <option value="500+">500+</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Contact Details ──────────────────────── */}
                  {currentKey === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      <h2 className="text-3xl font-serif font-medium text-foreground mb-3">
                        Your Details
                      </h2>
                      <p className="text-muted-foreground mb-10">
                        We'll use this to send you a personalised proposal.
                      </p>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Kwame Mensah"
                              value={formData.name}
                              onChange={(e) => update("name", e.target.value)}
                              className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +233 24 123 4567"
                              value={formData.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. kwame@example.com"
                            value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Special Requests / Questions{" "}
                            <span className="text-muted-foreground/70 font-normal">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Any additional details or questions for our team..."
                            value={formData.requests}
                            onChange={(e) =>
                              update("requests", e.target.value)
                            }
                            className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="rounded-full px-6 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>

                  {step < totalSteps ? (
                    <Button 
                      onClick={nextStep} 
                      disabled={!isStepValid()}
                      className="rounded-full px-8"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStepValid() || isSubmitting}
                      className="rounded-full px-8 bg-primary text-primary-foreground font-semibold hover-lift"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Sidebar Summary ──────────────────────────────────────── */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="sticky top-32 bg-card border border-border p-8 rounded-2xl glass-card shadow-sm">
                <h3 className="font-serif font-medium text-2xl text-foreground mb-6 pb-6 border-b border-border">
                  Your Booking
                </h3>
                <div className="space-y-6 text-sm">
                  {formData.bookingType && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        Booking Type
                      </div>
                      <div className="text-foreground font-semibold text-base">
                        {formData.bookingType}
                      </div>
                    </div>
                  )}

                  {formData.subType && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        Service
                      </div>
                      <div className="text-foreground font-semibold text-base">
                        {formData.subType}
                      </div>
                    </div>
                  )}

                  {formData.package && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        {formData.subType === "Live Event"
                          ? "Coverage"
                          : "Package"}
                      </div>
                      <div className="text-primary font-semibold text-base">
                        {formData.package === "Other"
                          ? "Custom"
                          : formData.package}
                      </div>
                    </div>
                  )}

                  {formData.clientBudget && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        Budget
                      </div>
                      <div className="text-foreground font-semibold text-base">
                        GH₵{formData.clientBudget}
                      </div>
                    </div>
                  )}

                  {formData.eventType && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        Event
                      </div>
                      <div className="text-foreground font-semibold text-base">
                        {formData.eventType === "Other"
                          ? formData.customEventType || "Other"
                          : formData.eventType}
                      </div>
                    </div>
                  )}

                  {formData.date && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        When
                      </div>
                      <div className="text-foreground font-semibold text-base">
                        {format(new Date(formData.date + "T00:00:00"), "PPP")}
                      </div>
                    </div>
                  )}

                  {formData.venue && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-medium">
                        Where
                      </div>
                      <div className="text-foreground font-semibold text-base leading-relaxed">
                        {formData.venue}
                      </div>
                    </div>
                  )}
                  
                  {!formData.bookingType && (
                    <div className="text-muted-foreground/50 text-center py-8 border border-dashed border-border rounded-xl">
                      Make a selection to build your quote
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
