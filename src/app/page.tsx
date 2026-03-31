"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useWaitlist } from "@/hooks/useWaitlist";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Calculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import FailureStories from "@/components/FailureStories";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const { submit, loading, error, success, result, reset } = useWaitlist();
  const [showModal, setShowModal] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  useEffect(() => {
    if (success && result) {
      setShowModal(true);
    }
  }, [success, result]);

  const handleSubmit = useCallback(
    async (name: string, email: string) => {
      await submit(name, email, referralCode);
    },
    [submit, referralCode]
  );

  const scrollToHero = useCallback(() => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    reset();
  }, [reset]);

  return (
    <main className="min-h-screen">
      <Navbar onJoinClick={scrollToHero} />

      <div ref={heroRef}>
        <Hero onSubmit={handleSubmit} loading={loading} error={error} />
      </div>

      <ValueProps />
      <Calculator />
      <FailureStories onJoinClick={scrollToHero} />
      <Pricing onJoinClick={scrollToHero} />
      <Roadmap />
      <FAQ />
      <Footer />

      <StickyCTA onSubmit={handleSubmit} loading={loading} error={error} />

      {result && (
        <WaitlistModal
          isOpen={showModal}
          onClose={handleCloseModal}
          position={result.position}
          referralCode={result.referral_code}
        />
      )}
    </main>
  );
}
