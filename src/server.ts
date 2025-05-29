import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  try {
    const context = getContext();
    const pathname = new URL(request.url).pathname;
    console.log(`Rendering request for path: ${pathname}`);

    // Ejemplo ruta API personalizada
    if (pathname === '/api/hello') {
      return new Response(JSON.stringify({ message: 'Hello from the API' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Renderiza la app Angular
    const result = await angularAppEngine.handle(request, context);
    return result || new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('Error en netlifyAppEngineHandler:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Exporta el handler para Angular CLI y Netlify
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);