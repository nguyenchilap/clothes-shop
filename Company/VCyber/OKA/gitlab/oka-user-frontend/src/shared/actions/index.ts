// Shared actions for the application

export type ActionType = 
  | 'FILE_UPLOAD'
  | 'FILE_DOWNLOAD'
  | 'FILE_DELETE'
  | 'FILE_RENAME'
  | 'FILE_MOVE'
  | 'FILE_COPY'
  | 'FILE_SHARE'
  | 'FILE_DOWNLOAD'
  | 'FILE_DELETE'
  | 'FILE_RENAME'

export interface Action<T = unknown> {
  type: ActionType
  payload?: T
  error?: string
}

export function createAction<T>(type: ActionType, payload?: T): Action<T> {
  return { type, payload }
}

export function createErrorAction(type: ActionType, error: string): Action {
  return { type, error }
}

// Common async action helper
export async function executeAsync<T>(
  asyncFn: () => Promise<T>,
  onStart?: () => void,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
): Promise<T | null> {
  try {
    onStart?.()
    const result = await asyncFn()
    onSuccess?.(result)
    return result
  } catch (error) {
    onError?.(error as Error)
    return null
  }
}

