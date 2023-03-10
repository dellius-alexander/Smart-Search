
/**
 * Convert value to hexadecimal
 * @param {string|number|Uint8Array|Uint16Array|Uint32Array} value to value to be converted
 * @param {number} maxLength the maximum length of the hexadecimal string
 * @return {string} hexadecimal representation of the value
 */
function toHex(value: string | number = null, maxLength: number): string {
  try {
    return value
      .toString(16)
      .replace(",","")
      .replace(".","")
      .padStart(maxLength, `${
        crypto
          .getRandomValues(new Uint32Array(maxLength))
      }`);
  } catch (error) {
    console.dir(error);
    error.stackTrace;
  }

}


/**
 * Generate random character sequence
 * @param {number} length
 * @param {{characterSequence : string, done: boolean}} memo
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function randomChar (length: number, memo = Object.assign({}, {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  characterSequence: "",
  done: false,
  lang: "en"
})) {
  // check if character sequence has been generated
  if (Object.keys(memo).length >= 0 && memo.done) {
    return memo;
  }
  else { // generate the next character and add to the character sequence string
    if(memo.lang === "en") { // pre-defined language alphabet
      const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω1234567890";
      memo.characterSequence += ALPHABETS.charAt(Math.floor(Math.random() * ALPHABETS.length));
    } else { // truely random characters
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      memo.characterSequence += String.fromCharCode(crypto.getRandomValues(new Uint32Array([length])));
    }
    // check
    if (memo.characterSequence.length >= length) {
      memo.done = true;
      return memo;
    }
    // // console.log(memo);
  }
  return randomChar(length, memo);
}

/**
 * Generates a unique UUID for serialization purposes and cataloging.
 * 1. The first 8 digits represent the hexadecimal timestamp.
 * 2. The next 4 digits represent the clock sequence.
 * 3. The next 8 digits represent the node/model id.
 * 4. The next 8 digits represent the node/model type.
 * 5. The last 12 digits represent a random number.
 * @param {string|number} id model id
 * @param {string} type model type/name
 * @return {string} {{timestamp}-{clockSequence}-{model_id}-{model_type}-{random}}
 */
export function uuid(id: string|number, type: string): string {
  const date = new Date(Date.now());
  // console.log("Date: ", date);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const timestamp: string = toHex(Math.floor(date / 1000), 8).toString();
  // console.log("Timestamp: ", timestamp);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const clockSequence = toHex(Math.floor(date.getUTCMilliseconds() / 1000), 4);
  const model_id = toHex(id, 8);
  const model_type = toHex(type, 8);
  const random = randomChar(12).characterSequence;
  const uuid = `${timestamp}-${clockSequence}-${model_id}-${model_type}-${random}`;
  console.log("Generated uuid: ", uuid);
  return uuid.toString();
}
