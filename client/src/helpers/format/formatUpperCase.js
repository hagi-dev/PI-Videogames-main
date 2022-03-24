export const formatUpperCase = (value) => {
    if (value) {
        let startLetter = value.charAt(0).toUpperCase();
        let restOfWord = value.slice(1).toLowerCase();
        return startLetter + restOfWord;
    }
}