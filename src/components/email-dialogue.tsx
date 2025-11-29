"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/actions/sendEmail";
import { Reply, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailDialogProps {
  recipientEmail: string;
  recipientName: string | null;
  feedbackMessage?: string;
}

export function EmailDialog({
  recipientEmail,
  recipientName,
  feedbackMessage,
}: EmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: `Re: Your feedback`,
    message: `Hi ${recipientName || "there"},\n\nThank you for your feedback! `,
    senderName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await sendEmail({
        to: recipientEmail,
        subject: formData.subject,
        message: formData.message,
        senderName: formData.senderName,
      });

      if (result.success) {
        toast.success("Email sent successfully!");
        setOpen(false);
        // Reset form
        setFormData({
          subject: `Re: Your feedback`,
          message: `Hi ${
            recipientName || "there"
          },\n\nThank you for your feedback! `,
          senderName: "",
        });
      } else {
        toast.error(result.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-100 cursor-pointer dark:bg-neutral-200 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2">
          <Reply className="h-4 w-4" />
          Reply via Email
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-zinc-950 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Reply via Email
          </DialogTitle>
          <DialogDescription className="text-sm">
            Send a personalized email response to{" "}
            {recipientName || recipientEmail}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={recipientEmail}
              disabled
              className="bg-zinc-50 dark:bg-zinc-900"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="senderName">Sender Name</Label>
            <Input
              id="senderName"
              value={formData.senderName}
              onChange={(e) =>
                setFormData({ ...formData, senderName: e.target.value })
              }
              placeholder="Your Name or Company"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Email subject"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your message..."
              rows={8}
              required
              className="resize-none"
            />
          </div>

          {feedbackMessage && (
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">
                Original Feedback
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
                {feedbackMessage}
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-100 cursor-pointer dark:bg-neutral-200 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Reply className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
