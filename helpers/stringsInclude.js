// THIS FUNCTION RETURNS A BOOLEAN IF THE stringsArr INCLUDES THE STRING TO MATCH

export default function stringsInclude(matchString, stringsArr) {
  let match = false;

  for (const string of stringsArr) {
    if (string.toUpperCase().includes(matchString.toUpperCase())) {
      match = true;
      break;
    }
  }

  return match;
}