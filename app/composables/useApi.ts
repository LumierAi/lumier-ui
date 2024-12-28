function createFetch() {
  // const { addLoader, removeLoader } = useGlobalLoader();
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.baseApiUrl,
    onResponseError(_context) {
      // useDefaultResponseError(context);
    },
    onResponse(_data) {
      // removeLoader();
    },
    onRequestError(_data) {
      // removeLoader();
    },
    onRequest: (_context) => {
      // addLoader();
    },
  })
}

export const useApi = createFetch()
