"use client";

import { submitContactForm } from "@/Request/requests";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submit, setSubmit] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmit(true);

        try {
            await submitContactForm(formData);
            toast.success("Message sent successfully", {
                description: "We'll get back to you soon as possible.",
                duration: 5000,
            });
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            toast.error("Failed to send message", {
                description: "Please try again later or contact us directly.",
                duration: 5000,
            });
        } finally {
            setSubmit(false);
        }
    };

    return (
        <div id="contact" className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mt-20">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={18} />
                    </div>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    />
                </div>

                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={18} />
                    </div>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    />
                </div>

                <div className="relative">
                    <div className="absolute left-3 top-4 text-gray-400">
                        <MessageSquare size={18} />
                    </div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submit}
                    className="w-full bg-green text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                    {submit ? (
                        <span>Sending...</span>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <Send size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>We typically respond within 24 hours</p>
            </div>
        </div>
    );
};

export default Contact;
