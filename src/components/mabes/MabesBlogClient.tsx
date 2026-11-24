"use client";

import React, { useState, useTransition } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Loader2,
  Globe,
  X,
  FileText,
  ExternalLink,
} from "lucide-react";
import { actionTogglePostPublish, actionSaveBlogPost } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface BlogPostItem {
  id: string;
  slug: string;
  category: string;
  coverImage?: string | null;
  authorName: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  translations: Array<{
    id: string;
    locale: string;
    title: string;
    excerpt: string;
    content: string;
    isPublished: boolean;
  }>;
}

interface MabesBlogClientProps {
  initialPosts: BlogPostItem[];
}

export function MabesBlogClient({ initialPosts }: MabesBlogClientProps) {
  const [posts, setPosts] = useState<BlogPostItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Tutorial",
    authorName: "Rafa Kreasindo Team",
    excerpt: "",
    content: "",
    locale: "id",
    isPublished: true,
  });

  const [isPending, startTransition] = useTransition();

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.translations.some((t) => t.title.toLowerCase().includes(search.toLowerCase()));

    const matchCategory = categoryFilter === "ALL" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleOpenNew = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      category: "Tutorial",
      authorName: "Rafa Kreasindo Team",
      excerpt: "",
      content: "",
      locale: "id",
      isPublished: true,
    });
    setShowEditorModal(true);
  };

  const handleOpenEdit = (p: BlogPostItem) => {
    const t = p.translations[0] || { title: "", excerpt: "", content: "" };
    setEditingPost(p);
    setFormData({
      title: t.title,
      slug: p.slug,
      category: p.category,
      authorName: p.authorName,
      excerpt: t.excerpt,
      content: t.content,
      locale: "id",
      isPublished: p.isPublished,
    });
    setShowEditorModal(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !editingPost
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        : prev.slug,
    }));
  };

  const handleTogglePublish = (postId: string, current: boolean) => {
    startTransition(async () => {
      const res = await actionTogglePostPublish(postId, !current);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, isPublished: !current } : p
          )
        );
        showToast(
          !current ? "Post published live to platform blog!" : "Post drafted.",
          "success"
        );
      } else {
        showToast(res.error || "Failed to update status.", "error");
      }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast("Title and slug are required.", "error");
      return;
    }

    startTransition(async () => {
      const res = await actionSaveBlogPost({
        id: editingPost?.id,
        ...formData,
      });

      if (res.success) {
        if (editingPost) {
          setPosts((prev) =>
            prev.map((p) =>
              p.id === editingPost.id
                ? {
                    ...p,
                    ...res.data,
                    translations: [
                      {
                        id: `tr-${Date.now()}`,
                        locale: formData.locale,
                        title: formData.title,
                        excerpt: formData.excerpt,
                        content: formData.content,
                        isPublished: formData.isPublished,
                      },
                    ],
                  }
                : p
            )
          );
        } else {
          setPosts((prev) => [
            {
              ...res.data,
              translations: [
                {
                  id: `tr-${Date.now()}`,
                  locale: formData.locale,
                  title: formData.title,
                  excerpt: formData.excerpt,
                  content: formData.content,
                  isPublished: formData.isPublished,
                },
              ],
            },
            ...prev,
          ]);
        }
        setShowEditorModal(false);
        showToast("Article saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to save article.", "error");
      }
    });
  };

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={handleOpenNew}
            className="px-3.5 py-2 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Write New Article
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Article Title &amp; Slug</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Translations</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No blog articles published yet</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Click &apos;Write New Article&apos; above to publish marketing content for Southeast Asia.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const translation = p.translations[0];
                  const title = translation?.title || p.slug;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-white block max-w-sm truncate">
                          {title}
                        </span>
                        <a
                          href={`https://etalase.online/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-400 font-mono hover:underline inline-flex items-center gap-1"
                        >
                          /blog/{p.slug}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {p.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-slate-300">
                        {p.authorName}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          {["id", "en", "ms", "th", "vi"].map((l) => {
                            const hasTr = p.translations.some((t) => t.locale === l);
                            return (
                              <span
                                key={l}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                                  hasTr
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-slate-950 text-slate-600 border border-slate-800"
                                }`}
                              >
                                {l}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(p.id, p.isPublished)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition ${
                            p.isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                              : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                          }`}
                        >
                          {p.isPublished ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Published
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              Draft
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Write / Edit Article Modal */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white">
                {editingPost ? "Edit Marketing Article" : "Write Platform Article"}
              </h3>
              <button
                type="button"
                onClick={() => setShowEditorModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Tips Jualan Produk Digital Laris Manis"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="5-tips-jualan-produk-digital"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500"
                  >
                    <option value="Tutorial">Tutorial</option>
                    <option value="UMKM Tips">UMKM Tips</option>
                    <option value="Feature Update">Feature Update</option>
                    <option value="Fintech & Payments">Fintech &amp; Payments</option>
                    <option value="Case Study">Case Study</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Language / Locale
                  </label>
                  <select
                    value={formData.locale}
                    onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500 font-mono"
                  >
                    <option value="id">Indonesian (id)</option>
                    <option value="en">English (en)</option>
                    <option value="ms">Malay (ms)</option>
                    <option value="th">Thai (th)</option>
                    <option value="vi">Vietnamese (vi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan singkat artikel untuk preview media sosial & meta description Google..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Article Content (Markdown supported) *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Tulis artikel lengkap di sini..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="publishToggle"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-slate-800 bg-slate-950 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="publishToggle" className="text-xs text-slate-300 cursor-pointer">
                  Publish article immediately to live platform blog
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowEditorModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save & Publish"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
