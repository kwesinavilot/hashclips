"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

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
                throw new Error(`Something went wrong: ${response.status}`);
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

    const getTagColor = (index) => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-yellow-100 text-yellow-800",
            "bg-purple-100 text-purple-800",
            "bg-pink-100 text-pink-800",
            "bg-indigo-100 text-indigo-800",
            "bg-red-100 text-red-800",
            "bg-teal-100 text-teal-800"
        ];
        return colors[index % colors.length];
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
                    <div className="space-y-1.5 p-6">
                        <h3 className="font-bold tracking-tight items-center text-lg">Blog Post Details</h3>
                        <p class="text-sm font-medium text-gray-500">Important information about the blog post.</p>
                    </div>

                    <div className="px-6 pb-6 text-sm">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : blogDetails ? (
                            <>
                                <div class="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <p class="text-sm font-semibold">Post Title</p>
                                    <h3 class="font-medium text-gray-500">
                                        {blogDetails.title}
                                    </h3>
                                </div>

                                <div class="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <p class="text-sm font-semibold">Author</p>
                                    <h3 class="font-medium text-gray-500">
                                        {blogDetails.author}
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-2 mb-6">
                                    <p className="text-sm font-semibold">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {blogDetails.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className={`${getTagColor(index)} hover:opacity-80`}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div class="grid flex-1 auto-rows-min gap-1">
                                    <p class="text-sm font-semibold">Post Preview</p>
                                    <h4 class="font-medium text-gray-500">
                                        {/* {blogDetails.brief} */}
                                        {blogDetails.content.substring(0, 500)}...
                                    </h4>
                                </div>

                                <div className="px-0 py-4 flex flex-row items-center border-t-2 mt-4">
                                    <div className="text-sm font-semibold text-gray-500">
                                        Retrieved on <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center font-semibold">No blog content available. Enter a blog link and click "Create Video" to fetch content.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border bg-white shadow overflow-hidden">
                    <div className="space-y-1.5 p-6 bg-muted/50">
                        <h3 className="font-bold tracking-tight items-center text-lg">Video Script</h3>
                        <p class="text-sm font-medium text-gray-500">This is a GPT-4 generated script based on the blog content.</p>
                    </div>
                    <div className="px-6 pb-6 text-sm">
                        {!blogDetails ? (
                            <p className="text-center font-semibold">Waiting for blog content...</p>
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
                            <p className="text-center font-semibold">Preparing to generate script...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}