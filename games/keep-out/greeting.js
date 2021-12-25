console.log(`%c _______  _______  _______  _______                      _______  _______  _______ \n\
(       )(  ____ \\(  ____ )(  ____ )|\\     /|  |\\     /|(       )(  ___  )(  ____ \ \n\
| () () || (    \\/| (    )|| (    )|( \\   / )  ( \\   / )| () () || (   ) || (    \/ \n\
| || || || (__    | (____)|| (____)| \\ (_) /    \\ (_) / | || || || (___) || (_____ \n\
| |(_)| ||  __)   |     __)|     __)  \\   /      ) _ (  | |(_)| ||  ___  |(_____  ) \n\
| |   | || (      | (\\ (   | (\\ (      ) (      / ( ) \\ | |   | || (   ) |      ) | \n\
| )   ( || (____/\\| ) \\ \\__| ) \\ \\__   | |     ( /   \\ )| )   ( || )   ( |/\\____) | \n\
|/     \\|(_______/|/   \\__/|/   \\__/   \\_/     |/     \\||/     \\||/     \\|\\_______) \n\

`, "font-family:monospace; color:red")

console.log("%cthis is a classic easter egg hunt. \n\
there are 4 hidden elements that can be unlocked with the right codes. \n\
when you find all 4, you'll unlock the key to a prize. \n\
good luck!", "color: green")

var getCode = async function() {
  const url = "https://gist.githubusercontent.com/tngzng/c81813a9b7c30f3ec546fdb68a188c7d/raw/f6d846baae65ed6d94dd64e43592a1574d56d8f9/keep-out-code.txt"
  try {
    const fetchResponse = await fetch(url);
    const resText = await fetchResponse.text();
    return resText;
  } catch (err) {
    console.error('Error - ', err);
  }
}

var displayPrize = async function() {
    console.log(
         "%ccongratulations! you've unlocked the key to the prize!!!",
         "color:yellow"
    )
    console.log(`%c
       .--.
      /.-. '----------.
      \\'-' .--"--""-"-'
       '--'
    `, "font-family:monospace; color:yellow")
    console.log(
         "%cto claim your prize email ting the following code:",
         "color:yellow"
    )
    var code = await getCode();
    console.log(`%c${code}`,
                "font-family:monospace; color:yellow")
}
