"use client"

import React, { useState, useEffect } from "react";
import Overlay from "../components/ui/overlay"
import {Button }from "../components/ui/button"
import {
  BarChart3,
  CalendarIcon,
  TrendingUpIcon,
  Crown,
  Users,
  Activity,
  Star ,
  Gift,
  Trophy,
  Flame,
  Share,
} from "lucide-react"
interface ClassData {
  type: string
  instructor: string
  date: string
  time: string
  rating?: number
}

interface GoalData {
  name: string
  progress: number
  target: string
}

interface ReferralData {
  name: string
  joined: string
  points: number
}

interface MemberData {
  classesRemaining: number
  classesAttended: number
  loyaltyPoints: number
  nextReward: number
  upcomingClasses: ClassData[]
  classHistory: ClassData[]
  goals: GoalData[]
  referrals: ReferralData[] // <-- array of ReferralData, not hardcoded values
}

interface MemberPortalOverlayProps {
  memberPortalOverlay: boolean
  setMemberPortalOverlay: (open: boolean) => void
  currentPortalTab: string
  setCurrentPortalTab: (tab: string) => void
  setAnalyticsOverlay: (open: boolean) => void
  setBookingOverlay: (open: boolean) => void
  memberData: MemberData
}


 // Member Data (mock)
  const [memberData, setMemberData] = useState({
    name: "Sarah Johnson",
    memberSince: "January 2024",
    membershipType: "Premium",
    classesAttended: 24,
    classesRemaining: 4,
    loyaltyPoints: 2850,
    nextReward: 3000,
    upcomingClasses: [
      {
        date: "2024-03-20",
        time: "9:00 AM",
        instructor: "Bee",
        type: "Group Pilates",
      },
      {
        date: "2024-03-22",
        time: "11:00 AM",
        instructor: "Sarah",
        type: "Private Session",
      },
    ],
    classHistory: [
      {
        date: "2024-03-15",
        instructor: "Bee",
        type: "Group Pilates",
        rating: 5,
      },
      { date: "2024-03-13", instructor: "Mike", type: "Core Focus", rating: 4 },
      { date: "2024-03-11", instructor: "Bee", type: "Flexibility", rating: 5 },
    ],
    healthMetrics: {
      weight: 135,
      bodyFat: 18,
      muscleMass: 45,
      flexibility: 78,
      strength: 85,
      endurance: 72,
    },
    goals: [
      { name: "Lose 10 lbs", progress: 70, target: "June 2024" },
      { name: "Touch toes", progress: 85, target: "April 2024" },
      { name: "20 push-ups", progress: 60, target: "May 2024" },
    ],
  });
export default function MemberPortalOverlay({
  memberPortalOverlay,
  setMemberPortalOverlay,
  currentPortalTab,
  setCurrentPortalTab,
  setAnalyticsOverlay,
  setBookingOverlay,
  memberData,
}: MemberPortalOverlayProps) {
  return (
    <Overlay
      isOpen={memberPortalOverlay}
      onClose={() => setMemberPortalOverlay(false)}
      title="Member Portal"
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden bg-gray-50 border-b border-gray-200">
          <div className="flex overflow-x-auto p-2 space-x-1">
            {[
              { key: "dashboard", icon: BarChart3, label: "Dashboard" },
              { key: "bookings", icon: CalendarIcon, label: "Bookings" },
              { key: "progress", icon: TrendingUpIcon, label: "Progress" },
              { key: "loyalty", icon: Crown, label: "Loyalty" },
              { key: "referrals", icon: Users, label: "Referrals" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setCurrentPortalTab(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] touch-target ${
                  currentPortalTab === key
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="inline mr-1" size={14} />
                {label}
              </button>
            ))}
            <button
              onClick={() => setAnalyticsOverlay(true)}
              className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 min-w-[100px] touch-target"
            >
              <Activity className="inline mr-1" size={14} />
              Analytics
            </button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-gray-50 p-6 border-r border-gray-200">
          <div className="space-y-2">
            {[
              { key: "dashboard", icon: BarChart3, label: "Dashboard" },
              { key: "bookings", icon: CalendarIcon, label: "My Bookings" },
              { key: "progress", icon: TrendingUpIcon, label: "Progress Tracking" },
              { key: "loyalty", icon: Crown, label: "Loyalty Rewards" },
              { key: "referrals", icon: Users, label: "Referral Program" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setCurrentPortalTab(key)}
                className={`w-full text-left p-3 rounded-lg transition-colors touch-target ${
                  currentPortalTab === key ? "bg-pink-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                <Icon className="inline mr-2" size={16} />
                {label}
              </button>
            ))}
            <button
              onClick={() => setAnalyticsOverlay(true)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-200 touch-target"
            >
              <Activity className="inline mr-2" size={16} />
              Advanced Analytics
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Dashboard Tab */}
          {currentPortalTab === "dashboard" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-lg flex-shrink-0">
                      <CalendarIcon className="text-pink-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-bold">{memberData.classesRemaining}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Classes Remaining</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Trophy className="text-blue-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-bold">{memberData.loyaltyPoints}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Loyalty Points</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Flame className="text-green-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-bold">{memberData.classesAttended}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Classes Attended</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Classes and Goals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Upcoming Classes */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold mb-4 text-base sm:text-lg">Upcoming Classes</h3>
                  <div className="space-y-3">
                    {memberData.upcomingClasses.map((class_, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-sm sm:text-base">{class_.type}</div>
                          <div className="text-xs sm:text-sm text-gray-600">with {class_.instructor}</div>
                        </div>
                        <div className="text-left sm:text-right text-xs sm:text-sm flex-shrink-0">
                          <div className="font-medium">{class_.date}</div>
                          <div className="text-gray-600">{class_.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Goals */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold mb-4 text-base sm:text-lg">Current Goals</h3>
                  <div className="space-y-4">
                    {memberData.goals.map((goal, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm sm:text-base truncate pr-2">{goal.name}</span>
                          <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Target: {goal.target}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {currentPortalTab === "bookings" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <h3 className="text-lg sm:text-xl font-semibold">My Bookings</h3>
                <Button
                  onClick={() => setBookingOverlay(true)}
                  className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto touch-target"
                >
                  Book New Class
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-base sm:text-lg">Upcoming Classes</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  {memberData.upcomingClasses.map((class_, index) => (
                    <div key={index} className="p-4">
                      <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                        <div className="min-w-0">
                          <div className="font-medium text-sm sm:text-base">{class_.type}</div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {class_.date} at {class_.time} with {class_.instructor}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto touch-target text-xs sm:text-sm"
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50 touch-target text-xs sm:text-sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium">Class History</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  {memberData.classHistory.map((class_: ClassData, i: number) => (
  <div key={i} className="p-4 flex justify-between items-center">
    <div>
      <div className="font-medium">{class_.type}</div>
      <div className="text-sm text-gray-600">
        {class_.date} with {class_.instructor}
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[...Array(5)].map((_, starIndex) => (
          <Star
            key={starIndex}
            size={16}
            className={starIndex < (class_.rating ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
      </div>
    </div>
  </div>
))}

                </div>
              </div>
            </div>
          )}

          {/* Loyalty Tab */}
          {currentPortalTab === "loyalty" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Loyalty Rewards</h3>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-3xl font-bold">{memberData.loyaltyPoints}</div>
                    <div className="text-purple-100">Current Points</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(memberData.loyaltyPoints / memberData.nextReward) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-purple-100 mt-1">
                      {memberData.nextReward - memberData.loyaltyPoints} points to next reward
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Available Rewards</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Free Class</div>
                        <div className="text-sm text-gray-600">1,000 points</div>
                      </div>
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Redeem</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Private Session</div>
                        <div className="text-sm text-gray-600">2,500 points</div>
                      </div>
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Redeem</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg opacity-50">
                      <div>
                        <div className="font-medium">Wellness Retreat</div>
                        <div className="text-sm text-gray-600">5,000 points</div>
                      </div>
                      <Button size="sm" disabled>Need {5000 - memberData.loyaltyPoints} more</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Earn More Points</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span>Attend a class</span><span className="font-medium text-green-600">+50 points</span></div>
                    <div className="flex justify-between items-center"><span>Complete a program</span><span className="font-medium text-green-600">+200 points</span></div>
                    <div className="flex justify-between items-center"><span>Refer a friend</span><span className="font-medium text-green-600">+500 points</span></div>
                    <div className="flex justify-between items-center"><span>Write a review</span><span className="font-medium text-green-600">+100 points</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {currentPortalTab === "referrals" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Referral Program</h3>
                <p className="text-blue-100">Share the wellness journey and earn rewards!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Your Referral Code</h4>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-pink-600">SARAH2024</div>
                    <div className="text-sm text-gray-600 mt-1">Share this code with friends</div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Share className="mr-2" size={16} /> Share Link
                  </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold mb-4">Referral Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"><Gift className="text-green-600" size={16} /></div>
                      <div><div className="font-medium">Friend gets 20% off</div><div className="text-sm text-gray-600">First month discount</div></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><Star className="text-blue-600" size={16} /></div>
                      <div><div className="font-medium">You get 500 points</div><div className="text-sm text-gray-600">When they join</div></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"><Crown className="text-purple-600" size={16} /></div>
                      <div><div className="font-medium">Free class at 5 referrals</div><div className="text-sm text-gray-600">Milestone reward</div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="font-semibold mb-4">Your Referrals ({memberData.referrals.length})</h4>
                <div className="space-y-3">
                  {memberData.referrals.map((referral, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{referral.name}</div>
                        <div className="text-sm text-gray-600">Joined {referral.joined}</div>
                      </div>
                      <div className="text-green-600 font-medium">+{referral.points} points</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  )
}
