"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CareersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted by ${name}. We will contact you soon.`);
    // Here you would handle the application logic, e.g., API call
  };

  return (
    <main className="py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 text-center">Careers Application</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="name">Full Name</Label>
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="resume">Resume (Paste text)</Label>
          <Textarea
            id="resume"
            placeholder="Paste your resume here"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={6}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Additional Message</Label>
          <Textarea
            id="message"
            placeholder="Any additional information"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white w-full">
          Submit Application
        </Button>
      </form>
    </main>
  );
}
