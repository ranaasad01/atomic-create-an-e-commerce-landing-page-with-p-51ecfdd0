"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, type Product } from "@/lib/data";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

const featuredProducts: Product[] = [
  { id: 1, name: "Aura Silk Blouse", category: "Women's Fashion", price: 89, originalPrice: 120, rating: 4.8, reviewCount: 214, image: "https://picsum.photos/seed/2de487af24ee/800/600", badge: "Best Seller", isSale: true },
  { id: 2, name: "Obsidian Leather Watch", category: "Accessories", price: 245, rating: 4.9, reviewCount: 98, image: "https://matthew-mercury.com/cdn/shop/files/Black_B_men_S.jpg?v=1775931257", badge: "New", isNew: true },
  { id: 3, name: "Linen Relaxed Trousers", category: "Men's Fashion", price: 112, originalPrice: 145, rating: 4.7, reviewCount: 176, image: "https://arveilo.com/cdn/shop/files/263.png?v=1740245214&width=1170", isSale: true },
  { id: 4, name: "Velvet Crossbody Bag", category: "Accessories", price: 158, rating: 4.6, reviewCount: 132, image: "https://m.media-amazon.com/images/I/61vHFTl2PvL._AC_UF894,1000_QL80_.jpg", badge: "New", isNew: true },
  { id: 5, name: "Cashmere Turtleneck", category: "Women's Fashion", price: 195, originalPrice: 240, rating: 4.9, reviewCount: 307, image: "https://www.gorsuch.com/cdn/shop/files/M05_FRAU_TEDDYL_CASH_168-216-0059-cashmere-2.jpg?v=1753037488&width=1500", badge: "Top Rated", isSale: true },
  { id: 6, name: "Canvas Sneakers", category: "Footwear", price: 78, rating: 4.5, reviewCount: 421, image: "https://theshopyohjiyamamoto.com/cdn/shop/files/MS-E02-061_1-1.jpg?v=1724356645&width=1445" },
];

const collections = [
  { id: 1, title: "Summer Essentials", subtitle: "Lightweight pieces for warm days", count: 48, image: "http://www.themeryl.com/wp-content/uploads/2022/06/summer-essentials-02.png", accent: "#e94560" },
  { id: 2, title: "Urban Minimalist", subtitle: "Clean lines, timeless silhouettes", count: 63, image: "http://www.themeryl.com/wp-content/uploads/2022/06/summer-essentials-02.png", accent: "#1a1a2e" },
  { id: 3, title: "Luxe Accessories", subtitle: "The finishing touch to every look", count: 35, image: "https://cdn.homedsgn.com/wp-content/uploads/2016/11/RiverS-05.jpg", accent: "#c9a96e" },
];

const testimonials = [
  { id: 1, name: "Sophia Laurent", role: "Fashion Blogger", avatar: "https://i.ebayimg.com/images/g/RNgAAeSwgIBpi5lH/s-l1200.webp", rating: 5, text: "Lumière has completely changed how I shop. The quality of every piece is exceptional, and the curation feels personal." },
  { id: 2, name: "Marcus Chen", role: "Creative Director", avatar: "https://media.licdn.com/dms/image/v2/D5603AQF3BJUWy9x8HQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729135542036?e=2147483647&v=beta&t=1a5LYEgnKxsq9JwYKJcD3qfspZnLCvPy0oQmbFjzKhs", rating: 5, text: "I ordered the Obsidian Watch and it arrived beautifully packaged. The craftsmanship is outstanding. This is my go-to store for premium accessories." },
  { id: 3, name: "Isabelle Moreau", role: "Stylist", avatar: "https://static.wikia.nocookie.net/desperados/images/a/a7/Hud_portrait_isabelle.png/revision/latest?cb=20201109223554", rating: 5, text: "The Cashmere Turtleneck is worth every penny. Soft, well-cut, and it photographs beautifully. My clients always ask where I source my pieces." },
];

const valueProps = [
  { icon: Truck, title: "Free Shipping", description: "Complimentary delivery on all orders over 75 USD, worldwide." },
  { icon: RefreshCw, title: "Easy Returns", description: "30-day hassle-free returns. No questions asked." },
  { icon: Shield, title: "Secure Checkout", description: "Your payment details are always encrypted and protected." },
  { icon: Heart, title: "Curated Quality", description: "Every item is hand-selected by our in-house style team." },
];

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.18)" },
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.round(rating);
          return (
            <Star
              key={i}
              className={filled ? "w-3.5 h-3.5 fill-amber-400 text-amber-400" : "w-3.5 h-3.5 fill-gray-200 text-gray-200"}
            />
          );
        })}
      </div>
      <span className="text-xs text-[#1a1a2e]/50 font-medium">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f5f2]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e94560] text-white shadow-sm">{product.badge}</span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1a1a2e] text-white shadow-sm">-{discount}%</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWishlisted((w) => !w)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200 hover:bg-white"
            aria-label="Add to wishlist"
          >
            <Heart className={wishlisted ? "w-4 h-4 fill-[#e94560] text-[#e94560]" : "w-4 h-4 text-[#1a1a2e]/50"} />
          </motion.button>
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full py-3 bg-[#1a1a2e] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#e94560] transition-colors duration-200">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <p className="text-xs font-medium text-[#e94560] uppercase tracking-wider">{product.category}</p>
          <h3 className="text-sm font-semibold text-[#1a1a2e] leading-snug">{product.name}</h3>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base font-bold text-[#1a1a2e]">{"$"}{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#1a1a2e]/40 line-through">{"$"}{product.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-screen flex items-center bg-[#faf9f7] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#f0ece4] to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#e94560]/5 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#c9a96e]/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e94560]/10 text-[#e94560] text-xs font-semibold uppercase tracking-widest border border-[#e94560]/20">
                <Sparkles className="w-3.5 h-3.5" />
                New Season Arrivals
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a2e] tracking-tight leading-[1.05] text-balance">
              Style That<br /><span className="text-[#e94560]">Speaks</span> For<br />Itself.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#1a1a2e]/60 leading-relaxed max-w-md text-pretty">
              {APP_TAGLINE}. Discover premium fashion and accessories curated for those who appreciate the art of dressing well.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => { e.preventDefault(); document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(233,69,96,0.35)] hover:bg-[#d63652] transition-colors duration-200"
                style={{ fontSize: "18px" }}
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => { e.preventDefault(); document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1a1a2e] font-semibold text-sm border border-black/10 hover:border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200"
              >
                View Collections
              </motion.a>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#e94560]/30 to-[#c9a96e]/30 overflow-hidden">
                    <img src={"/images/customer-avatar-" + i + ".jpg"} alt={"Customer " + i} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#1a1a2e]/50 mt-0.5">
                  Loved by <span className="font-semibold text-[#1a1a2e]">12,000+</span> customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative grid grid-cols-2 gap-3 lg:gap-4">
            <motion.div variants={slideInRight} className="col-span-1 flex flex-col gap-3 lg:gap-4 pt-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                <img src="https://www.refinery29.com/images/10888118.jpg?format=webp&width=720&height=1080&quality=85" alt="Featured fashion look" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                <img src="https://img.magnific.com/free-photo/luxury-fashion-woman-accessories-golden-heeled-shoes-little-evening-purse-elegant-style-vintage-style-sandals-footwear_285396-7237.jpg?semt=ais_hybrid&w=740&q=80" alt="Luxury accessories" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} className="col-span-1 flex flex-col gap-3 lg:gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                <img src="https://cdn.shopify.com/s/files/1/0192/8012/products/minimalist-watch-black-brown-leather-dowling-brothers-analog-accessory-488.jpg" alt="Minimalist watch" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                <img src="https://static01.nyt.com/images/2025/01/14/multimedia/14STYLEOUTSIDE-WKLY-BERNICK-01-qvmf/14STYLEOUTSIDE-WKLY-BERNICK-01-qvmf-mobileMasterAt3x.jpg" alt="Street style look" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute -left-4 bottom-16 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.18)] border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#e94560]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a1a2e]">New Drop</p>
                <p className="text-xs text-[#1a1a2e]/50">Summer 2025</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {valueProps.map((vp) => (
            <motion.div key={vp.title} variants={fadeInUp} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e94560]/15 flex items-center justify-center shrink-0 mt-0.5">
                <vp.icon className="w-5 h-5 text-[#e94560]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{vp.title}</p>
                <p className="text-xs text-white/50 leading-relaxed mt-0.5">{vp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="products" className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-[#e94560] uppercase tracking-widest mb-2">Handpicked for You</motion.p>
              <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight text-balance">Featured Products</motion.h2>
            </div>
            <motion.a variants={fadeInUp} href="#products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e94560] hover:gap-2.5 transition-all duration-200 group">
              View all products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="collections" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-[#e94560] uppercase tracking-widest mb-2">Shop by Theme</motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight text-balance">Our Collections</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-[#1a1a2e]/55 text-lg max-w-xl mx-auto leading-relaxed text-pretty">
              Thoughtfully assembled edits for every occasion, season, and personal style.
            </motion.p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {collections.map((col, idx) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={idx === 1 ? "relative rounded-2xl overflow-hidden cursor-pointer group shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] md:row-span-1 aspect-[4/5]" : "relative rounded-2xl overflow-hidden cursor-pointer group shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] aspect-[4/5]"}
              >
                <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">{col.count} pieces</p>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-1">{col.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{col.subtitle}</p>
                  <motion.span whileHover={{ gap: "10px" }} className="inline-flex items-center gap-2 text-white text-sm font-semibold group/btn">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_24px_48px_-12px_rgba(0,0,0,0.18)]">
                <img src="https://cdn.sortiraparis.com/images/80/97216/726754-exposition-kandinsky-a-l-atelier-des-lumieres.jpg" alt="Lumière atelier" className="w-full h-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 bottom-12 bg-white rounded-2xl px-5 py-4 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.18)] border border-black/5"
              >
                <p className="text-3xl font-bold text-[#1a1a2e] tracking-tight">12k+</p>
                <p className="text-xs text-[#1a1a2e]/50 mt-0.5">Happy customers worldwide</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
                className="absolute -left-6 top-12 bg-[#e94560] rounded-2xl px-5 py-4 shadow-[0_4px_20px_rgba(233,69,96,0.35)]"
              >
                <p className="text-3xl font-bold text-white tracking-tight">200+</p>
                <p className="text-xs text-white/70 mt-0.5">Premium brands stocked</p>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col gap-6">
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-[#e94560] uppercase tracking-widest">Our Story</motion.p>
              <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight leading-tight text-balance">
                Fashion Rooted in Intention
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#1a1a2e]/60 leading-relaxed text-pretty">
                {APP_NAME} was born from a simple belief: that getting dressed should feel like a pleasure, not a chore. We partner with independent designers and established houses alike to bring you pieces that are made to last, styled to impress, and priced with integrity.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[#1a1a2e]/60 leading-relaxed text-pretty">
                Every item in our catalog passes through a rigorous quality review. We care about the materials, the makers, and the miles each piece travels to reach you.
              </motion.p>
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mt-2">
                {[
                  "Ethically sourced materials and responsible production",
                  "Carbon-neutral shipping on all domestic orders",
                  "Partnerships with 200+ independent designers",
                  "Dedicated personal styling service available",
                ].map((item) => (
                  <motion.li key={item} variants={fadeInUp} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#e94560]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#e94560]" />
                    </div>
                    <span className="text-sm text-[#1a1a2e]/70 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp}>
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.preventDefault(); document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1a2e] text-white font-semibold text-sm hover:bg-[#e94560] transition-colors duration-300 shadow-[0_4px_12px_rgba(26,26,46,0.2)]"
                >
                  Discover Our Range
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-[#e94560] uppercase tracking-widest mb-2">Real Reviews</motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight text-balance">
              What Our Customers Say
            </motion.h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[#faf9f7] rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-4"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#1a1a2e]/70 text-sm leading-relaxed flex-1 text-pretty" style={{ color: "#1e1ef6", fontSize: "14px" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e94560]/10 shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{t.name}</p>
                    <p className="text-xs text-[#1a1a2e]/45">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="newsletter" className="py-24 md:py-32 bg-[#1a1a2e] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#e94560]/10 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={scaleIn} className="w-14 h-14 rounded-2xl bg-[#e94560] flex items-center justify-center shadow-[0_4px_20px_rgba(233,69,96,0.4)]">
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-[#e94560] uppercase tracking-widest">Stay in the Loop</motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Get Early Access to New Drops
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed text-pretty">
              Join 12,000+ subscribers and be the first to know about new arrivals, exclusive sales, and style inspiration delivered weekly.
            </motion.p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-white/15 text-white"
              >
                <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold">You&apos;re on the list. Welcome to {APP_NAME}!</p>
              </motion.div>
            ) : (
              <motion.form variants={fadeInUp} onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-[#e94560]/50 transition-all duration-200"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(233,69,96,0.4)] hover:bg-[#d63652] transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe Free
                </motion.button>
              </motion.form>
            )}
            <motion.p variants={fadeInUp} className="text-white/35 text-xs">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
