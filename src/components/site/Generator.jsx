"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Generator() {
    const [blogLink, setBlogLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateVideo = async () => {
        if (!blogLink) {
            setError("You entered nothing. Are you sure you want to generate the video?");
            return;
        }
        setError(""); // Clear error if there is any input
        setLoading(true);

        try {
            // console.log("Fetching blog post:", blogLink);

            const response = await fetch("/api/bridge/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ blogLink: blogLink })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Blog post data:", data);
        } catch (error) {
            console.error("Error creating video:", error);
            setError("Failed to process blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-[700px] mx-auto mb-8 rounded-md">
            <h3 className="text-center text-md font-bold mb-2 text-slate-500">
                Copy and paste your Hashnode blog post URL here then click "Create Video" button
            </h3>

            <div className="flex w-full items-center space-x-2">
                <Input
                    value={blogLink}
                    onChange={(e) => setBlogLink(e.target.value)}
                    placeholder="https://kwesinavilot.hashnode.dev/my-insightful-post"
                    className="flex h-12 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />

                <Button
                    onClick={handleCreateVideo}
                    disabled={loading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 h-12 px-4 py-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </>
                    ) : (
                        "Create Video"
                    )}
                </Button>
            </div>

            {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
            )}
        </section>
    );
}
