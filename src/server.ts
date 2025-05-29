import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  // Obtener el contexto de Netlify
  const context = getContext();

  // Ejemplo de cómo podrías acceder al request y contexto
  // Si necesitas hacer algo con el request, como manejar una API, puedes hacerlo aquí.
  const pathname = new URL(request.url).pathname;
  console.log(`Rendering for path: ${pathname}`);
  
  // Maneja la solicitud y devuelve la respuesta renderizada
  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * El manejador de solicitudes utilizado por el CLI de Angular.
 * Este es el punto de entrada para las solicitudes de SSR.
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);