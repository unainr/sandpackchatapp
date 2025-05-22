import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

import { aquaBlue } from "@codesandbox/sandpack-themes";
import { DEPENDANCY } from '@/lib/utils';
const Code = async () => {



  return (
    <div className="container mx-auto py-8  px-4">
      
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <Sandpack template="react"
                theme={aquaBlue}
                options={{
                    externalResources: ["https://cdn.tailwindcss.com"],
                    showNavigator: true,
                    showTabs: true,
                    editorHeight: 600
                }}
                customSetup={{
                    dependencies: {
                        ...DEPENDANCY,
                         "lucide-react": "latest",
                    }
                }}
                files={{
                    "/App.js": "finish",

                }} />
      </div>
    
    </div>
  );
};

export default Code;