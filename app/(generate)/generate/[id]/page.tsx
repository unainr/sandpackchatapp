import { AI_Prompt_Demo } from "@/components/ai-input";
import { findCode } from "@/lib/actions/model";
import { DEPENDANCY } from "@/lib/utils";
import { Sandpack } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
const GenerateCodePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	if (!id || id === undefined)
		return <div>Invalid or missing ID parameter</div>;
	const response = await findCode(id);
	if (!response) return <div>No data found</div>;
	// const data = response.find((id: string) => data.id === id);
	return (
		<div className="container mx-auto py-8 px-4 pb-28">
			{/* Code Sandbox with enhanced styling */}
			<div className="border rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 transition-all">
				<div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center">
					<div className="flex space-x-2 mr-3">
						<div className="w-3 h-3 rounded-full bg-red-500"></div>
						<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
						<div className="w-3 h-3 rounded-full bg-green-500"></div>
					</div>
					<Link
						href="/"
						className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors">
						<CircleArrowLeft className="w-4 h-4" />
						Back
					</Link>
				</div>

				<Sandpack
					template="react"
					theme={nightOwl}
					options={{
						externalResources: ["https://cdn.tailwindcss.com"],
						showNavigator: true,
						showTabs: true,
						editorHeight: 600,
						readOnly: true,
						showReadOnly: false,
					}}
					customSetup={{
						dependencies: {
							...DEPENDANCY,
							"lucide-react": "latest",
						},
					}}
					files={{
						"/App.js": `${response.code}`,
					}}
				/>
			</div>
			{/* <div className="flex items-center justify-center mt-8">
   <AI_Prompt_Demo />

  </div> */}
		</div>
	);
};

export default GenerateCodePage;
