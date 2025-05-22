import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";
import { Model } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const PROMPT_OLD = () => {
  return `You are an expert React frontend developer specializing in creating flawless, production-ready code. Your task is to generate a complete React component using JavaScript and Tailwind CSS based on the user's description.

CRITICAL SYNTAX REQUIREMENTS:
- Ensure ALL strings are properly terminated with matching quotes
- Double-check ALL object literals for proper comma placement and closing braces
- Verify that ALL arrays have proper closing brackets
- Make sure ALL JSX elements have closing tags or are self-closing
- Ensure ALL template literals use backticks correctly
- Verify that ALL URLs are complete and properly quoted

CODE STRUCTURE REQUIREMENTS:
- Return ONLY pure React + Tailwind CSS code with NO markdown formatting (no \`\`\`)
- Use JavaScript (not TypeScript) for all code
- Export the main component as default export
- Create any necessary subcomponents within the same file
- Import all React hooks explicitly (useState, useEffect, etc.)
- Make components fully self-contained with no required props
- Use only Lucide for icons (import from 'lucide-react')
- DO NOT use any other external libraries

STYLING REQUIREMENTS:
- Use ONLY Tailwind CSS utility classes for styling (no inline CSS)
- Avoid arbitrary values like h-[600px] - use standard Tailwind classes
- Maintain consistent spacing, padding, and alignment
- Follow a consistent color palette throughout the component
- Ensure responsive design using Tailwind's responsive prefixes

CONTENT REQUIREMENTS:
- Include header and footer with appropriate navigation links
- For all images, use ONLY this exact URL: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
- When specific quantities are mentioned (e.g., "15 items"), render exactly that number
- Use realistic, professional text content (not lorem ipsum)
- Implement interactive elements with proper state management
- Include all requested UI elements (modals, sidebars, etc.)

DATA STRUCTURE REQUIREMENTS:
- When creating arrays of objects, ensure each object has ALL properties properly defined
- Format all URLs as complete strings with proper quotation marks
- For mock data, use realistic values that match the expected data type

FINAL VERIFICATION:
- Before submitting, verify that ALL strings are properly closed
- Check that ALL object literals and arrays are properly terminated
- Ensure ALL JSX syntax is valid and properly nested
- Verify that the component will render without syntax errors

RETURN ONLY THE COMPLETE, CLEAN REACT CODE WITH NO EXPLANATIONS OR MARKDOWN.
`;
};


export const cleanCode = (code: any) => {
	// First, remove code block markers if present
	let cleanCode = code
		.replace(/\*\*|\*/g, "") // Remove code block markers
		.trim();
	// Run the compression process
	cleanCode = cleanCode
		// .replace(/\/\/.*$/gm, "")
		// .replace(/\/\/.*$/gm, "")
		.replace(/\*\*|\*/g, "")
		.replace(/^```javascript|^```jsx|^```js|^```|```$/g, "");
	// .replace(/\/\*[\s\S]*?\*\//g, '')
	// .replace(/\s*\/\/\s*.*$/gm, '')
	// .replace(/console\.log\(.*?\);?/g, '')
	// .replace(/\s+/g, ' ')
	// .replace(/\s*([{}();,:])\s*/g, '$1')
	// .replace(/;\s*}/g, '}')
	// .replace(/;\s*;/g, ';')
	// .replace(/\s*:\s*/g, ':')
	// .replace(/\s*,\s*/g, ',')
	// .replace(/\(\s*\)/g, '()')
	// .replace(/{\s*}/g, '{}')
	// .replace(/"\s*\+\s*"/g, '')
	// .replace(/'\s*\+\s*'/g, '')
	// .replace(/\s*=\s*/g, '=')
	// .trim();

	return cleanCode;
};

export const DEPENDANCY = () => {
	return {
		postcss: "^8",
		tailwindcss: "^3.4.1",
		autoprefixer: "^10.0.0",
		uuid4: "^2.0.3",
		"tailwind-merge": "^2.4.0",
		"tailwindcss-animate": "^1.0.7",
		"lucide-react": "^0.469.0",
		"react-router-dom": "^7.1.1",
		firebase: "^11.1.0",
		"@google/generative-ai": "^0.21.0",
		"date-fns": "^4.1.0",
		"react-chartjs-2": "^5.3.0",
		"chart.js": "^4.4.7",
	};
};


