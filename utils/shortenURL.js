// char table
const Base_char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
// max
const Max = 61
// min
const Min = 0

// export function
module.exports = (shortURL_length => {
  let result = ""

  for (let i = 0 ; i < shortURL_length ; i++) {
    // 產生隨機index
    const randomIndex = Math.floor(Math.random() * (Max - Min + 1))
    // 從 Base_char裡取出對應的字元
    const chooseChar = Base_char[randomIndex]
    // 將取出的字元加進result裡
    result += chooseChar
  }
  
  return result
})