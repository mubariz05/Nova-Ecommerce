import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Truck,
  RefreshCcw,
  CreditCard,
  UserCircle2,
  Package,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  X,
  Send,
} from "lucide-react";

const CATEGORIES = [
  { icon: Truck, label: "Orders & Shipping", to: "/account/orders" },
  {
    icon: RefreshCcw,
    label: "Returns & Refunds",
    to: "/support/return-exchange",
  },
  { icon: CreditCard, label: "Payments", to: "/account/checkout" },
  { icon: UserCircle2, label: "Account", to: "/account" },
  { icon: Package, label: "Products", to: "/women/dresses" },
];

const POPULAR_ARTICLES = [
  "How to track my order?",
  "What is the return policy?",
  "Accepted payment methods",
  "How to reset my password?",
  "Product warranty details",
];

const FAQS = [
  {
    question: "How long does shipping normally take?",
    answer:
      "Standard shipping typically takes 3–5 business days within the continental US. Expedited shipping options (2-day and overnight) are available at checkout. International shipping times vary by destination, generally ranging from 7–14 business days. You will receive a tracking number via email once your order has dispatched.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "You can request changes within 1 hour of placing your order by contacting our support team. Once an order enters processing, we're unable to modify the size, color, or shipping address, but you can still cancel it and place a new one.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 40 countries. Duties and taxes are calculated at checkout so there are no surprise fees on delivery. Delivery windows vary by region and are shown before you complete your purchase.",
  },
  {
    question: "How do I process a return?",
    answer:
      "Start a return from your account's Order History page within 30 days of delivery. Print the prepaid label we send you, drop the package off at any courier location, and your refund will be issued once the item is received and inspected.",
  },
];

const SUPPORT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    action: "Start Chat",
    badge: "Online Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We typically reply within 24 hours.",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon–Fri, 9am–6pm EST",
    action: "Call Support",
  },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-nova-black">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function ChatWidget({ isOpen, onClose }) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-nova-black px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            N
          </span>
          <span className="text-sm font-medium text-white">Nova Bot</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="text-white/70 transition hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="max-w-[85%] self-start rounded-xl rounded-bl-sm bg-gray-100 px-3 py-2 text-xs text-nova-black">
          Hi! How can I help you today?
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-4 pb-3">
        {["Where is my order?", "Return an item"].map((quickReply) => (
          <button
            key={quickReply}
            type="button"
            className="rounded-full border border-gray-200 px-3 py-1.5 text-left text-xs text-gray-600 transition hover:border-blue-600 hover:text-blue-600"
          >
            {quickReply}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 border-t border-gray-200 px-3 py-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Talk to a human"
          className="min-w-0 flex-1 bg-transparent text-xs text-nova-black placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-[#fafafa] pb-16">
      <div className="mx-auto w-full max-w-5xl px-6 pt-12 sm:px-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nova-black sm:text-4xl">
            How can we help?
          </h1>

          <form onSubmit={handleSearchSubmit} className="mx-auto mt-6 max-w-lg">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, topics, or issues..."
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-nova-black placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              type="button"
              onClick={() => to && navigate(to)}
              className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon size={18} />
              </span>
              <span className="text-xs font-medium text-nova-black">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 className="text-sm font-semibold text-nova-black">
              Popular Articles
            </h2>
            <ul className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
              {POPULAR_ARTICLES.map((article) => (
                <li key={article}>
                  <button
                    type="button"
                    className="block w-full px-4 py-3 text-left text-sm text-gray-600 transition hover:text-blue-600"
                  >
                    {article}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-nova-black">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() =>
                    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-lg font-semibold text-nova-black">
            Still need help?
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SUPPORT_CHANNELS.map(
              ({ icon: Icon, title, description, action, badge }) => (
                <div
                  key={title}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </span>
                  <span className="text-sm font-semibold text-nova-black">
                    {title}
                  </span>
                  {badge && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {badge}
                    </span>
                  )}
                  <p className="text-xs text-gray-500">{description}</p>
                  <button
                    type="button"
                    onClick={() => title === "Live Chat" && setChatOpen(true)}
                    className="mt-2 w-full rounded-full bg-nova-black py-2 text-xs font-medium text-white transition hover:bg-gray-800"
                  >
                    {action}
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {!chatOpen && (
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
        >
          <MessageCircle size={22} />
        </button>
      )}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
