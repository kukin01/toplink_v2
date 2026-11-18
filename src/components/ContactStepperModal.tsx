
"use client";

import { useState, type ReactElement } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services as serviceOptions } from "@/lib/services";

const SERVICES = serviceOptions.map(({ slug, service, description }) => ({
  id: slug,
  name: service,
}));

const CLIENT_TYPES = [
  "Startup / Founder",
  "Small or medium business",
  "Established company",
  "Individual / Personal project",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

const TIMELINES = [
  "Immediately",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "Within 3–6 months",
  "Just exploring options",
];

const PROJECT_STATUSES = [
  "Starting from scratch",
  "I have an existing website or product",
  "I want to improve an existing product",
  "I want to rebuild an existing product",
  "Still developing my idea",
];

const CONTACT_METHODS = [
  "Email",
  "Phone call",
  "WhatsApp",
];

type FormData = {
  fullName: string;
  company: string;
  email: string;
  clientType: string;
  services: string[];
  projectIdea: string;
  budget: string;
  timeline: string;
  projectStatus: string;
  phone: string;
  contactMethod: string;
  additionalInfo: string;
};

type ContactStepperModalProps = {
  onSubmit?: (data: FormData) => void | Promise<void>;
  trigger?: ReactElement;
};

const initialFormData: FormData = {
  fullName: "",
  company: "",
  email: "",
  clientType: "",
  services: [],
  projectIdea: "",
  budget: "",
  timeline: "",
  projectStatus: "",
  phone: "",
  contactMethod: "",
  additionalInfo: "",
};

function ChoiceCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#01034F] bg-[#01034F] text-white shadow-md"
          : "border-gray-200 bg-white text-gray-800 hover:border-[#01034F]/50 hover:bg-gray-50"
      }`}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold">
          {label}
        </span>

        {description && (
          <span
            className={`mt-1 block text-xs ${
              selected ? "text-white/70" : "text-gray-500"
            }`}
          >
            {description}
          </span>
        )}
      </span>

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white text-[#01034F]"
            : "border-gray-300"
        }`}
      >
        {selected && <Check size={13} strokeWidth={3} />}
      </span>
    </button>
  );
}

export default function ContactStepperModal({
  onSubmit,
  trigger,
}: ContactStepperModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service],
    }));
    setError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.fullName.trim() ||
        !formData.email.trim() ||
        !formData.clientType
      ) {
        setError("Please complete all required fields.");
        return false;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError("Please enter a valid email address.");
        return false;
      }
    }

    if (step === 2 && formData.services.length === 0) {
      setError("Please select at least one service.");
      return false;
    }

    if (
      step === 3 &&
      (!formData.projectIdea.trim() ||
        !formData.budget ||
        !formData.timeline ||
        !formData.projectStatus)
    ) {
      setError("Please complete the required project details.");
      return false;
    }

    if (
      step === 4 &&
      (!formData.phone.trim() || !formData.contactMethod)
    ) {
      setError("Please provide your phone number and preferred contact method.");
      return false;
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    if (!onSubmit) {
      setError("Inquiry submission is not configured yet. Please contact us directly.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(formData);
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setFormData(initialFormData);
    setError("");
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) resetForm();
  };

  const steps = [
    "About You",
    "What You Need",
    "Your Project",
    "Let's Connect",
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button className="bg-[#01034F] px-7 py-6 text-white hover:bg-[#01034F]/90">
              Start a project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )
        }
      />

      <DialogContent
        className="
          !flex
          !flex-col
          !w-[95vw]
          !max-w-2xl
          h-[92vh]
          max-h-[92vh]
          overflow-hidden
          rounded-2xl
          border border-gray-100
          bg-white
          p-0
          text-gray-900
          shadow-2xl
          text-karla
        "
      >
        {!submitted ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="shrink-0 border-b border-gray-100 px-6 pb-6 pt-7 sm:px-9 sm:pt-9">

              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-tight">
                    Let's Connect
                  </span>
                </div>

                <span className="text-xs font-medium text-gray-400">
                  STEP {step} OF {totalSteps}
                </span>
              </div>

              <div className="mb-4 flex gap-2">
                {steps.map((item, index) => (
                  <div
                    key={item}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        index < step
                          ? "bg-[#01034F]"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                {steps.map((item, index) => (
                  <span
                    key={item}
                    className={`text-xs font-medium text-karla ${
                      step === index + 1
                        ? "text-[#01034F]"
                        : index + 1 < step
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-2 sm:px-9 sm:py-3">

              {step === 1 && (
                <div className="space-y-7">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-inter uppercase tracking-[0.18em] text-[#01034F]">
                      First things first
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-inter sm:text-3xl">
                      Let's get to know you.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500 text-karla">
                      Tell us a little about yourself and your business.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full name *
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">
                        Business / Company name
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) =>
                          updateField("company", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">
                        Business email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Which best describes you? *</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CLIENT_TYPES.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={formData.clientType === item}
                          onClick={() =>
                            updateField("clientType", item)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-7">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#01034F]">
                      Your needs
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      What can we help you build?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Select the services you're interested in.
                      You can choose more than one.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {SERVICES.map((service) => (
                      <ChoiceCard
                        key={service.id}
                        label={service.name}
                        selected={formData.services.includes(service.name)}
                        onClick={() => toggleService(service.name)}
                      />
                    ))}
                  </div>

                  {SERVICES.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                      Add your services to the SERVICES array in this component.
                    </div>
                  )}

                  <p className="text-xs text-gray-400">
                    You can select multiple services.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-7">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#01034F]">
                      Your vision
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      Tell us about your idea.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      We would love to understand what you're envisioning
                      and how we can bring it to life.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectIdea">
                      Describe your business idea or project *
                    </Label>
                    <Textarea
                      id="projectIdea"
                      placeholder="Tell us about your business, the idea you have in mind, what you want to build, who it is for, and what you hope to achieve..."
                      className="min-h-36 resize-y"
                      value={formData.projectIdea}
                      onChange={(e) =>
                        updateField("projectIdea", e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-400">
                      Don't worry if your idea is still taking shape.
                      We'd love to hear about it.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>What's your estimated project budget? *</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {BUDGETS.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={formData.budget === item}
                          onClick={() =>
                            updateField("budget", item)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>When would you like to get started? *</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {TIMELINES.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={formData.timeline === item}
                          onClick={() =>
                            updateField("timeline", item)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Where are you with your project? *</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PROJECT_STATUSES.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={formData.projectStatus === item}
                          onClick={() =>
                            updateField("projectStatus", item)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-7">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#01034F]">
                      One last thing
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      Let's make it happen.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Share your contact details so we can get back to you.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone / WhatsApp number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+250 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>How would you prefer us to contact you? *</Label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {CONTACT_METHODS.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={formData.contactMethod === item}
                          onClick={() =>
                            updateField("contactMethod", item)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">
                      Anything else we should know? (Optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Additional details, reference links, questions or anything else you'd like to share..."
                      className="min-h-28"
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        updateField("additionalInfo", e.target.value)
                      }
                    />
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-[#01034F]"
                        size={19}
                      />
                      <p className="text-xs leading-5 text-gray-500">
                        Your information will only be used to review
                        your inquiry and contact you about your project.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <div className="mt-9 flex items-center justify-between gap-4 border-t border-gray-100 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="gap-2 bg-[#01034F] px-6 text-white hover:bg-[#01034F]/90"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2 bg-[#01034F] px-6 text-white hover:bg-[#01034F]/90"
                  >
                    {isSubmitting ? "Submitting..." : "Submit inquiry"}
                    <ArrowRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-16 text-center sm:px-12">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#01034F]/10">
              <CheckCircle2
                size={40}
                className="text-[#01034F]"
              />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#01034F]">
              Inquiry received
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Thank you for reaching out!
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
              We've received your project inquiry.
              We're excited to learn more about your vision
              and explore how Toplink Digital can help bring it to life.
            </p>

            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-8 bg-[#01034F] px-8 text-white hover:bg-[#01034F]/90"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
