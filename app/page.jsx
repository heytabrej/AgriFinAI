"use client";
import "../i18n";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import ProductImage from "../components/ProductImage";
import { foodItems } from "../assets/assets";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiNavigation,
  FiMapPin,
  FiStar,
  FiHeart,
  FiMail,
  FiShoppingBag,
  FiArrowRight,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiClock,
  FiPhone,
} from "react-icons/fi";
import { motion } from "framer-motion";

const stateToLanguage = {
  Maharashtra: "mr",
  Gujarat: "gu",
  Punjab: "pa",
  "West Bengal": "bn",
  "Tamil Nadu": "ta",
  Karnataka: "kn",
  "Uttar Pradesh": "hi",
  Haryana: "hi",
  Bihar: "hi",
  Rajasthan: "hi",
  "Madhya Pradesh": "hi",
  Kerala: "en", // add 'ml' later if translations added
  Telangana: "hi",
  "Andhra Pradesh": "hi",
  Odisha: "en", // add 'or' later
  Jharkhand: "hi",
  Chhattisgarh: "hi",
  Delhi: "hi",
};

// Helper to safely switch
function switchLanguageForState(state, manual = false) {
  if (!state) return;
  const code = stateToLanguage[state];
  if (code && i18n.language !== code) {
    // If user manually selected or no manual selection stored yet
    const userPref = localStorage.getItem("userLangPref");
    if (manual || !userPref) {
      i18n.changeLanguage(code);
      if (!manual) localStorage.setItem("autoLangSet", "1");
      if (manual) localStorage.setItem("userLangPref", code);
    }
  }
}

const LandingPage = () => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [detectedArea, setDetectedArea] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(foodItems);
  const [categories] = useState(["all", "vegetables", "fruits", "grains", "dairy"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [toast, setToast] = useState(null);
  const [manualLang, setManualLang] = useState(localStorage.getItem("userLangPref") || "");

  // Auto language adjust
  useEffect(() => {
    if (navigator.language) {
      const browserLanguage = navigator.language.substring(0, 2);
      if (i18n.language !== browserLanguage) i18n.changeLanguage(browserLanguage);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  // Load persisted language once
  useEffect(() => {
    const stored = localStorage.getItem("userLangPref");
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
  }, []);

  // Slight toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 3800);
      return () => clearTimeout(id);
    }
  }, [toast]);

  // Filtering + sorting
  useEffect(() => {
    let fp = [...foodItems];
    if (selectedCategory !== "all") {
      fp = fp.filter((p) => p.category.toLowerCase() === selectedCategory);
    }
    if (searchQuery.trim()) {
      fp = fp.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    fp = fp.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, ""));
        case "price-high":
          return parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, ""));
        case "rating":
          return b.rating - a.rating;
        default:
          return b.id - a.id;
      }
    });
    setFilteredProducts(fp);
  }, [searchQuery, selectedCategory, sortBy]);

  const getLocation = () => {
    setIsLocating(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError(t("Geolocation not supported"));
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          );
          if (response.ok) {
            const data = await response.json();
            const loc = data[0];
            const detectedLocation = `${loc.name}, ${loc.state}, ${loc.country}`;
            setDetectedArea(detectedLocation);
            filterProductsByLocation(loc.state);
            // Auto language switch if user has not chosen manually
            if (!localStorage.getItem("userLangPref")) {
              const prev = i18n.language;
              switchLanguageForState(loc.state);
              if (i18n.language !== prev && stateToLanguage[loc.state]) {
                setToast({ type: "lang", msg: t("Language switched for your region") + ": " + i18n.language.toUpperCase() });
              }
            }
          }
        } catch {
          setLocationError(t("Unable to detect location. Please try again."));
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setLocationError(t("Location access denied. Please enable location services."));
        setIsLocating(false);
      }
    );
  };

  const filterProductsByLocation = (state) => {
    const filtered = foodItems.filter(
      (p) => p.origin.includes(state) || p.name.toLowerCase().includes("local")
    );
    setFilteredProducts(filtered.length ? filtered : foodItems.slice(0, 8));
  };

  const handleManualSearch = () => {
    if (searchQuery.trim()) {
      filterProductsByLocation(searchQuery.trim());
      setDetectedArea(searchQuery.trim());
    }
  };

  const clearFilters = () => {
    setFilteredProducts(foodItems);
    setDetectedArea("");
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    if (i18n.language !== "en") i18n.changeLanguage("en");
  };

  // Manual language change handler
  const handleManualLanguage = (e) => {
    const val = e.target.value;
    setManualLang(val);
    if (val) {
      localStorage.setItem("userLangPref", val);
      i18n.changeLanguage(val);
      setToast({ type: "lang", msg: t("Language set to") + ": " + val.toUpperCase() });
    } else {
      localStorage.removeItem("userLangPref");
      setToast({ type: "lang", msg: t("Using automatic language") });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:bg-gray-950 transition-colors">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]">
          <div className="px-5 py-3 rounded-xl bg-green-600 text-white shadow-lg text-sm flex items-center gap-3 animate-slide-down">
            <FiShield className="w-4 h-4" />
            <span>{toast.msg}</span>
            <button onClick={() => setToast(null)} className="text-white/70 hover:text-white">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-lg bg-white/60 border-b border-green-100" />
          <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-inner text-white font-bold text-lg">
                A
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
                AgriFinAI
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10 font-medium">
              <Link href="/" className="text-green-700 font-semibold">
                {t("Home")}
              </Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition">
                {t("Weather")}
              </Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition">
                {t("Loan")}
              </Link>
              <Link href="/soil-health" className="text-gray-600 hover:text-green-700 transition">
                {t("Soil Health")}
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:shadow-lg transition"
              >
                {t("Sell")} <FiArrowRight />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                  placeholder={t("Search products / region")}
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 bg-white/70 placeholder:text-gray-400 text-sm w-64 backdrop-blur"
                />
              </div>
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Toggle dark mode"
              >
                {darkMode ? t("Light") : t("Dark")}
              </button>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
              >
                {t("Login / Register")}
              </Link>
            </div>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/60 transition"
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
          </nav>
        </div>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white shadow-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <span className="text-xl font-bold text-gray-900">AgriFinAI</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                  placeholder={t("Search products...")}
                  className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>

              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link href="/" className="text-green-700">
                  {t("Home")}
                </Link>
                <Link href="/weather" className="text-gray-700">
                  {t("Weather")}
                </Link>
                <Link href="/loan" className="text-gray-700">
                  {t("Loan")}
                </Link>
                <Link href="/soil-health" className="text-gray-700">
                  {t("Soil Health")}
                </Link>
                <Link
                  href="/sell"
                  className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold"
                >
                  {t("Start Selling")}
                </Link>
              </nav>

              <div className="mt-auto pt-8 text-xs text-gray-500">
                © {new Date().getFullYear()} AgriFinAI
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-green-100 text-sm font-medium text-green-700 shadow-sm">
                  🌱 {t("Empowering Farmers with AI")}
                </div>
                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold leading-tight"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    {t("Direct Farm")}
                  </span>{" "}
                  {t("Marketplace & Intelligence")}
                </motion.h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t(
                    "Discover verified farm-fresh produce, negotiate directly with growers, and access actionable insights for smarter sourcing."
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#marketplace"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
                  >
                    {t("Browse Products")} <FiShoppingBag className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all"
                  >
                    {t("Become a Seller")}
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="mt-4 bg-white/70 backdrop-blur rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                      placeholder={t("Enter location or product...")}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={getLocation}
                      disabled={isLocating}
                      className="px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                    >
                      <FiNavigation className="w-4 h-4" />
                      {t("Locate")}
                    </button>
                    <button
                      onClick={handleManualSearch}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:shadow-lg transition"
                    >
                      {t("Search")}
                    </button>
                  </div>
                </div>
                {locationError && <p className="text-sm text-red-500">{locationError}</p>}
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl opacity-20 rotate-3" />
                <div className="relative grid grid-cols-2 gap-4">
                  {filteredProducts.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl overflow-hidden shadow-md bg-white group hover:shadow-xl transition-all duration-300"
                    >
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        className="h-40 w-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="p-3">
                        <p className="font-semibold text-sm text-gray-800 truncate">{p.name}</p>
                        <p className="text-xs text-green-600 font-medium">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            >
              {[
                { number: "5,000+", label: t("Active Farmers"), icon: FiUsers },
                { number: "₹2Cr+", label: t("Transactions"), icon: FiTrendingUp },
                { number: "50+", label: t("Cities Covered"), icon: FiMapPin },
                { number: "4.8★", label: t("Platform Rating"), icon: FiStar },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-5 border border-green-100 dark:border-gray-700 hover:shadow-lg transition"
                >
                  <item.icon className="w-7 h-7 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">{item.number}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Marketplace */}
        <section id="marketplace" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t("Fresh")}{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  {t("Marketplace")}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("Discover premium produce directly from verified local farmers")}
              </p>
              {detectedArea && (
                <p className="mt-3 text-sm text-green-700 inline-flex items-center gap-2 bg-green-100 px-4 py-1.5 rounded-full">
                  <FiMapPin className="w-4 h-4" />
                  {t("Showing products near")} {detectedArea}
                </p>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-green-100">
              <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === c
                          ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
                      }`}
                    >
                      {c === "all"
                        ? t("All Products")
                        : c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="newest">{t("Newest")}</option>
                    <option value="price-low">{t("Price: Low → High")}</option>
                    <option value="price-high">{t("Price: High → Low")}</option>
                    <option value="rating">{t("Rating")}</option>
                  </select>
                  {(selectedCategory !== "all" || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      {t("Clear")}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{filteredProducts.length} {t("results")}</span>
                {searchQuery && <span>{t("Query")}: “{searchQuery}”</span>}
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow">
                <FiShoppingBag className="mx-auto h-16 w-16 text-gray-200 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {t("No products found")}
                </h3>
                <p className="text-gray-500 mt-2">
                  {t("Try adjusting filters or search criteria")}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:shadow-lg transition"
                >
                  {t("Show All Products")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden border border-transparent hover:border-green-200 dark:hover:border-green-500 flex flex-col"
                  >
                    <div className="relative">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {p.category}
                      </span>
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition shadow"
                        aria-label="Wishlist"
                      >
                        <FiHeart className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition" />
                      </button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{p.name}</h3>
                        <p className="text-xs opacity-90 flex items-center gap-1">
                          <FiMapPin className="w-3 h-3" /> {p.origin}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col gap-4 flex-1">
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-green-700">{p.price}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FiClock className="w-3 h-3" /> {t("Fresh today")}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <FiStar className="w-4 h-4 fill-current" />
                          <span className="font-semibold text-gray-700 text-sm">
                            {p.rating}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/inquiry/${p.id}`}
                        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-lg hover:scale-[1.02] transition"
                      >
                        <FiMail className="w-4 h-4" />
                        {t("Send Inquiry")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("Why Choose")}{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  AgriFinAI
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t("A unified platform connecting sustainable supply with intelligent demand")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: FiShield,
                  title: t("Verified Farmers"),
                  desc: t("Ensuring trust, traceability and quality sourcing"),
                },
                {
                  icon: FiTrendingUp,
                  title: t("Fair Pricing"),
                  desc: t("Equitable pricing empowering growers & buyers"),
                },
                {
                  icon: FiMail,
                  title: t("Direct Negotiation"),
                  desc: t("No middlemen – build lasting supplier relations"),
                },
                {
                  icon: FiUsers,
                  title: t("Community Growth"),
                  desc: t("Strengthening local agri ecosystems"),
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-green-100/40 to-emerald-100/40" />
                  <f.icon className="w-10 h-10 text-green-600 mb-4 relative" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2 relative">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed relative">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("Ready to Transform Agriculture?")}
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                {t(
                  "Join thousands of farmers and buyers already creating a more resilient and transparent food system."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
                >
                  {t("Start Selling Today")}
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all"
                >
                  {t("Contact Us")}
                  <FiMail className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-xl font-semibold">AgriFinAI</span>
              </div>
              <p className="text-sm leading-relaxed">
                {t("Connecting farmers with buyers for a sustainable agricultural future.")}
              </p>
              <div className="flex gap-3">
                {["f", "t", "in"].map((s) => (
                  <span
                    key={s}
                    className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-sm hover:bg-green-600 transition cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                {t("Quick Links")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    {t("About Us")}
                  </Link>
                </li>
                <li>
                  <Link href="/weather" className="hover:text-white transition">
                    {t("Weather")}
                  </Link>
                </li>
                <li>
                  <Link href="/loan" className="hover:text-white transition">
                    {t("Loans")}
                  </Link>
                </li>
                <li>
                  <Link href="/soil-health" className="hover:text-white transition">
                    {t("Soil Health")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                {t("Support")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-white transition">
                    {t("FAQ")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    {t("Contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    {t("Privacy Policy")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    {t("Terms of Service")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                {t("Contact")}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-green-500" /> +91 123 456 7890
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-green-500" /> hello@agrifinai.com
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-green-500" /> Mumbai, India
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} AgriFinAI. {t("All rights reserved.")} 
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;