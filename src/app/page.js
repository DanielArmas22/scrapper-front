"use client";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import Chat from "@/components/Chat";
import { searchWallapop } from "@/services/api";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("search"); // 'search' or 'chat'

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await searchWallapop(formData);
      setResults(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Wallapop Car Search Scraper
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "search"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-blue-500"
            }`}
          onClick={() => setActiveTab("search")}
        >
          Search Form
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "chat"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-blue-500"
            }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat Assistant
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "search" ? (
        <>
          <SearchForm onSubmit={handleSubmit} />

          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {results && <ResultsDisplay results={results} />}
        </>
      ) : (
        <Chat />
      )}
    </div>
  );
}
