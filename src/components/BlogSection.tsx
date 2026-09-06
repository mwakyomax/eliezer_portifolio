import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const BlogSection: React.FC = () => {
  const { articles, setActiveArticle } = usePortfolio();

  return (
    <section id="tech-journal" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup "Our Blog" */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <p className="font-serif italic text-lg sm:text-xl text-[#761A30] font-normal">
            Publications & Insights
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
            Our Tech Journal
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-xl mx-auto">
            Deep architectural analyses, algorithm benchmarks, and software engineering methodologies by Elieza Mwakyoma.
          </p>
        </div>

        {/* 3-Column Blog Cards matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#F1EBEB] shadow-xs hover:shadow-xl hover:border-[#761A30]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#761A30] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {art.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-[#71717A]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#18181B] group-hover:text-[#761A30] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                {/* Footer read link */}
                <div className="pt-4 border-t border-[#F1EBEB] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#18181B] group-hover:text-[#761A30] transition-colors flex items-center space-x-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-medium text-[#A1A1AA]">{art.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
