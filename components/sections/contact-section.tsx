"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, CheckCircle2, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

// 1. Zod Schema Definition
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactSection() {
  const [isSuccess, setIsSuccess] = useState(false)

  // 2. Form Hook Initialization
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const { isSubmitting } = form.formState

  // 3. Simulated Server Action
  async function onSubmit(data: ContactFormValues) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Log data (In real app, this goes to Server Action -> Resend/Nodemailer)
    console.log("Form Data Submitted:", data)

    // Show Success State
    setIsSuccess(true)
    toast.success("Message sent successfully!", {
      description: "I'll get back to you as soon as possible.",
    })
    
    // Reset form after delay (optional)
    setTimeout(() => {
      setIsSuccess(false)
      form.reset()
    }, 5000)
  }

  return (
    <section id="contact" className="contact-section section text-gray-300 relative overflow-hidden py-24">
      {/* Background Blurs and Gradients (matching About section) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="container relative z-10 px-6 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">extraordinary</span>.
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Whether you have a project in mind, need a consultation, or just want to say hi, I'm always open to discussing new ideas and opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <a href="mailto:gr.gayangabandara@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                    gr.gayangabandara@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Location</h3>
                  <p className="text-gray-400">Kandy, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-medium mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/gayangabandara"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/gayangabandara"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Smart Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-400 max-w-xs mx-auto">
                        Thanks for reaching out. I'll check my inbox and get back to you shortly.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-8 border-white/10 hover:bg-white/5"
                        onClick={() => {
                          setIsSuccess(false)
                          form.reset()
                        }}
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" className="bg-black/50 border-white/10 focus:border-purple-500/50 min-h-[50px]" {...field} />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john@example.com" className="bg-black/50 border-white/10 focus:border-purple-500/50 min-h-[50px]" {...field} />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="Project Inquiry" className="bg-black/50 border-white/10 focus:border-purple-500/50 min-h-[50px]" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell me about your project..." 
                                    className="min-h-[150px] bg-black/50 border-white/10 focus:border-purple-500/50 resize-none" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-6"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="w-4 h-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}