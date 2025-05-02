import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-zinc-800 overflow-x-hidden",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 leading-normal">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-3 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-3 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1 last:mb-0">{children}</li>,
          code: ({ node, inline, className, children, ...props }) => {
            return !inline ? (
              <pre className="bg-zinc-100 p-3 rounded-lg mb-3 last:mb-0 overflow-x-auto max-w-full">
                <code className={cn("text-sm", className)} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code
                className="bg-zinc-100 px-1.5 py-0.5 rounded text-[0.9em]"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-zinc-300 pl-4 italic mb-3 last:mb-0">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg max-w-full h-auto my-2"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3 last:mb-0">
              <table className="min-w-full divide-y divide-zinc-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-sm font-medium bg-zinc-50">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-sm">{children}</td>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto max-w-full">{children}</pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
