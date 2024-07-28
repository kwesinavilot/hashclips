"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Generator() {
    const [blogLink, setBlogLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [blogDetails, setBlogDetails] = useState(null);
    const [script, setScript] = useState(null);
    const [scriptLoading, setScriptLoading] = useState(false);

    useEffect(() => {
        if (blogDetails) {
            generateScript();
        }
    }, [blogDetails]);

    const handleCreateVideo = async () => {
        if (!blogLink) {
            setError("You entered nothing. Are you sure you want to generate the video?");
            return;
        }
        setError("");
        setLoading(true);
        setBlogDetails(null);
        setScript(null);

        try {
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

            setBlogDetails(data.content);
        } catch (error) {
            console.error("Error creating video:", error);
            setError("Failed to process blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const generateScript = async () => {
        setScriptLoading(true);
        // Simulate API call to GPT-4
        setTimeout(() => {
            setScript("This is a simulated GPT-4 generated script based on the blog content.");
            setScriptLoading(false);
        }, 3000); // 3 seconds delay to simulate API call
    };

    return (
        <div className="w-full bg-gray-100 px-6 py-16">
            <section className="w-[700px] mx-auto mb-12 rounded-md">
                <h3 className="text-center text-md font-bold mb-2 text-slate-500">
                    Copy and paste your Hashnode blog post URL here then click "Create Video" button
                </h3>

                <div className="flex w-full items-center space-x-4">
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

            <section className="grid grid-cols-2 gap-8 text-black">
                <div className="rounded-xl border bg-white shadow overflow-hidden">
                    <div className="space-y-1.5 p-6 bg-muted/50">
                        <h2 className="text-2xl font-bold mb-4">Blog Details</h2>
                    </div>
                    <div className="p-6 text-sm">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : blogDetails ? (
                            <>
                                <h3 className="text-xl font-semibold">{blogDetails.title}</h3>
                                <p className="text-gray-600 mt-2">Author: {blogDetails.author}</p>
                                <p className="mt-4">{blogDetails.brief}</p>
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">Tags:</h4>
                                    <ul className="list-disc list-inside">
                                        {blogDetails.tags.map((tag, index) => (
                                            <li key={index}>{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">Content Preview:</h4>
                                    <p>{blogDetails.content.substring(0, 200)}...</p>
                                </div>
                                <div className="p-6 flex flex-row items-center border-t bg-muted/50 mt-4">
                                    <div className="text-xs text-muted-foreground">
                                        Retrieved on <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>No blog content available. Enter a blog link and click "Create Video" to fetch content.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border bg-white shadow overflow-hidden">
                    <div className="space-y-1.5 p-6 bg-muted/50">
                        <h2 className="text-2xl font-bold mb-4">Generated Script</h2>
                    </div>
                    <div className="p-6 text-sm">
                        {!blogDetails ? (
                            <p>Waiting for blog content...</p>
                        ) : scriptLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : script ? (
                            <div>{script}</div>
                        ) : (
                            <p>Preparing to generate script...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}