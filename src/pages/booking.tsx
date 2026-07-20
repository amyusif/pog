import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

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
      case "details":     return !!formData.name && !!formData.email;
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
        <section className="pt-40 pb-32 bg-black min-h-[80vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-xl mx-auto px-6"
          >
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4">
              Request Received
            </h1>
            <p className="text-white/60 text-lg mb-8">
              Thank you for choosing Powers of Grace. Our team will review your
              request and get back to you within 24 hours with a custom proposal.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
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
      <section className="pt-32 pb-12 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Make a Booking
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Fill out the details below to check our availability and receive a
            customised quote for your event.
          </p>
        </div>
      </section>

      <section className="py-12 bg-black min-h-[60vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12">
            {/* ── Form Column ─────────────────────────────────────────── */}
            <div className="flex-1">
              {/* Progress bar */}
              <div className="mb-12">
                <div className="flex justify-between mb-3">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                    (num) => (
                      <div
                        key={num}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                          step === num
                            ? "border-primary text-primary"
                            : step > num
                            ? "bg-primary border-primary text-black"
                            : "border-white/20 text-white/30"
                        }`}
                      >
                        {step > num ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          num
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${((step - 1) / (totalSteps - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Step content card */}
              <div className="bg-zinc-950 border border-white/10 p-8 rounded-sm shadow-2xl">
                <AnimatePresence mode="wait">
                  {/* ── STEP: Booking Type ─────────────────────────── */}
                  {currentKey === "bookingType" && (
                    <motion.div
                      key="bookingType"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        What would you like to book?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Choose the type of service you need.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className={`p-6 border text-left rounded-sm transition-all ${
                              formData.bookingType === opt.id
                                ? "border-primary bg-primary/10"
                                : "border-white/10 text-white/70 hover:border-white/30"
                            }`}
                          >
                            <p
                              className={`font-bold text-lg ${
                                formData.bookingType === opt.id
                                  ? "text-primary"
                                  : "text-white"
                              }`}
                            >
                              {opt.id}
                            </p>
                            <p className="text-sm mt-1 text-white/50">
                              {opt.sub}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Sub-type (Live Band only) ───────────── */}
                  {currentKey === "subType" && (
                    <motion.div
                      key="subType"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        Which Live Band service?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Select the specific type of booking you need.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className={`p-6 border text-left rounded-sm transition-all ${
                              formData.subType === opt.id
                                ? "border-primary bg-primary/10"
                                : "border-white/10 text-white/70 hover:border-white/30"
                            }`}
                          >
                            <p
                              className={`font-bold text-base ${
                                formData.subType === opt.id
                                  ? "text-primary"
                                  : "text-white"
                              }`}
                            >
                              {opt.id}
                            </p>
                            <p className="text-sm mt-1 text-white/50">
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Package / Location ───────────────────── */}
                  {currentKey === "package" && (
                    <motion.div
                      key="package"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        {packageStepTitle()}
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Choose the option that best fits your needs.
                      </p>
                      <div className="space-y-4">
                        {/* Regular options */}
                        {packageOptions.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => update("package", opt.id)}
                            className={`p-6 border rounded-sm cursor-pointer transition-all flex items-center gap-4 ${
                              formData.package === opt.id
                                ? "border-primary bg-primary/10"
                                : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                formData.package === opt.id
                                  ? "border-primary"
                                  : "border-white/30"
                              }`}
                            >
                              {formData.package === opt.id && (
                                <div className="w-3 h-3 bg-primary rounded-full" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-4">
                                <h3
                                  className={`font-bold text-base ${
                                    formData.package === opt.id
                                      ? "text-primary"
                                      : "text-white"
                                  }`}
                                >
                                  {opt.label}
                                </h3>
                                <span
                                  className={`text-sm font-bold shrink-0 ${
                                    formData.package === opt.id
                                      ? "text-primary"
                                      : "text-white/60"
                                  }`}
                                >
                                  {opt.price}
                                </span>
                              </div>
                              <p className="text-sm text-white/50 mt-1">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* Other / Custom option */}
                        <div
                          onClick={() => update("package", "Other")}
                          className={`p-6 border rounded-sm cursor-pointer transition-all ${
                            formData.package === "Other"
                              ? "border-primary bg-primary/10"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                formData.package === "Other"
                                  ? "border-primary"
                                  : "border-white/30"
                              }`}
                            >
                              {formData.package === "Other" && (
                                <div className="w-3 h-3 bg-primary rounded-full" />
                              )}
                            </div>
                            <div>
                              <h3
                                className={`font-bold text-base ${
                                  formData.package === "Other"
                                    ? "text-primary"
                                    : "text-white"
                                }`}
                              >
                                Other / Custom
                              </h3>
                              <p className="text-sm text-white/50 mt-1">
                                Have specific requirements? Describe them below
                                (optional).
                              </p>
                            </div>
                          </div>
                          {formData.package === "Other" && (
                            <textarea
                              rows={3}
                              placeholder="e.g. I need 15 LED screens with a custom mounting rig..."
                              value={formData.customSpec}
                              onChange={(e) =>
                                update("customSpec", e.target.value)
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="mt-4 w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none resize-none text-sm"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Budget (If package has range) ────────── */}
                  {currentKey === "budgetAmount" && (
                    <motion.div
                      key="budgetAmount"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        What's your budget?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        The package you selected has a flexible price range ({selectedPackage?.price}). Let us know your target budget.
                      </p>
                      <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                          Enter your budget (GH₵)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={formData.clientBudget}
                          onChange={(e) => update("clientBudget", e.target.value)}
                          className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Event / Service Type ──────────────────── */}
                  {currentKey === "eventType" && (
                    <motion.div
                      key="eventType"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        What type of event is this?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Select the occasion for your booking.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        {EVENT_SERVICES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => update("eventType", type)}
                            className={`p-4 border text-left rounded-sm transition-all text-sm ${
                              formData.eventType === type
                                ? "border-primary bg-primary/10 text-primary font-bold"
                                : "border-white/10 text-white/70 hover:border-white/30"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {formData.eventType === "Other" && (
                        <div className="mt-2">
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Describe your event
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Traditional Naming Ceremony..."
                            value={formData.customEventType}
                            onChange={(e) =>
                              update("customEventType", e.target.value)
                            }
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ── STEP: When ─────────────────────────────────── */}
                  {currentKey === "when" && (
                    <motion.div
                      key="when"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        When is the event?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Choose the date and estimated start time.
                      </p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => update("date", e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Estimated Start Time{" "}
                            <span className="text-white/30 font-normal">
                              (optional)
                            </span>
                          </label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => update("time", e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP: Where ────────────────────────────────── */}
                  {currentKey === "where" && (
                    <motion.div
                      key="where"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        Where is it happening?
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        Tell us the venue and expected attendance.
                      </p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Venue Name & City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kempinski Hotel, Accra"
                            value={formData.venue}
                            onChange={(e) => update("venue", e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Estimated Guest Count{" "}
                            <span className="text-white/30 font-normal">
                              (optional)
                            </span>
                          </label>
                          <select
                            value={formData.guests}
                            onChange={(e) => update("guests", e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        Your Details
                      </h2>
                      <p className="text-white/40 text-sm mb-8">
                        We'll use this to send you a personalised proposal.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Kwame Mensah"
                              value={formData.name}
                              onChange={(e) => update("name", e.target.value)}
                              className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +233 24 123 4567"
                              value={formData.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. kwame@example.com"
                            value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="w-full bg-black border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-white/70 mb-2">
                            Special Requests / Questions{" "}
                            <span className="text-white/30 font-normal">
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

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="text-white/60 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>

                  {step < totalSteps ? (
                    <Button onClick={nextStep} disabled={!isStepValid()}>
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStepValid() || isSubmitting}
                      className="bg-primary text-black font-bold"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Sidebar Summary ──────────────────────────────────────── */}
            <div className="w-full md:w-80 shrink-0">
              <div className="sticky top-32 bg-zinc-950 border border-white/10 p-6 rounded-sm">
                <h3 className="font-serif font-bold text-xl text-white mb-6 pb-4 border-b border-white/10">
                  Your Booking
                </h3>
                <div className="space-y-4 text-sm">
                  {formData.bookingType && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        Booking Type
                      </div>
                      <div className="text-white font-medium">
                        {formData.bookingType}
                      </div>
                    </div>
                  )}

                  {formData.subType && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        Service
                      </div>
                      <div className="text-white font-medium">
                        {formData.subType}
                      </div>
                    </div>
                  )}

                  {formData.package && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        {formData.subType === "Live Event"
                          ? "Coverage"
                          : "Package"}
                      </div>
                      <div className="text-primary font-bold">
                        {formData.package === "Other"
                          ? "Custom"
                          : formData.package}
                      </div>
                    </div>
                  )}

                  {formData.clientBudget && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        Budget
                      </div>
                      <div className="text-white font-medium">
                        GH₵{formData.clientBudget}
                      </div>
                    </div>
                  )}

                  {formData.eventType && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        Event
                      </div>
                      <div className="text-white font-medium">
                        {formData.eventType === "Other"
                          ? formData.customEventType || "Other"
                          : formData.eventType}
                      </div>
                    </div>
                  )}

                  {(formData.date || formData.time) && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        When
                      </div>
                      <div className="text-white font-medium">
                        {formData.date}
                        {formData.time && ` at ${formData.time}`}
                      </div>
                    </div>
                  )}

                  {formData.venue && (
                    <div>
                      <div className="text-white/40 uppercase tracking-widest text-xs mb-1">
                        Where
                      </div>
                      <div className="text-white font-medium">
                        {formData.venue}
                      </div>
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
