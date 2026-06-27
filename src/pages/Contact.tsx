import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

type ContactFormData = {
  name: string;
  phone: string;
  company: string;
  email: string;
  message: string;
};

type ContactApiResponse = {
  success?: boolean;
  message?: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5055';
const CONTACT_SUBMIT_URL = `${API_BASE_URL}/api/contact/submit`;

const getContactErrorMessage = (result: ContactApiResponse) => {
  if (result.errors?.length) {
    return result.errors.map((error) => error.message).join(' ');
  }

  return result.message || 'Unable to send your message. Please try again.';
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(CONTACT_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(getContactErrorMessage(result));
      }

      toast({
        title: 'Message sent successfully',
        description: result.message || 'Thank you for contacting us. We will get back to you shortly.',
      });

      setFormData({
        name: '',
        phone: '',
        company: '',
        email: '',
        message: ''
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send your message. Please try again.';
      setSubmitError(message);
      toast({
        title: 'Message could not be sent',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/lovable-uploads/contact-hero.jpg" alt="Contact Us - Digital Communication" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gray-900/20"></div>
          </div>


          {/* Content */}
          <div className="relative z-10 section-container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
              <span className="text-green-400">Contact</span> Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Comprehensive support solutions designed for reliability, efficiency, and scalability
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9+\-\s()]{7,20}"
                            title="Please enter a valid phone number"
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="company"
                            placeholder="Company name"
                            value={formData.company}
                            onChange={handleInputChange}
                            maxLength={120}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email id"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          minLength={10}
                          maxLength={3000}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      {submitError && (
                        <p className="text-sm text-destructive" role="alert">
                          {submitError}
                        </p>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Contact Info */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Our Location</h4>
                        <p className="text-foreground/70 leading-relaxed">
                          No.63,Third Floor,L.B.Road,<br />
                          Adyar,Chennai-600020
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Phone Number</h4>
                        <p className="text-foreground/70 leading-relaxed">
                          9444126240<br />
                          Available 24/7 for support
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Email Address</h4>
                        <p className="text-foreground/70 leading-relaxed">
                          support@bayvibedc.com<br />
                          Available for all inquiries
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;