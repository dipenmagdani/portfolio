"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast({ title: "Message sent!", description: "I'll get back soon." });
    setLoading(false);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let’s talk</h2>
        <p className="text-white/70 mb-8">
          Have a project in mind or want to collaborate? Drop a message.
        </p>
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Your name" required className="bg-white/5" />
            <Input
              placeholder="Email"
              type="email"
              required
              className="bg-white/5"
            />
          </div>
          <Input placeholder="Subject" required className="bg-white/5" />
          <Textarea
            placeholder="Your message"
            rows={5}
            required
            className="bg-white/5"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};
