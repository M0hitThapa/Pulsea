"use client";

import * as React from "react";
import { feedbacks } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  ArchiveX,
  Star,
  Mail,
  Inbox,
  File,
  Search,
  Menu,
  X,
  FolderHeart,
  HeartPlus,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { db } from "@/db";
import Link from "next/link";
type Feedback = InferSelectModel<typeof feedbacks>;

const categories = [
  {
    title: "Inbox",
    icon: Inbox,
    count: 0,
    filter: "all",
  },
  {
    title: "Favourites",
    icon: FolderHeart,
    count: 0,
    filter: "favourites",
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
            <div className="flex justify-between items-center">
              <Link href="/">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text size-10 text-neutral-900 dark:text-neutral-100 p-1 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-inner shadow-neutral-300 dark:shadow-neutral-700"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" />
                  </svg>
                  <span className="text-2xl font-semibold text-neutral-950 dark:text-neutral-100 text-shadow-lg">
                    Pulsea
                  </span>
                </div>
              </Link>
              <button onClick={onClose} className="lg:hidden">
                <X className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
              </button>
            </div>
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
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-neutral-800 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-300 dark:text-neutral-600"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <p className="text-gray-400 dark:text-neutral-500 font-light">
            Select a feedback to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col">
      {/* Mobile header */}
      {onClose && (
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header with delete action */}
          <div className="flex items-start justify-between mb-12">
            <div className="space-y-4">
              <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-xs font-medium text-gray-600 dark:text-neutral-400">
                Feedback
              </div>
              <LargeStarRating rating={feedback.rating} />
            </div>
            <button className="p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 group-hover:text-red-500 transition-colors"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>

          {/* User Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-500 uppercase tracking-wide">
                User Details
              </h2>

              <div className="space-y-4 pl-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 dark:text-neutral-400"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-neutral-100 font-medium">
                      {feedback.userName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Name
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 dark:text-neutral-400"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-neutral-100 font-medium">
                      {feedback.userEmail || "Not provided"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Email
                    </p>
                  </div>
                </div>

                {feedback.createdAt && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 dark:text-neutral-400"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-neutral-100 font-medium">
                        {new Date(feedback.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-neutral-500">
                        {new Date(feedback.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-neutral-800" />

            {/* Message */}
            <div className="space-y-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-500 uppercase tracking-wide">
                Message
              </h2>

              {feedback.message ? (
                <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {feedback.message}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-6 text-center">
                  <p className="text-gray-400 dark:text-neutral-500 italic text-sm">
                    No message provided
                  </p>
                </div>
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

    // Apply category filter - FIXED: changed "starred" to "favourites"
    if (activeFilter === "favourites") {
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

  // Calculate counts - FIXED: changed "starred" key to "favourites"
  const counts = React.useMemo(() => {
    const result: Record<string, number> = {
      all: feedbackData.length,
      favourites: starredIds.size,
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

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Feedback List */}
          <div
            className={`${
              showDetail ? "hidden lg:block" : "block"
            } w-full lg:w-96 xl:w-md bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 flex flex-col overflow-hidden`}
          >
            {/* List Header */}
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
