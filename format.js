/**
Format the footnotes
*/

const fs = require("fs");

try {
  console.log("Running matchmaker");
  const text = fs.readFileSync("./source.md", "utf-8");

  let newText = `${text.toString()}`; // copy, not reference
  let footnotes = [];

  // Split text at each "^[" start
  let matches = [...text.matchAll(/\^\[/g)];

  matches.forEach((match) => {
    let startPos = match.index; // start position of "^[" match in text
    let endPos = startPos + 1; // becomes end of the match, needs to be +1, since startPos is where "^" starts, without "["
    let counter = 1; // count opening "[" and closing tags "]" until we reached a balance of zero and found our footnote end "]"
    while (counter > 0) {
      const char = text[++endPos];
      console.log("UUU", char, counter, endPos);
      if (char === "[") {
        // Found a new "[" element
        counter++;
      } else if (char === "]") {
        // Found a closing "]" element
        counter--;
      }

      // Stop after 5000 characters after "^[" match. Likely not closed correctly
      if (counter > 5000) {
        throw `Footnote at text position ${startPos} with text ${text.substring(
          startPos,
          startPos + 100
        )}... was not closed correctly`;
        break;
      }
    }
    endPos;
    footnotes.push({
      startPos,
      endPos,
      note: newText.substring(startPos + 2, endPos),
    });
  });

  // Its easier to replace the inline footnotes from end to start, since
  // replacing words will reduce text length and thereby void the correct startPos and endPos.
  // We circumvent this offset issue by going from end to start to replace
  // "^[[some text](some-website.com)]" with "^[8]"
  footnotes.reverse();
  let appendToEnd = "";
  footnotes.forEach(({ startPos, endPos, note }, i) => {
    let footnoteIndex = footnotes.length - i;
    newText =
      newText.substring(0, startPos) +
      `[^${footnoteIndex}]` +
      newText.substring(endPos + 1);
    appendToEnd = `[^${footnoteIndex}]: ${note}` + "\n" + appendToEnd;
  });
  newText = newText + appendToEnd;

  fs.writeFileSync("./converted.md", newText);
} catch (err) {
  console.error("\x1b[41m", "\x1b[37m", "ERROR", err, "\x1b[0m");
}
