import { useState } from "react";
import { shippingOptions } from "../../data/shippingOptions";
import subtotalOf from "../../utils/subTotalOf";
import { cartItems } from "../../data/cardItems";
import ShippingStep from "../../components/checkout/ShippingStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import ReviewStep from "../../components/checkout/ReviewStep";
import ConfirmationStep from "../../components/checkout/ConfirmationStep";

const steps = ["Shipping", "Payment", "Review"];

function StepIndicator({ currentStep }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                  isDone
                    ? "bg-nova-black text-white"
                    : isActive
                      ? "bg-nova-accent text-white"
                      : "border border-nova-border bg-white text-nova-gray",
                ].join(" ")}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span
                className={[
                  "text-[11px] font-semibold uppercase tracking-wide",
                  isActive || isDone ? "text-nova-black" : "text-nova-gray",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {stepNum < steps.length ? (
              <div
                className={[
                  "mx-3 mb-4 h-px w-16",
                  isDone ? "bg-nova-black" : "bg-nova-border",
                ].join(" ")}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function AccountPayment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [contact, setContact] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [billingSame, setBillingSame] = useState(true);
  const [saveCard, setSaveCard] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const shippingCost =
    shippingOptions.find((s) => s.id === shippingMethod)?.cost ?? 0;
  const discount = promoApplied ? subtotalOf(cartItems) * 0.15 : 0;

  const applyPromo = () => {
    if (promoCode.trim().length > 0) setPromoApplied(true);
  };

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      setOrderNumber(`NC-${Math.floor(10000 + Math.random() * 89999)}`);
      setIsPlacing(false);
      setCurrentStep(4);
    }, 900);
  };

  const handleContinueShopping = () => {
    setCurrentStep(1);
    setContact("");
    setAddress({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
    });
    setShippingMethod("standard");
    setPaymentMethod("card");
    setCard({ number: "", expiry: "", cvv: "", name: "" });
    setPromoCode("");
    setPromoApplied(false);
    setAgreeTerms(false);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {currentStep <= 3 ? <StepIndicator currentStep={currentStep} /> : null}

      {currentStep === 1 ? (
        <ShippingStep
          contact={contact}
          setContact={setContact}
          address={address}
          setAddress={setAddress}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          onContinue={() => setCurrentStep(2)}
          shippingCost={shippingCost}
          discount={discount}
        />
      ) : null}

      {currentStep === 2 ? (
        <PaymentStep
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          card={card}
          setCard={setCard}
          billingSame={billingSame}
          setBillingSame={setBillingSame}
          saveCard={saveCard}
          setSaveCard={setSaveCard}
          onBack={() => setCurrentStep(1)}
          onContinue={() => setCurrentStep(3)}
          shippingCost={shippingCost}
          discount={discount}
        />
      ) : null}

      {currentStep === 3 ? (
        <ReviewStep
          contact={contact}
          address={address}
          shippingMethod={shippingMethod}
          card={card}
          paymentMethod={paymentMethod}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          promoApplied={promoApplied}
          applyPromo={applyPromo}
          agreeTerms={agreeTerms}
          setAgreeTerms={setAgreeTerms}
          onEditShipping={() => setCurrentStep(1)}
          onEditPayment={() => setCurrentStep(2)}
          onPlaceOrder={handlePlaceOrder}
          shippingCost={shippingCost}
          discount={discount}
          isPlacing={isPlacing}
        />
      ) : null}

      {currentStep === 4 ? (
        <ConfirmationStep
          address={address}
          orderNumber={orderNumber}
          shippingCost={shippingCost}
          discount={discount}
          onContinueShopping={handleContinueShopping}
        />
      ) : null}
    </div>
  );
}
