// TODO: Improve this function
export default function generateUsername(name: string): string {
  return `${name.toLowerCase().replaceAll(' ', '-')}-${Date.now()}`
}
