"use client";

import * as React from "react";
import { feedbacks } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  ArchiveX,
  Star,
  Inbox,
  FileText,
  Search,
  Menu,
  X,
  FolderHeart,
  Heart,
  MoreVertical,
  Reply,
  Trash2,
  User,
  Calendar,
  Mail,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { Button } from "./ui/button";

type Feedback = InferSelectModel<typeof feedbacks>;

// --- Utility Components ---

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function Avatar({
  name,
  email,
}: {
  name: string | null;
  email: string | null;
}) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : email
    ? email.substring(0, 2).toUpperCase()
    : "??";

  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-white dark:ring-zinc-900">
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return null;

  return (
    <div className="flex items-center gap-0.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-1.5 py-0.5 rounded-md">
      <span className="text-xs font-bold text-amber-700 dark:text-amber-500">
        {rating}
      </span>
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
    </div>
  );
}

// --- Configuration ---

const categories = [
  { title: "Inbox", icon: Inbox, count: 0, filter: "all" },
  { title: "Favourites", icon: FolderHeart, count: 0, filter: "favourites" },
  { title: "5 Stars", icon: Star, count: 0, filter: 5 },
  { title: "4 Stars", icon: Star, count: 0, filter: 4 },
  { title: "Low Ratings", icon: ArchiveX, count: 0, filter: "low" },
  { title: "No Rating", icon: FileText, count: 0, filter: null },
];

// --- Sub-Components ---

function Sidebar({
  isOpen,
  onClose,
  activeFilter,
  onFilterChange,
  counts,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: any;
  onFilterChange: (filter: any) => void;
  counts: Record<string, number>;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-all">
              <div className="h-5 w-5 bg-blue-600 rounded-md" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Pulsea
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <div className="px-3 pb-4">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-3 mb-2">
            Menu
          </div>
          <nav className="space-y-0.5">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeFilter === category.filter;
              const count = counts[String(category.filter)] || 0;

              return (
                <button
                  key={category.title}
                  onClick={() => {
                    onFilterChange(category.filter);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    isActive
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-zinc-500"
                      )}
                    />
                    <span>{category.title}</span>
                  </div>
                  {count > 0 && (
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-md min-w-[1.25rem] text-center",
                        isActive
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-400"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <User className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                Admin Account
              </p>
              <p className="text-xs text-zinc-500 truncate">admin@pulsea.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function FeedbackListItem({
  feedback,
  isSelected,
  isStarred,
  onSelect,
  onToggleStar,
}: {
  feedback: Feedback;
  isSelected: boolean;
  isStarred: boolean;
  onSelect: () => void;
  onToggleStar: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative flex gap-3 px-4 py-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer transition-all duration-200",
        isSelected
          ? "bg-blue-50/50 dark:bg-blue-950/20 border-l-2 border-l-blue-500 pl-[14px]" // slightly less padding left to account for border
          : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-l-2 border-l-transparent"
      )}
    >
      <div className="flex-shrink-0 pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar();
          }}
          className="text-zinc-300 dark:text-zinc-600 hover:scale-110 transition-transform"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isStarred ? "fill-rose-500 text-rose-500" : "hover:text-rose-400"
            )}
          />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span
            className={cn(
              "text-sm font-semibold truncate",
              isSelected
                ? "text-blue-900 dark:text-blue-100"
                : "text-zinc-900 dark:text-zinc-100"
            )}
          >
            {feedback.userName || "Anonymous"}
          </span>
          <span className="text-xs text-zinc-400 whitespace-nowrap font-medium">
            {feedback.createdAt &&
              new Date(feedback.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>

        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate pr-4">
            {feedback.userEmail || "No email provided"}
          </div>
          <StarRating rating={feedback.rating} />
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {feedback.message || (
            <span className="italic text-zinc-400">No message content</span>
          )}
        </p>
      </div>
    </div>
  );
}

function DetailPanel({
  feedback,
  onClose,
}: {
  feedback: Feedback | null;
  onClose: () => void;
}) {
  if (!feedback) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center max-w-xs text-center p-6">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 rotate-3">
            <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center -rotate-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
              <Inbox className="h-8 w-8 text-zinc-400" />
            </div>
          </div>
          <h3 className="text-zinc-900 dark:text-zinc-100 font-medium text-lg mb-2">
            No Feedback Selected
          </h3>
          <p className="text-zinc-500 text-sm">
            Select an item from the list to view details, ratings, and user
            information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col h-full">
      {/* Header Toolbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="lg:hidden mr-2 p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                <ArchiveX className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-red-600 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-mono">
            ID: #{feedback.id}
          </span>
          <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Top Card: User Info & Meta */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 p-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar name={feedback.userName} email={feedback.userEmail} />
              <div>
                <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {feedback.userName || "Anonymous User"}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  <a
                    href={`mailto:${feedback.userEmail}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {feedback.userEmail || "No email provided"}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Calendar className="h-3.5 w-3.5" />
                {feedback.createdAt
                  ? new Date(feedback.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "N/A"}
              </div>
              {feedback.rating !== null && (
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < (feedback.rating as number)
                          ? "fill-current"
                          : "text-zinc-300 dark:text-zinc-700"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
              Feedback Message
            </h3>
            <div className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {feedback.message || "No content."}
            </div>
          </div>
        </div>
      </div>

      {/* Reply Action Footer */}
      <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
            <Reply className="h-4 w-4" />
            Reply via Email
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Main Layout Component ---

export function FeedbackSidebar({
  feedbackData,
}: {
  feedbackData: Feedback[];
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<any>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFeedback, setSelectedFeedback] =
    React.useState<Feedback | null>(null);
  const [starredIds, setStarredIds] = React.useState<Set<number>>(new Set());
  const [showDetail, setShowDetail] = React.useState(false);

  // Logic mostly unchanged, just refined
  const filteredFeedbacks = React.useMemo(() => {
    let filtered = [...feedbackData];
    if (activeFilter === "favourites") {
      filtered = filtered.filter((f) => starredIds.has(f.id));
    } else if (activeFilter === 5 || activeFilter === 4) {
      filtered = filtered.filter((f) => f.rating === activeFilter);
    } else if (activeFilter === "low") {
      filtered = filtered.filter((f) => f.rating !== null && f.rating <= 3);
    } else if (activeFilter === null) {
      filtered = filtered.filter((f) => f.rating === null);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.userName?.toLowerCase().includes(query) ||
          f.userEmail?.toLowerCase().includes(query) ||
          f.message?.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [feedbackData, activeFilter, searchQuery, starredIds]);

  const counts = React.useMemo(() => {
    return {
      all: feedbackData.length,
      favourites: starredIds.size,
      "5": feedbackData.filter((f) => f.rating === 5).length,
      "4": feedbackData.filter((f) => f.rating === 4).length,
      low: feedbackData.filter((f) => f.rating !== null && f.rating <= 3)
        .length,
      null: feedbackData.filter((f) => f.rating === null).length,
    };
  }, [feedbackData, starredIds]);

  const handleToggleStar = (id: number) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowDetail(true);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden font-sans text-zinc-900 dark:text-zinc-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex w-full overflow-hidden relative">
        {/* List View */}
        <div
          className={cn(
            "w-full lg:w-[400px] xl:w-[450px] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-0",
            showDetail ? "hidden lg:flex" : "flex"
          )}
        >
          {/* List Search Header */}
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
              >
                <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </button>
              <h2 className="text-xl font-bold tracking-tight">
                {categories.find((c) => c.filter === activeFilter)?.title ||
                  "Inbox"}
              </h2>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:bg-white dark:focus:bg-zinc-900 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg text-sm transition-all outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto  scrollbar-hide ">
            {filteredFeedbacks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-zinc-300" />
                </div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                  No results found
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <FeedbackListItem
                  key={feedback.id}
                  feedback={feedback}
                  isSelected={selectedFeedback?.id === feedback.id}
                  isStarred={starredIds.has(feedback.id)}
                  onSelect={() => handleSelectFeedback(feedback)}
                  onToggleStar={() => handleToggleStar(feedback.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Detail View */}
        <div
          className={cn(
            "flex-1 bg-white dark:bg-zinc-950 relative",
            !showDetail
              ? "hidden lg:flex"
              : "flex absolute inset-0 lg:static z-10"
          )}
        >
          <DetailPanel
            feedback={selectedFeedback}
            onClose={() => setShowDetail(false)}
          />
        </div>
      </div>
    </div>
  );
}
