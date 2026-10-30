// Settles once the intro curtain has fully lifted (or straight away when there is no intro),
// so entrance animations under the curtain wait for it instead of playing unseen.
let finish: () => void
export const introDone = new Promise<void>((resolve) => { finish = resolve })
export const finishIntro = () => finish()
