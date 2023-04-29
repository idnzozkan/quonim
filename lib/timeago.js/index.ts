// TODO: Improve this function to achieve Twitter style formatting
export const localeFunc = (number: number, index: number): [string, string] => {
  return [
    ['now', 'now'],
    ['%ss', '%ss'],
    ['1m', '1m'],
    ['%sm', '%sm'],
    ['1h', '1h'],
    ['%sh', '%sh'],
    ['1d', '1d'],
    ['%sd', '%sd'],
    ['1w', '1w'],
    ['%sw', '%sw'],
    ['1mo', '1mo'],
    ['%smo', '%smo'],
    ['1y', '1y'],
    ['%sy', '%sy'],
  ][index] as [string, string]
}
