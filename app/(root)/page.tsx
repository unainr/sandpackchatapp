import CodeSnippet from "@/components/CodeSnippet";
import FinalHero from "@/components/hero/finalhero";
import { getAllCodes } from "@/lib/actions/model";

export default async function Home() {
   const response = await getAllCodes() as string |any
    if(!response) return <div>No data found</div>
  return (
    <>
   <FinalHero/>
   <div className="container mx-auto py-8 flex items-center justify-center">
  <h1 className="text-4xl capitalize  italic  underline underline-offset-8 decoration-red-600 font-bold text-gray-900 dark:text-white mb-6 px-4">
    <span className="text-red-600">Code </span> Snippets
  </h1>
  </div>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-3 mx-4">
        {response && response?.map((codeItem: any) => (
          <CodeSnippet key={codeItem.id} codeItem={codeItem} />
        ))}
      </div>
    </>
  );
}
