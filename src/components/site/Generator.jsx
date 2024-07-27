import React from "react";

export default function Generator() {
    return (
        <section className="w-[700px] mx-auto mb-8 rounded-md">
            <h3 className="text-center text-md font-bold mb-2 text-slate-500">
                Copy and paste your Hashnode blog post URL here then click "Create Video" button
            </h3>

            <div className="flex w-full items-center space-x-2">
                <input
                    type="search"
                    placeholder="https://kwesinavilot.hashnode.dev/my-insightful-post"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />

                <button type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 h-12 px-4 py-2" href="#"
                >
                    Create Video
                </button>
            </div>
        </section>
    );
}