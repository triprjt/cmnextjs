export const timeAgo = (iso: string) => {
    const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3)
    const unit = [
      [31536000, 'वर्ष'],
      [2592000, 'महीने'],
      [86400, 'दिन'],
      [3600, 'घंटे'],
      [60, 'मिनट']
    ] as const
    for (const [s, l] of unit) if (secs >= s) return `${Math.floor(secs / s)} ${l} पहले`
    return 'अभी'
  }