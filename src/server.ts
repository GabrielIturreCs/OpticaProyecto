import { CommonEngine } from "@angular/ssr/node";
import { render } from "@netlify/angular-runtime/common-engine";

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  try {
    const pathname = new URL(request.url).pathname;

    if (pathname === "/api/hello") {
      return Response.json({ message: "Hello from the API" });
    }

    return await render(commonEngine);
  } catch (error) {
    console.error('Error en netlifyCommonEngineHandler:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
}