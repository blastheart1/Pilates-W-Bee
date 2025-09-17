"use client"

import { useState } from "react"
import { Users, Activity, Target, Smartphone, Watch } from "lucide-react"
import Overlay from "../components/ui/overlay"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import EnhancedButton from "../components/ui/enhanced-button"

interface EnrollNowFormProps {
  enrollOverlay: boolean
  setEnrollOverlay: (open: boolean) => void
}

export default function EnrollNowForm({
  enrollOverlay,
  setEnrollOverlay,
}: EnrollNowFormProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Track conversion for analytics
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
  window.gtag("event", "form_submit", {
    event_category: "engagement",
    event_label: "enrollment_form",
  })
}

    alert(
      "Thank you for enrolling! We'll contact you within 24 hours to schedule your complimentary consultation."
    )

    setLoading(false)
    setEnrollOverlay(false)
  }

  return (
    <Overlay
      isOpen={enrollOverlay}
      onClose={() => setEnrollOverlay(false)}
      title="Welcome to PWB"
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Begin your wellness journey with our comprehensive pre-assessment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-gray-900">
          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Users className="mr-2 text-pink-600" size={20} />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="font-medium">
                  First Name *
                </Label>
                <Input id="firstName" name="firstName" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName" className="font-medium">
                  Last Name *
                </Label>
                <Input id="lastName" name="lastName" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">
                  Email Address *
                </Label>
                <Input type="email" id="email" name="email" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone" className="font-medium">
                  Phone Number *
                </Label>
                <Input type="tel" id="phone" name="phone" required className="mt-1" />
              </div>
            </div>
          </div>

          {/* Health & Fitness Assessment */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Activity className="mr-2 text-pink-600" size={20} />
              Health & Fitness Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="experience" className="font-medium">
                  Pilates Experience *
                </Label>
                <select
                  id="experience"
                  name="experience"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                  required
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Complete Beginner</option>
                  <option value="some">Some Experience (1-6 months)</option>
                  <option value="intermediate">Intermediate (6+ months)</option>
                  <option value="advanced">Advanced (2+ years)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fitnessLevel" className="font-medium">
                  Overall Fitness Level *
                </Label>
                <select
                  id="fitnessLevel"
                  name="fitnessLevel"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                  required
                >
                  <option value="">Select level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly-active">Lightly Active</option>
                  <option value="moderately-active">Moderately Active</option>
                  <option value="very-active">Very Active</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="healthConditions" className="font-medium">
                Health Conditions & Injuries
              </Label>
              <Textarea
                id="healthConditions"
                name="healthConditions"
                rows={3}
                placeholder="Please list any current or past injuries, surgeries, chronic conditions, or physical limitations we should be aware of..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Goals & Wearable Integration */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Target className="mr-2 text-pink-600" size={20} />
              Goals & Tracking Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goals" className="font-medium">
                  Primary Fitness Goals *
                </Label>
                <Textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  placeholder="What do you hope to achieve? (e.g., improve flexibility, build core strength, reduce stress, lose weight, recover from injury, etc.)"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-medium">
                  Do you use any fitness tracking devices?
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" name="wearables" value="fitbit" className="mr-2" />
                    <Smartphone size={16} className="mr-1" />
                    Fitbit
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="wearables" value="apple-watch" className="mr-2" />
                    <Watch size={16} className="mr-1" />
                    Apple Watch
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="wearables" value="garmin" className="mr-2" />
                    <Activity size={16} className="mr-1" />
                    Garmin
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="wearables" value="other" className="mr-2" />
                    Other Device
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <EnhancedButton
              type="submit"
              loading={loading}
              className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white text-lg py-4 px-12 rounded-lg font-medium"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Complete Pre-Assessment & Schedule Consultation"}
            </EnhancedButton>
            <p className="text-sm text-gray-600 mt-3">
              We'll review your information and contact you within 24 hours to schedule your complimentary consultation
            </p>
          </div>
        </form>
      </div>
    </Overlay>
  )
}
