// app/page.tsx
"use client"; // Required for animations

import { useEffect, useState } from "react";
import { client } from "@sanity/lib/sanity";
import { groq } from "next-sanity";
import Image from "next/image";

const TYPING_TEXTS = [
  "Hi, I'm Jake Alfred",
  "I help men get jacked",
  "I build confidence",
  "I transform physiques",
];

export default function Home() {
  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await client.fetch(groq`*[_type == "testimonial"]{
        _id,
        clientName,
        feedback,
        "imageUrl": clientImage.asset->url
      }`);
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  // Typing animation
  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex % TYPING_TEXTS.length];
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting && typingText === currentText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setTextIndex(textIndex + 1);
    } else {
      const timeout = setTimeout(() => {
        setTypingText(
          isDeleting
            ? currentText.substring(0, typingText.length - 1)
            : currentText.substring(0, typingText.length + 1)
        );
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [typingText, textIndex, isDeleting]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/gym-bg.webp"
            alt="Gym background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 h-20">
            <span className="text-yellow-400">{typingText}</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Certified fitness coach specializing in physique transformation and
            confidence building
          </p>

          <div className="flex gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Book Consultation
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full transition-all">
              My Programs
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/coach.jpg"
                alt="Jake Alfred"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">My Philosophy</h2>
            <p className="text-lg mb-6">
              With over 5 years of coaching experience, I've developed a proven
              system that combines science-based training with psychological
              techniques to help men achieve their dream physiques.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="bg-yellow-500 rounded-full p-1 mr-3">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Personalized training programs
              </li>
              {/* Add more list items */}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Success Stories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {testimonial.imageUrl && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg">
                    {testimonial.clientName}
                  </h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform?</h2>
          <p className="text-xl mb-8">
            Join my 12-week transformation program and become the best version
            of yourself
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  );
}
