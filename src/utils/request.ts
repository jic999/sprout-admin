export function objToQueryStr(obj: object) {
  const queryStr = new URLSearchParams()
  for (const key in obj)
    queryStr.append(key, obj[key as keyof object])
  return queryStr.toString()
}
