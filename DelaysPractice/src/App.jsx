import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
// Skeleton component to practice different types of delays in React
export default function DelaysPractice() {
  // States for practicing different delay scenarios
  const [loadingData, setLoadingData] = useState(false);
  const [exportingFile, setExportingFile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [vulnerabilityCount, setVulnerabilityCount] = useState(0);

  const searchTimeoutRef = useRef(null);

  // Mock data similar to your project
  const mockVulnerabilities = [
    { id: 'CVE-2024-001', vendor: 'Microsoft', name: 'Buffer Overflow' },
    { id: 'CVE-2024-002', vendor: 'Apache', name: 'SQL Injection' },
    { id: 'CVE-2024-003', vendor: 'Oracle', name: 'XSS Vulnerability' }
  ];

  // TODO: Practice 1 - Simple delay with setTimeout
  // Create a function that simulates fetching vulnerability data
  // - Set loadingData to true immediately
  // - After 2 seconds, set the vulnerabilityCount and turn off loading
  const fetchVulnerabilities = async () => {
    // YOUR CODE HERE
    setLoadingData(true)

    setTimeout(() => {
      setVulnerabilityCount(mockVulnerabilities.length)
      setLoadingData(false)
    }, 2000)
    console.log('TODO: Add 2 second delay then set vulnerabilityCount to mockVulnerabilities.length');
  };

  // TODO: Practice 2 - Delay with Promise and async/await
  // Create a function that simulates exporting a CSV file
  // - Set exportingFile to true
  // - Wait 3 seconds using a Promise
  // - Show a success notification for 2 more seconds
  // - Clean up all states
  const exportWithDelay = async () => {
    // YOUR CODE HERE
    setExportingFile(true)

    await new Promise(resolve => setTimeout(resolve, 3000))

    setShowNotification(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    setExportingFile(false)
    setShowNotification(false)
    console.log('TODO: Add export simulation with delays');
  };

  // TODO: Practice 3 - Debounced search (advanced)
  // Create a search function that only searches after user stops typing for 500ms
  // - Set isTyping to true immediately when user types
  // - Clear any existing timeout
  // - Set a new timeout for 500ms
  // - After timeout, perform search and set isTyping to false
  
 const handleSearch = (searchTerm) => {
  setIsTyping(true);
  
  // Clear existing timeout (if any)
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
  
  // Store new timeout ID in the ref
  searchTimeoutRef.current = setTimeout(() => {
    // Do the search
    const filtered = mockVulnerabilities.filter(vuln => 
      vuln.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
    setIsTyping(false);
  }, 500);
};

  // TODO: Practice 4 - Staggered animations
  // Create a function that shows vulnerability items one by one with delays
  // - Clear current results
  // - Add each vulnerability with 300ms delays between each
const showResultsWithStagger = async () => {
  setSearchResults([]);
  
  for (let i = 0; i < mockVulnerabilities.length; i++) {
    setSearchResults(prev => [...prev, mockVulnerabilities[i]]);
    
    // Add delay between items (not after the last one)
    if (i < mockVulnerabilities.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
};

  // TODO: Practice 5 - Cleanup and cancellation
  // Learn how to cancel ongoing delays when component unmounts or user navigates away
  // Research useEffect cleanup functions!
  useEffect(() => {

    return () => {
      if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    }
  }, [])


  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            🛡️
          </div>
          <h1 className="text-2xl font-bold text-gray-800">React Delays Practice Lab</h1>
        </div>

        {/* Practice Section 1: Simple Loading */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Practice 1: Simple Delay (setTimeout)
          </h2>
          <button 
            onClick={fetchVulnerabilities}
            disabled={loadingData}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              loadingData 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loadingData ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Loading Vulnerabilities...
              </div>
            ) : (
              'Fetch Vulnerabilities'
            )}
          </button>
          <div className="mt-2">
            <span className="text-2xl font-bold text-green-600">{vulnerabilityCount}</span>
            <span className="text-gray-600 ml-2">vulnerabilities found</span>
          </div>
        </div>

        {/* Practice Section 2: Export with Multiple Delays */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Practice 2: Multiple Delays (Promises & async/await)
          </h2>
          <button 
            onClick={exportWithDelay}
            disabled={exportingFile}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              exportingFile 
                ? 'bg-orange-400 text-white cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {exportingFile ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Exporting...
              </div>
            ) : (
              '📥 Export Data'
            )}
          </button>
          
          {showNotification && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✅ Export completed successfully!
            </div>
          )}
        </div>

        {/* Practice Section 3: Debounced Search */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Practice 3: Debounced Search (Advanced)
          </h2>
          <input
            type="text"
            placeholder="Search vulnerabilities... (will search after you stop typing)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {isTyping && (
            <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
              <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
              Typing...
            </div>
          )}
        </div>

        {/* Practice Section 4: Staggered Results */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Practice 4: Staggered Animation
          </h2>
          <button 
            onClick={showResultsWithStagger}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
          >
            🎭 Show Results with Animation
          </button>
          
          <div className="mt-4 space-y-2">
            {searchResults.map((vulnerability, index) => (
              <div
                key={vulnerability.id}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg transform transition-all duration-300 ease-in-out"
                style={{
                  opacity: 1,
                  transform: 'translateY(0px)'
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{vulnerability.id}</span>
                  <span className="text-sm text-gray-600">{vulnerability.vendor}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{vulnerability.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hints Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Hints & Delay Patterns</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>setTimeout:</strong> <code>setTimeout(() =&gt; {'{'} /* code */ {'}'}, 2000)</code></p>
            <p><strong>Promise delay:</strong> <code>await new Promise(resolve =&gt; setTimeout(resolve, 3000))</code></p>
            <p><strong>Debounce:</strong> Clear previous timeout, set new one</p>
            <p><strong>Stagger:</strong> Use a loop with delays between iterations</p>
            <p><strong>Cleanup:</strong> Store timeout IDs and clear them in useEffect cleanup</p>
          </div>
        </div>
      </div>
    </div>
  );
}