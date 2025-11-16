"use client";

import * as React from "react";
import { feedbacks } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  ArchiveX,
  Star,
  User,
  Mail,
  MessageSquare,
  Calendar,
  Inbox,
  File,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  Trash2,
  Archive,
  RefreshCw,
  MoreVertical,
  X,
  Check,
  FolderHeart,
  HeartPlus,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
type Feedback = InferSelectModel<typeof feedbacks>;

const categories = [
  {
    title: "Inbox",
    icon: Inbox,
    count: 0,
    filter: "all",
  },
  {
    title: "Starred",
    icon: FolderHeart,
    count: 0,
    filter: "starred",
  },
  {
    title: "5 Stars",
    icon: Star,
    count: 0,
    filter: 5,
  },
  {
    title: "4 Stars",
    icon: Star,
    count: 0,
    filter: 4,
  },
  {
    title: "Low Ratings",
    icon: ArchiveX,
    count: 0,
    filter: "low",
  },
  {
    title: "No Rating",
    icon: File,
    count: 0,
    filter: null,
  },
];

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) {
    return <span className="dark:text-neutral-400">N/A</span>;
  }

  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xs font-medium text-gray-700 dark:text-neutral-300">
        {rating}
      </span>
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    </div>
  );
}

function LargeStarRating({ rating }: { rating: number | null }) {
  if (rating === null) {
    return <span className="text-gray-500 dark:text-neutral-400">N/A</span>;
  }
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 dark:text-neutral-600"
          }`}
        />
      ))}
      <span className="ml-3 text-md text-neutral-500 dark:text-neutral-400">
        {rating} out of 5 stars
      </span>
    </div>
  );
}

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
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-200 ease-in-out lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 lg:border-0 dark:lg:border-0">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text size-10 text-blue-500 dark:text-blue-400 p-1 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-inner shadow-neutral-300 dark:shadow-neutral-700"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" />
              </svg>
              <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-100 text-shadow-lg">
                Pulsea
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeFilter === category.filter;
                const count = counts[String(category.filter)] || 0;

                return (
                  <li key={category.title}>
                    <button
                      onClick={() => {
                        onFilterChange(category.filter);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-sm transition-colors ${
                        isActive
                          ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium"
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 ${
                            isActive
                              ? "text-red-600 dark:text-red-500"
                              : "text-neutral-600 dark:text-neutral-400"
                          }`}
                        />
                        <span className="text-md font-semibold">
                          {category.title}
                        </span>
                      </div>
                      {count > 0 && (
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
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
      className={`flex items-start gap-3 px-4 py-3 border-b border-gray-200 dark:border-neutral-700 cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-950/30"
          : "hover:bg-gray-50 dark:hover:bg-neutral-800"
      }`}
    >
      {/* Star */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar();
            }}
            className="pt-1 hover:scale-110 transition-transform"
          >
            <HeartPlus
              className={`h-5 w-5 cursor-pointer ${
                isStarred
                  ? "fill-rose-500 text-rose-500"
                  : "text-neutral-400 dark:text-neutral-600 hover:text-rose-500 dark:hover:text-rose-500"
              }`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to favourites</p>
        </TooltipContent>
      </Tooltip>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-md text-neutral-900 dark:text-neutral-100 truncate">
                {feedback.userName || "Anonymous"}
              </span>
              <StarRating rating={feedback.rating} />
            </div>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {feedback.createdAt &&
              new Date(feedback.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 truncate">
          {feedback.userEmail || "No email"}
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {feedback.message || "No message provided"}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({
  feedback,
  onClose,
}: {
  feedback: Feedback | null;
  onClose?: () => void;
}) {
  if (!feedback) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center text-gray-500 dark:text-neutral-400">
          <Mail className="h-24 w-24 mx-auto mb-4 opacity-20" />
          <p className="text-lg">Select a feedback to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col">
      {/* Mobile header */}
      {onClose && (
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 dark:text-neutral-300" />
          </button>
          <h2 className="font-semibold text-gray-900 dark:text-neutral-100">
            Feedback
          </h2>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-shadow-md text-neutral-900 dark:text-neutral-100 mb-4">
                Feedback from {feedback.userName || "Anonymous"}
              </h1>
              <LargeStarRating rating={feedback.rating} />
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
              <Trash2 className="h-4 w-4 text-gray-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* User Info Card */}
          <div className="">
            <div className="flex flex-col items-start gap-4">
              <div className="flex gap-1 justify-center items-center text-neutral-900 dark:text-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-user-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
                  <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
                </svg>
                UserDetails
              </div>
              <div className="pl-7">
                <div className="flex flex-col items-start justify-between mb-2 gap-5">
                  <div className="flex flex-col items-start justify-center gap-5">
                    <div className="font-medium text-gray-900 dark:text-neutral-100">
                      {feedback.userName || "Anonymous"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-neutral-400">
                      {feedback.userEmail || "No email provided"}
                    </div>
                  </div>
                  {feedback.createdAt && (
                    <div className="text-sm text-gray-500 dark:text-neutral-400">
                      {new Date(feedback.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-3">
            <h3 className="font-medium text-gray-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-message"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" />
              </svg>
              Message
            </h3>
            <div className="prose prose-sm max-w-none pl-7">
              {feedback.message ? (
                <p className="text-gray-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {feedback.message}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-neutral-500 italic">
                  No message provided
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  // Filter feedbacks
  const filteredFeedbacks = React.useMemo(() => {
    let filtered = [...feedbackData];

    // Apply category filter
    if (activeFilter === "starred") {
      filtered = filtered.filter((f) => starredIds.has(f.id));
    } else if (activeFilter === 5 || activeFilter === 4) {
      filtered = filtered.filter((f) => f.rating === activeFilter);
    } else if (activeFilter === "low") {
      filtered = filtered.filter((f) => f.rating !== null && f.rating <= 3);
    } else if (activeFilter === null) {
      filtered = filtered.filter((f) => f.rating === null);
    }

    // Apply search filter
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

  // Calculate counts
  const counts = React.useMemo(() => {
    const result: Record<string, number> = {
      all: feedbackData.length,
      starred: starredIds.size,
      "5": feedbackData.filter((f) => f.rating === 5).length,
      "4": feedbackData.filter((f) => f.rating === 4).length,
      low: feedbackData.filter((f) => f.rating !== null && f.rating <= 3)
        .length,
      null: feedbackData.filter((f) => f.rating === null).length,
    };
    return result;
  }, [feedbackData, starredIds]);

  const handleToggleStar = (id: number) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowDetail(true);
  };

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-neutral-400" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-[430px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-neutral-500" />
              <input
                type="text"
                placeholder="Search feedback"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-gray-500 dark:placeholder:text-neutral-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-neutral-700 transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Feedback List */}
          <div
            className={`${
              showDetail ? "hidden lg:block" : "block"
            } w-full lg:w-96 xl:w-md bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 flex flex-col overflow-hidden`}
          >
            {/* List Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-900 dark:text-neutral-100">
                  {categories.find((c) => c.filter === activeFilter)?.title ||
                    "Inbox"}
                </h2>
                <span className="text-sm text-gray-500 dark:text-neutral-400">
                  {filteredFeedbacks.length}
                </span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredFeedbacks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 p-8 text-center">
                  <Inbox className="h-16 w-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-1">No feedback found</p>
                  <p className="text-sm">
                    {searchQuery
                      ? "Try a different search term"
                      : "This folder is empty"}
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

          {/* Detail Panel */}
          <div
            className={`${
              !showDetail ? "hidden lg:flex" : "flex"
            } flex-1 overflow-hidden`}
          >
            <DetailPanel
              feedback={selectedFeedback}
              onClose={() => setShowDetail(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
