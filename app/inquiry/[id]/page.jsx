"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiStar, FiCheckCircle } from "react-icons/fi";
import { foodItems } from "@/assets/assets";
import ProductImage from "@/components/ProductImage";

const InquiryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = foodItems.find(p => String(p.id) === String(id));
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Product not found.</div>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Inquiry:", { product, form });
    setSubmitted(true);
    setTimeout(() => router.push("/"), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg flex items-center justify-center">A</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">AgriFinAI</span>
          </Link>
          <Link href="/" className="text-sm text-green-700 hover:underline flex items-center gap-1">
            <FiArrowLeft /> Back
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Product Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
                <div className="relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <FiCheckCircle className="w-3 h-3" /> Verified
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h1 className="text-xl font-bold text-white">{product.name}</h1>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-green-700">{product.price}</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiMapPin className="w-4 h-4 text-green-600" />
                      <span>{product.origin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-500">ID: {product.id}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                      <p className="font-semibold text-green-700">Freshness</p>
                      <p className="text-gray-600">Harvested recently</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                      <p className="font-semibold text-green-700">Quality</p>
                      <p className="text-gray-600">Premium grade</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Why Inquiry?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span>•</span>Negotiate bulk pricing</li>
                  <li className="flex gap-2"><span>•</span>Confirm availability & logistics</li>
                  <li className="flex gap-2"><span>•</span>Build long-term supplier relations</li>
                </ul>
              </div>
            </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-24 w-72 h-72 bg-gradient-to-br from-green-200/40 to-emerald-200/10 blur-3xl rounded-full pointer-events-none" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Inquiry</h2>
              <p className="text-gray-600 mb-8 text-sm">
                Provide your requirements. The farmer will contact you soon.
              </p>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-lg">
                    <FiMail className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Inquiry Sent!</h3>
                  <p className="text-gray-600 mb-6">We have shared your request with the farmer.</p>
                  <Link href="/" className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                    Back to Marketplace
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                      <input
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                        placeholder="e.g. 250"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                      placeholder="Describe quality specs, delivery timeline, payment terms..."
                    />
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-sm">
                    <p className="font-semibold text-green-800 mb-2">Summary</p>
                    <ul className="text-green-700 space-y-1">
                      <li><span className="font-medium">Product:</span> {product.name}</li>
                      <li><span className="font-medium">Origin:</span> {product.origin}</li>
                      <li><span className="font-medium">Category:</span> {product.category}</li>
                      {form.quantity && <li><span className="font-medium">Requested Qty:</span> {form.quantity} kg</li>}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="flex-1 px-6 py-4 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2"
                    >
                      <FiMail className="w-5 h-5" />
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InquiryPage;