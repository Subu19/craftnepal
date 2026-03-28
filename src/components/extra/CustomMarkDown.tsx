const CustomMarkDown = ({ children }: { children: string }) => {
  // Simple regex-based markdown parser for basic needs
  if (!children) return null;

  const html = children
    .replace(/^# (.*$)/gim, '<h1 class="normaltext guideHighlight">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="normaltext guideHighlight">$1</h2>')
    .replace(/^[-*] (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/\n/g, '<br />');

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
export default CustomMarkDown;
