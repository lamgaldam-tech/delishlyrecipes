import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen">
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Email Us
                </h3>
                <p className="text-sm text-muted-foreground">
                  hello@delishly.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-accent/10 rounded-xl p-8 text-center">
              <span className="text-4xl block mb-3">✉️</span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-muted-foreground">
                We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-5 py-3 rounded-lg bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full px-5 py-3 rounded-lg bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Your message"
                rows={5}
                required
                className="w-full px-5 py-3 rounded-lg bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                className="flex items-center py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              >
                <Send className="w-4 h-4 mr-2" /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
