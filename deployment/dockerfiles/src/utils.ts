/**
 * Utility function to execute promises safely
 *
 * @param promise The promise to be executed
 *
 * @returns A tuple of [error, data] where then first value
 *          is an error if the promise rejected, and the second value
 *          is the result of the promise when successfull
 */
export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error];
    });
}