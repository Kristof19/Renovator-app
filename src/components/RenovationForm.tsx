"use client";

import { useState } from "react";
import { Copy, Loader2, Sparkles, Settings, FileUp, Info } from "lucide-react";
import { generateRenovationPrompt } from "@/lib/prompt-template";
import { generateContent } from "@/lib/gemini";
import { WebsitePreview } from "./WebsitePreview";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function RenovationForm() {
    const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
    const [industry, setIndustry] = useState("");
    const [colors, setColors] = useState("");
    const [oldHtml, setOldHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState("");
    const [showSettings, setShowSettings] = useState(false);

    // Generate the prompt locally
    const prompt = generateRenovationPrompt({ industry, colors, oldHtml });

    const handleGenerate = async () => {
        if (!apiKey) {
            alert("Please enter a Google Gemini API Key in settings.");
            setShowSettings(true);
            return;
        }

        setLoading(true);
        try {
            const result = await generateContent(apiKey, prompt);
            // Strip markdown code blocks if present
            const cleanHtml = result.replace(/```html/g, "").replace(/```/g, "");
            setGeneratedHtml(cleanHtml);
        } catch (error) {
            console.error(error);
            alert("Failed to generate content. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(prompt);
        alert("Prompt copied to clipboard!");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
            {/* LEFT COLUMN: Controls */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
            >
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-8 bg-blue-500 rounded-full inline-block" />
                                Configuration
                            </h2>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>

                        <AnimatePresence>
                            {showSettings && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <div className="p-4 bg-slate-950/50 rounded-xl border border-white/10">
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Google Gemini API Key
                                        </label>
                                        <input
                                            type="password"
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            className="w-full p-3 rounded-lg bg-slate-900 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-600"
                                            placeholder="AIza..."
                                        />
                                        <p className="text-xs text-slate-500 mt-2">
                                            Required for automatic generation. Your key is not stored permanently.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6">
                            {/* PDF Upload Placeholder */}
                            <div className="p-4 border border-dashed border-white/10 rounded-xl bg-white/5 opacity-60 cursor-not-allowed relative">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg">
                                            <FileUp className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-300">Upload PDF Guidelines</p>
                                            <p className="text-xs text-slate-500">Attach brand book or instructions</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-full flex items-center gap-1">
                                        <Info className="w-3 h-3" /> Coming Soon
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Industry / Business Type
                                </label>
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="e.g. Plumbing, Dental Clinic, Auto Shop"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Preferred Colors (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={colors}
                                    onChange={(e) => setColors(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="e.g. Navy Blue & Gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Old Website HTML (Source)
                                </label>
                                <textarea
                                    value={oldHtml}
                                    onChange={(e) => setOldHtml(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all h-40 font-mono text-xs leading-relaxed"
                                    placeholder="Paste the <body> content or full HTML here..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !industry || !oldHtml}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                                loading || !industry || !oldHtml
                                    ? "bg-slate-800 cursor-not-allowed opacity-50"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Renovating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate New Site
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleCopyPrompt}
                            disabled={!industry || !oldHtml}
                            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:text-white"
                            title="Copy Prompt to Clipboard"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT COLUMN: Preview */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6 h-full flex flex-col"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                    {generatedHtml && (
                        <button
                            onClick={() => {
                                const blob = new Blob([generatedHtml], { type: "text/html" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "index.html";
                                a.click();
                            }}
                            className="text-sm px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full hover:bg-green-500/20 transition-colors"
                        >
                            Download HTML
                        </button>
                    )}
                </div>
                <div className="flex-grow min-h-[600px] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 group">
                    <WebsitePreview html={generatedHtml} />
                    {!generatedHtml && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500/50 pointer-events-none p-8 text-center">
                            <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg font-light">Your new website will appear here.</p>
                            <p className="text-sm opacity-50 mt-2">Fill the form and click "Generate New Site"</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
