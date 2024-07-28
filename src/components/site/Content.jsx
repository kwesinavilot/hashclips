"use client";
import React, { useState, useEffect } from "react";

export default function Content() {
    const [blogDetails, setBlogDetails] = useState(null);
    const [script, setScript] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scriptLoading, setScriptLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    useEffect(() => {
        if (blogDetails) {
            generateScript();
        }
    }, [blogDetails]);

    const fetchBlogDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/bridge");
            if (!response.ok) {
                throw new Error("Failed to fetch blog content");
            }
            const data = await response.json();
            setBlogDetails(data.content);
        } catch (err) {
            setError(err.message);
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

    if (loading) return <div>Loading blog content...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="grid grid-cols-2 gap-8 px-6 py-16 text-black bg-gray-100">
            <div className="rounded-xl border bg-white shadow overflow-hidden">
                <div className="space-y-1.5 p-6 bg-muted/50">
                    <h2 className="text-2xl font-bold mb-4">Blog Details</h2>
                    {blogDetails ? (
                        <>
                            <h3 className="text-xl font-semibold">{blogDetails.title}</h3>
                            <p className="text-gray-600 mt-2">Author: {blogDetails.author}</p>
                        </>
                    ) : (
                        <p>No blog content available</p>
                    )}
                </div>

                {blogDetails && (
                    <div className="p-6 text-sm">
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
                    </div>
                )}
            </div>

            <div className="rounded-xl border bg-white shadow overflow-hidden">
                <div className="space-y-1.5 p-6 bg-muted/50">
                    <h2 className="text-2xl font-bold mb-4">Generated Script</h2>
                </div>
                <div className="p-6 text-sm">
                    {scriptLoading ? (
                        <div>Generating script...</div>
                    ) : script ? (
                        <div>{script}</div>
                    ) : (
                        <div>Waiting for blog content...</div>
                    )}
                </div>
            </div>
        </section>
    );
}