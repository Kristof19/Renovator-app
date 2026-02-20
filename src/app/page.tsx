import RenovationForm from "@/components/RenovationForm";

export default function Home() {
    return (
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
                        ✨ AI-Powered Website Transformation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tight mb-6 drop-shadow-sm">
                        Website Renovator <span className="text-blue-500">AI</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto leading-relaxed">
                        Transform outdated local business websites into modern, high-conversion masterpieces instantly.
                        <span className="block mt-2 text-slate-500 text-base">Powered by Google Gemini 1.5 Pro</span>
                    </p>
                </div>

                <RenovationForm />

                <footer className="mt-24 text-center text-sm text-slate-600 border-t border-slate-800/50 pt-8">
                    <p>© {new Date().getFullYear()} Website Renovator AI. Built for speed and conversion.</p>
                </footer>
            </div>
        </main>
    );
}
