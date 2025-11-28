"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Message {
  role: "user" | "assistant";
  content: string;
}
export function AiChat({ projectId }: { projectId: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        console.log("Invalid response from AI API", data);
      }
    } catch (error) {
      console.log("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2 w-full cursor-pointer bg-neutral-800 dark:bg-neutral-200 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2">
          <Bot className="size-4" />
          Ask AI
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full px-1">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Feedback Assistant
          </SheetTitle>
          <SheetDescription>
            Ask questions about your project's feedback, feature requests, and
            bugs.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex flex-col mt-4">
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="flex flex-col gap-4 pb-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
                  <Bot className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">
                    No messages yet. Start the conversation!
                  </p>
                  <p className="text-xs mt-2 opacity-70">
                    Try asking: "What are the top feature requests?"
                  </p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 text-sm  font-semibold max-w-[80%] whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2">
                    <span className="animate-pulse">Thinking</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 pb-1 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about feedback..."
              disabled={isLoading}
              className="flex-1 min-h-10 max-h-[120px] resize-none"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
