import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { 
  Smartphone, 
  BarChart, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  Users,
  Brain,
  Wallet,
  Zap,
  CreditCard,
  Send,
  ArrowRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"
import QuickLinks from "@/components/QuickLinks"
import { analyticsEvents } from "@/lib/firebase"
import { saveIconAsPNG } from "@/utils/saveIcon"

// Interactive CLKK App Demo Component
function CLKKAppDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [amount, setAmount] = useState("50");
  const [recipient, setRecipient] = useState("john@paypal.com");
  const [platform, setPlatform] = useState("PayPal");
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { title: "Enter Amount", description: "Type the amount you want to send" },
    { title: "Choose Recipient", description: "Select PayPal or Venmo account" },
    { title: "Send Money", description: "Tap to send instantly" },
    { title: "Complete!", description: "Money sent successfully" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Reset demo
      setCurrentStep(0);
    }
  };

  const handlePlatformToggle = () => {
    setPlatform(platform === "PayPal" ? "Venmo" : "PayPal");
    setRecipient(platform === "PayPal" ? "@john-venmo" : "john@paypal.com");
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-xl">
      <div className="w-80 h-[600px] mx-auto bg-gray-900 rounded-3xl border-4 border-gray-600 p-6 flex flex-col relative overflow-hidden">
        {/* Phone Status Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          </div>
          <div className="text-white text-sm font-medium">9:41</div>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* App Header */}
        <div className="flex items-center justify-center mb-8">
          <Logo showText={false} className="scale-50" />
          <span className="text-white text-xl font-bold ml-2">CLKK</span>
        </div>

        {/* Demo Content */}
        <div className={`flex-grow transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold text-center">Send Money</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <label className="text-gray-400 text-sm">Amount</label>
                <div className="flex items-center mt-2">
                  <span className="text-white text-3xl font-bold">$</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-white text-3xl font-bold ml-2 outline-none flex-grow"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['10', '25', '50', '100', '200', '500'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold text-center">Choose Platform</h3>
              <div className="space-y-4">
                <button
                  onClick={handlePlatformToggle}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    platform === "PayPal" 
                      ? "border-blue-500 bg-blue-500/10" 
                      : "border-gray-600 bg-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                    <span className="text-white font-medium">PayPal</span>
                  </div>
                </button>
                <button
                  onClick={handlePlatformToggle}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    platform === "Venmo" 
                      ? "border-blue-500 bg-blue-500/10" 
                      : "border-gray-600 bg-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <span className="text-white font-medium">Venmo</span>
                  </div>
                </button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <label className="text-gray-400 text-sm">Recipient</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-transparent text-white mt-2 outline-none"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold text-center">Confirm & Send</h3>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-bold">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">To</span>
                  <span className="text-white">{recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform</span>
                  <span className="text-white">{platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fee</span>
                  <span className="text-white">$0.50</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold">${amount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold">Money Sent!</h3>
              <p className="text-gray-400">
                ${amount} sent to {recipient} via {platform}
              </p>
              <div className="text-green-400 text-sm">
                ✓ Instant transfer completed
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {currentStep === 3 ? (
              <>
                <span>Try Again</span>
              </>
            ) : (
              <>
                <span>{currentStep === 2 ? 'Send Money' : 'Continue'}</span>
                {currentStep === 2 ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </>
            )}
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Demo Description */}
      <div className="mt-6 text-center">
        <h4 className="text-white font-semibold mb-2">{steps[currentStep].title}</h4>
        <p className="text-gray-300 text-sm">{steps[currentStep].description}</p>
      </div>
    </div>
  );
}

export default function CLKKFintechLanding() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    analyticsEvents.pageView('landing_page');
  }, []);

  const handleSaveLogo = () => {
    saveIconAsPNG();
    analyticsEvents.downloadLogo();
  };

  const handleFaqClick = (index: number, question: string) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    if (expandedFaq !== index) {
      analyticsEvents.faqExpand(question);
    }
  };

  const handleFeatureClick = (featureName: string) => {
    analyticsEvents.featureClick(featureName);
  };

  const faqs = [
    {
      question: "How do CLKK transfers work?",
      answer: "CLKK-to-CLKK transfers are instant and completely free. For PayPal and Venmo, CLKK securely sends money through their official payment networks, allowing you to transfer funds directly from your CLKK wallet to any PayPal or Venmo account."
    },
    {
      question: "Are there any fees?",
      answer: "CLKK-to-CLKK transfers are always free and instant. Transfers to PayPal and Venmo accounts have standard processing fees that are clearly displayed before you confirm any transaction."
    },
    {
      question: "How fast are transfers?",
      answer: "CLKK-to-CLKK transfers are instant and free. Transfers from CLKK to PayPal and Venmo accounts are typically processed within minutes, though final availability may depend on the receiving platform's processing times."
    },
    {
      question: "How do I receive money?",
      answer: "You can receive money instantly and for free from other CLKK users. Currently, CLKK specializes in sending money to PayPal and Venmo accounts, so receiving from those platforms isn't available yet."
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Sticky Header */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-blue-400">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full max-w-7xl mx-auto px-4 py-32 mt-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold mb-8">
            <span className="shine-animation">Next-Generation Payments</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Your master wallet for seamless payments. Send money instantly to other CLKK users for free, or to any PayPal or Venmo account.
          </p>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose CLKK?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Logo, title: "Master Wallet", description: "Free instant transfers to CLKK users, plus send to PayPal and Venmo accounts" },
              { icon: Smartphone, title: "User-Friendly", description: "Intuitive mobile app for seamless payments" },
              { icon: BarChart, title: "Business Insights", description: "Advanced analytics for informed decisions" },
              { icon: Shield, title: "Secure & Compliant", description: "Bank-grade security and regulatory compliance" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-xl"
                onClick={() => handleFeatureClick(feature.title)}
              >
                {index === 0 ? (
                  <Logo showText={false} className="mb-4" />
                ) : (
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Features Section */}
      <section id="individuals" className="w-full py-20 bg-[#1a1f2d]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">For Individuals</h2>
          <p className="text-xl text-gray-300 text-center mb-16">Experience the future of personal payments</p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-[#252b3d] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Peer-to-Peer</h3>
              <p className="text-gray-300">
                Send money instantly and free to other CLKK users, or to any PayPal or Venmo account. Split bills across platforms effortlessly.
              </p>
            </div>

            <div className="bg-[#252b3d] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lightning-Fast Payments</h3>
              <p className="text-gray-300">
                Pay other CLKK users instantly with zero fees, or send to PayPal and Venmo with just a tap.
              </p>
            </div>

            <div className="bg-[#252b3d] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Universal Acceptance</h3>
              <p className="text-gray-300">
                Free transfers within CLKK's growing network, plus send to PayPal and Venmo. One wallet, unlimited reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="businesses" className="w-full py-20 bg-[#1e2532]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">For Businesses</h2>
          <p className="text-xl text-gray-300 text-center mb-16">Empower your business with AI-driven solutions</p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-[#2a3241] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Transactions</h3>
              <p className="text-gray-300">
                Protect your business with real-time AI-driven fraud detection, automatically identifying suspicious activity and blocking potential threats.
              </p>
            </div>

            <div className="bg-[#2a3241] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Forecasting</h3>
              <p className="text-gray-300">
                Unlock insights into demand and sales trends with predictive analytics powered by AI. Stay ahead with accurate, data-driven forecasts.
              </p>
            </div>

            <div className="bg-[#2a3241] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Financial Health</h3>
              <p className="text-gray-300">
                Track your business's financial pulse with real-time health scores and KPIs for smarter, faster decisions.
              </p>
            </div>

            <div className="bg-[#2a3241] p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Marketing</h3>
              <p className="text-gray-300">
                Analyze transaction data to reveal key spending patterns and optimize marketing strategies with AI-powered segmentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How CLKK Works</h2>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="w-full lg:w-1/2 space-y-4">
              {[
                "Download the CLKK app and invite friends",
                "Add funds to your CLKK wallet",
                "Send free to CLKK users or to PayPal/Venmo",
                "Enjoy instant, fee-free transfers within CLKK"
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2">
              <CLKKAppDemo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-700 rounded-lg transition-all duration-300">
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-semibold"
                  onClick={() => handleFaqClick(index, faq.question)}
                >
                  {faq.question}
                  {expandedFaq === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 pt-0 text-gray-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">Ready to Transform Your Payment Experience?</h2>
          <p className="mb-8 text-xl text-gray-200">Join the CLKK revolution - free instant transfers to friends, plus send to PayPal and Venmo from one wallet</p>
          <Link to="/signup">
            <Button className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 text-lg px-8 py-6">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="inline-block">
                <Logo className="scale-75 origin-left" />
              </div>
              <p className="text-gray-400 mt-4">Your master wallet for all payments.</p>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <QuickLinks />
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <button key={social} className="text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 CLKK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}