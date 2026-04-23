import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent = ({ content, className = '' }: MarkdownContentProps) => {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="text-gray-400 leading-relaxed mb-2">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
          ul: ({ children }) => <ul className="list-disc list-inside text-gray-400 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-400 mb-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return isInline ? (
              <code className="bg-black/30 px-1.5 py-0.5 rounded text-accent-400 font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <code className={`block bg-black/30 p-3 rounded-lg text-accent-400 font-mono text-sm my-2 overflow-x-auto ${className}`} {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-500 pl-4 italic text-gray-300 my-2">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-4 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-3 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-2 mb-1">{children}</h3>,
          a: ({ children, href }) => (
            <a href={href} className="text-accent-500 hover:text-accent-400 underline transition-colors">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
