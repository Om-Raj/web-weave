import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface Props {
    fragment: Fragment;
}

export const FragmentPreview = ({ fragment }: Props) => {

    const [fragmentKey, setFragmentKey] = useState(0);
    const [copied, setCopied] = useState(false);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fragment.sandboxUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center p-2 border-b bg-sidebar gap-x-2">
                <Hint text="Refresh" align="start">
                    <Button size="sm" variant="outline" onClick={onRefresh}>
                        <RefreshCcwIcon />
                    </Button>
                </Hint>
                <Hint text="Click to copy">
                    <Button 
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        disabled={!fragment.sandboxUrl || copied}
                        className="flex-1 justify-start text-start font-normal"
                    >
                        <span className="truncate">
                            { fragment.sandboxUrl }
                        </span>
                    </Button>
                </Hint>
                <Hint text="Open in a new tab" align="end">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            if (!fragment.sandboxUrl) return;
                            window.open(fragment.sandboxUrl, "_blank");
                        }}
                        disabled={!fragment.sandboxUrl}
                    >
                        <ExternalLinkIcon />
                    </Button>
                </Hint>
            </div>
            <iframe 
                key={fragmentKey}
                className="w-full h-full"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={fragment.sandboxUrl}
            />
        </div>
    );
};