export function getFriendlyErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes('HTTP error')) {
    return 'Please try again later!';
  } else if (
    error instanceof Error &&
    error.message.includes('Failed fetching')
  ) {
    return 'Failed to load results. Please try again later!';
  }

  return 'Unknown error, please try again later';
}
