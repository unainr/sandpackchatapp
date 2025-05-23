import {
	LucideCode,
	LucideCalendar,
	LucideExternalLink,
	LucideTag,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CodeBlockThemed } from "./mainblock";
const CodeSnippet = async ({ codeItem }: string | any) => {
	return (
		<div className="my-10 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] border border-gray-200 dark:border-gray-800 group">
			{/* Enhanced Image Section with glass morphism effect */}
			<div className="relative h-72 w-full overflow-hidden">
				{codeItem.imageUrl ? (
					<>
						<Image
							src={codeItem.imageUrl}
							alt="Code Preview"
							fill
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover transition-all duration-700 ease-in-out "
							quality={100}
						/>

						{/* Stylish overlay with multiple gradients */}
						<div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40 mix-blend-multiply"></div>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

						{/* Animated accent lines */}
						<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blredue-500 via-red-500 to-pink-500 transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-0"></div>
					</>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-red-600 to-violet-700">
						<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_80%)]"></div>
					</div>
				)}

				{/* Floating glass badge */}
				<div className="absolute top-4 right-4 transform transition-all duration-100  group-hover:translate-y-[-2px]">
					<span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 shadow-lg flex items-center gap-1.5">
						<LucideTag className="h-3.5 w-3.5" />
						Code Snippet
					</span>
				</div>
			</div>
			<div className="p-8">
				{/* Code content */}
				<CodeBlockThemed codesnippet={codeItem.code.substring(0, 200)} />

				{/* Footer with improved layout and animations */}
				<div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/50">
					<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 group/date">
						<div className="p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg mr-3 shadow-sm transition-all duration-300 group-hover/date:bg-blue-50 dark:group-hover/date:bg-blue-900/20">
							<LucideCalendar className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover/date:text-blue-500 dark:group-hover/date:text-blue-400 transition-colors duration-300" />
						</div>
						<span className="font-semibold">
							{new Date(codeItem.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</div>
					<Link href={`/generate/${codeItem._id}`} className="group/button">
						<button className="px-5 py-3 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/20">
							<LucideExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
							View Code
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CodeSnippet;
