import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

import "./code-theme.css";

interface Props {
  code: string;
  language: string;
}

export const CodeView = ({ code, language }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre className="p-2 bg-transparent border-none rounded-none m-0 text-xs">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};
