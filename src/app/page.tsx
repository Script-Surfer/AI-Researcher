"use client"

import { use, useState } from "react"

export default  function Home() {
	const [topic, setTopic] = useState("")
	const [result, setResult] = useState("")
	const [loading, setLoading] = useState(false)

	const handleResearch = async() => {
		setLoading(true)
		setResult("")
	
	const res = await fetch("/api/research", {
		method: "POST",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify({ topic})
	})

	const data = await res.json()
	setResult(data.output)
	setLoading(false)
	}

	return(
		<main className="min-h-screen p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-4 text-center">Topic Research Tool</h1>
			<br/>
			<h2 className="text-xl font-medium mb-3 text-center">Enter your Interest Here !!!</h2>
			<input
			className="w-full border p-2 rounded mb-3 bg-clip-border"
			placeholder="Enter your Topic"
			value={topic}
			onChange={(e) => {setTopic(e.target.value)}}
			/>

			<button
			className="bg-black text-white px-4 py-2 rounded border-2 bg-clip-border"
			onClick={handleResearch}
			disabled={loading}
			>
				{loading ? "Researching..." : "Generate Research"}
			</button>

			{result && (
				<pre className="mt-6 whitespace-pre-wrap bg-gray-500 p-4 rounded">
					{result}
				</pre>
			)}
		</main>
	)
}