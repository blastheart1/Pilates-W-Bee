// BookingComponents.tsx
"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Calendar, Repeat, Clock, X } from "lucide-react"

///////////////////////////
// Types
///////////////////////////

interface CalendarDay {
  day: number
  date: Date
  isDisabled: boolean
  isSelected: boolean
  isToday: boolean
}

interface CustomCalendarProps {
  selectedDate?: Date
  onSelect: (date: Date) => void
  disabled?: (date: Date) => boolean
}

interface TimeSlot {
  time: string
  instructor: string
  location: string
  available: boolean
  waitlist: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

///////////////////////////
// Custom Calendar Component
///////////////////////////

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onSelect,
  disabled,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date())

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const monthNames = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ]
  const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const generateCalendarDays = (): Array<CalendarDay | null> => {
    const days: Array<CalendarDay | null> = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    // Empty slots for first week
    for (let i = 0; i < firstDay; i++) days.push(null)

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isDisabledFlag = disabled ? disabled(date) : false
      const isSelectedFlag = selectedDate ? date.toDateString() === selectedDate.toDateString() : false
      const isTodayFlag = date.toDateString() === new Date().toDateString()
      days.push({
        day,
        date,
        isDisabled: isDisabledFlag,
        isSelected: isSelectedFlag,
        isToday: isTodayFlag,
      })
    }

    return days
  }

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const handleDateClick = (dateObj: CalendarDay | null) => {
    if (dateObj && !dateObj.isDisabled) onSelect(dateObj.date)
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="bg-white border rounded-lg p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dateObj, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all
              ${
                !dateObj
                  ? ""
                  : dateObj.isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : dateObj.isSelected
                  ? "bg-pink-600 text-white font-semibold"
                  : dateObj.isToday
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            onClick={() => handleDateClick(dateObj)}
          >
            {dateObj ? dateObj.day : ""}
          </div>
        ))}
      </div>
    </div>
  )
}

///////////////////////////
// Booking Modal Component
///////////////////////////

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [recurring, setRecurring] = useState<"none" | "weekly" | "monthly">("none")

  const availableSlots: TimeSlot[] = [
    { time: "9:00 AM - 10:30 AM", instructor: "Sarah Johnson", location: "Studio A", available: true, waitlist: 0 },
    { time: "11:00 AM - 12:30 PM", instructor: "Mike Chen", location: "Studio B", available: false, waitlist: 3 },
    { time: "2:00 PM - 3:30 PM", instructor: "Emily Rodriguez", location: "Studio A", available: true, waitlist: 0 },
    { time: "6:00 PM - 7:30 PM", instructor: "David Kim", location: "Studio C", available: true, waitlist: 0 },
  ]

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-4xl max-h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-y-auto relative">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-2xl font-bold">Advanced Booking System</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Calendar className="mr-2 text-pink-600" size={20} />Select Date
              </h3>
              <CustomCalendar
                selectedDate={selectedDate || undefined}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center">
                <Repeat className="mr-2 text-blue-600" size={16} />Recurring Booking Options
              </h4>
              {[
                { label: "One-time booking", value: "none" },
                { label: "Same time weekly (4 weeks)", value: "weekly" },
                { label: "Same time monthly (3 months)", value: "monthly" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recurring"
                    value={opt.value}
                    checked={recurring === opt.value}
                    onChange={(e) => setRecurring(e.target.value as "none" | "weekly" | "monthly")}
                    className="mr-2"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Clock className="mr-2 text-pink-600" size={20} />Available Time Slots
              </h3>
              {selectedDate ? (
                availableSlots.map((slot, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      slot.available
                        ? "border-gray-200 hover:border-pink-600 hover:bg-pink-50"
                        : "border-orange-200 bg-orange-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-lg">{slot.time}</div>
                        <div className="text-sm text-gray-600">with {slot.instructor}</div>
                        <div className="text-sm text-gray-500">{slot.location}</div>
                      </div>
                      <div className="text-right">
                        {slot.available ? (
                          <span className="text-green-600 font-medium">Available</span>
                        ) : (
                          <div className="text-center">
                            <span className="text-orange-600 font-medium block">Full</span>
                            <button className="text-xs text-blue-600 hover:underline mt-1">
                              Join Waitlist ({slot.waitlist})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Please select a date to view available time slots
                </p>
              )}
            </div>

            <button
              className={`w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-4 rounded-lg font-medium transition-colors ${
                !selectedDate ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedDate}
              onClick={() => {
                alert("Class booked successfully!")
                onClose()
              }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default BookingModal
