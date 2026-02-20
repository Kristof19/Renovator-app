"use client";

import { useEffect, useRef } from "react";

interface WebsitePreviewProps {
    html: string;
}

export function WebsitePreview({ html }: WebsitePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const doc = iframeRef.current.contentDocument;
            if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
            }
        }
    }, [html]);

    if (!html) {
        return null;
    }

    return (
        <div className="w-full h-full min-h-[500px] border rounded-lg overflow-hidden bg-white shadow-sm">
            <iframe
                ref={iframeRef}
                title="Website Preview"
                className="w-full h-full min-h-[600px]"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
