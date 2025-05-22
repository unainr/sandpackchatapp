import { findCode } from "@/lib/actions/model";
import { DEPENDANCY } from "@/lib/utils";
import { Sandpack } from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";
import React from "react";

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
		<div className="container mx-auto py-8  px-4">
			<div className="border rounded-lg overflow-hidden shadow-lg">
				<Sandpack
					template="react"
					theme={aquaBlue}
					options={{
						externalResources: ["https://cdn.tailwindcss.com"],
						showNavigator: true,
						showTabs: true,
						editorHeight: 600,
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
		</div>
	);
};

export default GenerateCodePage;
