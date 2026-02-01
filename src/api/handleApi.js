import toast from 'react-hot-toast'

export async function handleApi(promise, loadingMessage = 'Loading...') {
  const toastId = toast.loading(loadingMessage)

  try {
    const data = await promise
    toast.dismiss(toastId)
    return data
  } catch (error) {
    toast.dismiss(toastId)

    if (Array.isArray(error.errors)) {
      error.errors.forEach(e =>
        toast.error(e.message || e)
      )
    } else {
      toast.error(error.message || 'Something went wrong')
    }

    throw error
  }
}