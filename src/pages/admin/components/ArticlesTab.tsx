import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Edit, Trash2, Calendar, 
  Clock, User, ExternalLink, Image as ImageIcon, Sparkles, Filter 
} from 'lucide-react';
import { BlogArticle } from '../../../types';

interface ArticlesTabProps {
  articles: BlogArticle[];
  onOpenNewArticle: () => void;
  onEditArticle: (article: BlogArticle) => void;
  onDeleteArticle: (id: string, title: string) => void;
}

export const ArticlesTab: React.FC<ArticlesTabProps> = ({
  articles,
  onOpenNewArticle,
  onEditArticle,
  onDeleteArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Backend Architecture',
    'Algorithms & Architecture',
    'Mobile Engineering'
  ];

  const filteredArticles = articles.filter((art) => {
    const cat = (art.category || '').toLowerCase();
    const sel = selectedCategory.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || 
      art.category === selectedCategory ||
      cat === sel ||
      (sel === 'backend architecture' && (cat.includes('backend') || cat.includes('architecture'))) ||
      (sel === 'algorithms & architecture' && (cat.includes('algorithm') || cat.includes('architecture'))) ||
      (sel === 'mobile engineering' && (cat.includes('mobile') || cat.includes('android')));
    
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.category && art.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('backend')) {
      return 'bg-[#FAF3F5] text-[#761A30] border-[#F4ECEE]';
    }
    if (c.includes('algorithm')) {
      return 'bg-purple-50 text-purple-800 border-purple-200';
    }
    if (c.includes('mobile')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    return 'bg-zinc-100 text-zinc-800 border-zinc-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Tech Journal & Case Studies
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {articles.length} Publications
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Manage your technical publications in Backend Architecture, Algorithms & Architecture, and Mobile Engineering.
          </p>
        </div>

        <button
          onClick={onOpenNewArticle}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE3E5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#761A30] text-white shadow-xs'
                    : 'bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] hover:bg-[#F4ECEE]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#761A30]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B] text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No articles found</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            {searchQuery || selectedCategory !== 'All' 
              ? 'Try adjusting your filters or search keywords.' 
              : 'Add your first technical article or architectural case study.'}
          </p>
          <button
            onClick={onOpenNewArticle}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426] cursor-pointer"
          >
            Create Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const id = article.id || (article as any)._id;
            return (
              <div
                key={id}
                className="bg-white rounded-3xl border border-[#EAE3E5] shadow-xs hover:shadow-md hover:border-[#761A30]/30 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#A1A1AA] bg-zinc-50">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-bold">No Cover Image</span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs backdrop-blur-xs ${getCategoryBadgeClass(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Meta Info */}
                    <div className="flex items-center space-x-3 text-[11px] text-[#71717A]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#761A30]" />
                        <span>{article.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#761A30]" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-[#18181B] group-hover:text-[#761A30] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-[#F1EBEB] flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[11px] text-[#71717A]">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-[110px]">{article.author}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEditArticle(article)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                        title="Edit details & image"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => onDeleteArticle(id, article.title)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
