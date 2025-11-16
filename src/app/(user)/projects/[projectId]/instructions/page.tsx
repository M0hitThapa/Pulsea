import { Container } from "@/components/container";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) => {
  const { projectId } = await params;

  if (!projectId) {
    return <div>Invalid project id</div>;
  }

  if (!process.env.WIDGET_URL) {
    return <div>Missing WIDGET_URL</div>;
  }

  const embedCode = `<my-widget project-id="${projectId}"></my-widget>
<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`;

  return (
    <Container className="max-w-3xl py-10 space-y-8">
      <Link href="/dashboard">
        <Button variant="outline">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left-dashed"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12h6m3 0h1.5m3 0h.5" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
          </svg>
          Back
        </Button>
      </Link>
      {/* Title */}
      <div className="mt-20">
        <h1
          className="text-3xl font-semibold tracking-tight text-shadow-lg
        "
        >
          Start collecting feedback
        </h1>
        <p className="text-muted-foreground mt-2 text-md font-medium">
          Add this embed code to your website to activate your widget.
        </p>
      </div>

      {/* Code Block */}
      <div className="flex justify-between items-start bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 rounded p-5 border border-neutral-300 dark:border-neutral-700 shadow-lg">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {embedCode}
        </pre>

        <div className="">
          <CopyButton text={embedCode} />
        </div>
      </div>
    </Container>
  );
};

export default Page;
