"use client"

import React from "react"
import { Award, Users, Heart, Instagram } from "lucide-react"
import OwnerInstagramFeed from "./OwnerInstagramFeed"

export default function MeetBee() {
  return (
    <section id="meet-bee" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-light mb-16 tracking-widest text-center uppercase">
          Meet Bee
        </h2>

        {/* Bee Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://i.pinimg.com/736x/d6/b8/cf/d6b8cf6cf5ca2195fad2e1114d976c53.jpg"
              alt="Bee - Certified Pilates Instructor"
              className="w-full h-[600px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <Award className="text-pink-600" size={32} />
              <h3 className="text-2xl font-light uppercase tracking-wider">
                Certified Professional
              </h3>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Bee is a Certified BASI Pilates Instructor and a board certified
              Nutritionist Dietitian (RND) with a passion for mindful movement
              and sustainable wellness. Her unique approach blends the
              strength and precision of Pilates with the science of nutrition
              to help you achieve lasting results from the inside out.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              By combining movement and proper nourishment, Bee empowers you
              to feel stronger, more energized, and fully supported in your
              wellness journey. Whether you're looking to improve posture,
              build core strength, or make healthier lifestyle choices, Bee is
              here to guide you with clarity, care, and a whole lot of good
              energy.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="mx-auto mb-2 text-pink-600" size={24} />
                <div className="font-semibold">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Heart className="mx-auto mb-2 text-pink-600" size={24} />
                <div className="font-semibold">8 Years</div>
                <div className="text-sm text-gray-600">Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Feed Section */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Instagram className="text-pink-600" size={28} />
              <h3 className="text-3xl font-light uppercase tracking-wider">
                Follow the Journey
              </h3>
            </div>
            <p className="text-gray-600">
              Get daily inspiration and wellness tips on Instagram
            </p>
            <a
              href="https://instagram.com/the_hapi_bee/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-pink-600 hover:text-pink-700 font-medium"
            >
              @the_hapi_bee
            </a>
          </div>

          {/* Client-side Instagram Feed */}
          <div className="w-full relative">
            <OwnerInstagramFeed />
          </div>
        </div>
      </div>
    </section>
  )
}
