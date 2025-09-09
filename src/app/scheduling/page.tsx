"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SchedulingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name} on ${date?.toDateString()} for ${service}`);
    // Here you would handle the booking logic, e.g., API call
  };

  return (
    <main className="py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 text-center">Schedule a Class or Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="service">Select Service</Label>
          <select
            id="service"
            className="w-full rounded-md border border-gray-300 p-2"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Choose a service</option>
            <option value="group-pilates">Group Pilates Classes</option>
            <option value="private-pilates">Private Pilates Classes</option>
            <option value="nutrition">Nutritionist & Dietetics</option>
          </select>
        </div>
        <div>
          <Label>Select Date</Label>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white w-full">
          Book Now
        </Button>
      </form>
    </main>
  );
}
