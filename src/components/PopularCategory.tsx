import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Database, 
  Server, 
  Layout, 
  Network,
  Wifi,
  Terminal,
  ArrowUpRight 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PopularCategory: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = usePortfolio();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code2 className="w-8 h-8 text-[#761A30]" />;
      case 'Smartphone':
        return <Smartphone className="w-8 h-8 text-[#761A30]" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-[#761A30]" />;
      case 'Database':
        return <Database className="w-8 h-8 text-[#761A30]" />;
      case 'Server':
        return <Server className="w-8 h-8 text-[#761A30]" />;
      case 'Network':
      case 'Wifi':
        return <Network className="w-8 h-8 text-[#761A30]" />;
      case 'Terminal':
        return <Terminal className="w-8 h-8 text-[#761A30]" />;
      case 'Layout':
        return <Layout className="w-8 h-8 text-[#761A30]" />;
      default:
        return <Code2 className="w-8 h-8 text-[#761A30]" />;
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? 'All' : slug);
    const target = document.getElementById('featured-projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="popular-domains" className="py-12 sm:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup "Popular Category" */}
        <div className="text-center space-y-1 mb-10 sm:mb-12">
          <p className="font-serif italic text-lg sm:text-xl text-[#761A30] font-normal">
            Domains & Specializations
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
            Core Technical Expertise
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-xl mx-auto">
            Click on any domain to filter and explore corresponding real-world applications and architectures.
          </p>
        </div>

        {/* 6-Column Category Grid matching image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#FAF3F5] border-[#761A30] shadow-lg ring-2 ring-[#761A30]/20 -translate-y-1'
                    : 'bg-white hover:bg-[#FAF8F8] border-[#F1EBEB] hover:border-[#761A30]/40 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Top Right arrow hint on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#761A30]" />
                </div>

                {/* Icon Container with subtle rounded background */}
                <div className={`p-4 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  isSelected ? 'bg-white shadow-xs' : 'bg-[#FAF3F5] group-hover:bg-white'
                }`}>
                  {getIcon(cat.iconName)}
                </div>

                {/* Name & Count */}
                <div className="space-y-1">
                  <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                    isSelected ? 'text-[#761A30]' : 'text-[#18181B] group-hover:text-[#761A30]'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#A1A1AA]">
                    {cat.itemCount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
