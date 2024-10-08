export type Done = () => void

export type CallbackWatcher = {
  complete: null | (() => void)
  done: Done
  go: () => Done
}

export const createCallbackWatcher = (): CallbackWatcher => {
  let runningTaskNum = 0
  let finishedTaskNum = runningTaskNum

  const done = () => {
    finishedTaskNum++
    if (finishedTaskNum >= runningTaskNum) {
      if (result.complete != null) result.complete()
    }
  }

  const go = () => {
    runningTaskNum++
    return done
  }

  const result: CallbackWatcher = {
    complete: null,
    // callback裡調用
    done,
    // done前調用
    go,
  }

  return result
}
