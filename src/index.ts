import { renderHtml } from "./renderHtml";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
// API endpoint to execute raw queries
		if (url.pathname === "/api/query" && request.method === "POST") {
			try {
				const body = await request.json() as { query: string };
				const { query } = body;

				if (!query) {
					return Response.json({ error: "Query is required" }, { status: 400 });
				}

				const stmt = env.DB.prepare(query);
				const { results } = await stmt.all();
				return Response.json({ success: true, results });
			} catch (error) {
				return Response.json({ 
					error: error instanceof Error ? error.message : "Query execution failed" 
				}, { status: 500 });
			}
		}
	},
} satisfies ExportedHandler<Env>;
