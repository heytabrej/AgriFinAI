import { marked } from 'marked';

const SoilHealthReport = ({ report }) => {
  if (!report) return null;

  const getMarkdownText = () => {
    const rawMarkup = marked(report, { sanitize: true });
    return { __html: rawMarkup };
  };

  return (
    <div 
      className="prose prose-green max-w-none"
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default SoilHealthReport;