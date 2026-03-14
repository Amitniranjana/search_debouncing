'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState('')         // Input value ke liye
    const [results, setResults] = useState([])       // API data ke liye
    const [loading, setLoading] = useState(false)     // Loading spinner ke liye
    const [debouncedValue, setDebouncedValue] = useState('') // Debounced term ke liye

    // 1. Debouncing Logic: Jab user type karna band karega, tab debouncedValue update hoga
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(search)
        }, 500) // 500ms ka delay standard hai

        return () => clearTimeout(timerId) // Cleanup: Har keystroke par purana timer delete hoga
    }, [search])

    // 2. API Fetching: Jab debouncedValue change hoga, tabhi API call jayegi
    useEffect(() => {
        const fetchData = async () => {
            if (!debouncedValue) {
                setResults([])
                return
            }

            setLoading(true)
            try {
                // Hum JSONPlaceholder API use kar rahe hain posts search karne ke liye
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?q=${debouncedValue}`)
                setResults(response.data)
            } catch (error) {
                console.error("API Error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [debouncedValue])

    // 3. Highlighting Logic: Search term ko result mein yellow color se highlight karna
    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text
        const parts = text.split(new RegExp(`(${highlight})`, "gi"))
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase()
                        ? <mark key={i} className="bg-yellow-300 rounded-sm">{part}</mark>
                        : <span key={i}>{part}</span>
                )}
            </span>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 p-10 flex flex-col items-center'>
            <div className='w-full max-w-md'>
                <h1 className='text-2xl font-bold text-red-600 mb-6 text-center'>
                    Searchbar with Debouncing
                </h1>

                {/* Input Section */}
                <div className='relative'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search for posts...'
                        className='w-full p-4 rounded-xl border-2 border-blue-400 outline-none shadow-md text-black'
                        type="text"
                    />
                    {loading && (
                        <div className="absolute right-4 top-4">
                            <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className='mt-6 space-y-3'>
                    {/* No Results State */}
                    {!loading && debouncedValue && results.length === 0 && (
                        <p className='text-center text-gray-500 bg-white p-4 rounded-lg shadow'>
                            No results found for "{debouncedValue}"
                        </p>
                    )}

                    {/* Results List */}
                    {results.map((post) => (
                        <div key={post.id} className='p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500'>
                            <h3 className='font-semibold text-lg text-gray-800 capitalize'>
                                {highlightText(post.title, debouncedValue)}
                            </h3>
                            <p className='text-gray-600 text-sm mt-1'>
                                {highlightText(post.body.substring(0, 80), debouncedValue)}...
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchBar