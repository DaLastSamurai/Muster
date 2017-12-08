
// this is a simple text validation tool that is currently used in: 
  // profileFrame

export const isStringAcceptable = (inputStr, requiredLength = 1) => {
  // takes in a string and returns a boolean true or false as to whether
  // the string is okay to write to the db. It also takes in an optional
  // requiredLength arg. Set to 0 to not require a length. Add to the 
  // invalid as needed. I made it loose to allow most messages to work. I need 
  // to fix this. It doesn't allow multiple words now. 
  // let invalid = /^[^ \\\/<>]*$/
  // return !!inputStr.match(invalid) && inputStr.length >= requiredLength
  return true
}